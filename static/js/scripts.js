const contentDir = 'contents/';
const contentVersion = '20261116';
const sectionNames = ['home', 'research', 'talks', 'awards', 'skills'];

async function fetchText(path) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(path + '?v=' + contentVersion, {
            cache: 'no-cache',
            signal: controller.signal
        });
        if (!response.ok) throw new Error('Content request failed: ' + response.status);
        return await response.text();
    } finally {
        window.clearTimeout(timeout);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const mainNav = document.getElementById('mainNav');
    const responsiveNav = document.getElementById('navbarResponsive');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const scrollSpy = window.bootstrap && mainNav
        ? new bootstrap.ScrollSpy(document.body, { target: '#mainNav', offset: 88 })
        : null;

    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.bootstrap && window.getComputedStyle(navbarToggler).display !== 'none') {
                const collapse = bootstrap.Collapse.getInstance(responsiveNav);
                if (collapse) collapse.hide();
            }
        });
    });

    marked.use({ mangle: false, headerIds: false });
    const requests = sectionNames.map(async name => {
        const target = document.getElementById(name + '-md');
        try {
            const markdown = await fetchText(contentDir + name + '.md');
            target.innerHTML = marked.parse(markdown);
            target.dataset.contentState = 'refreshed';
        } catch (error) {
            target.dataset.contentState = 'fallback';
            console.warn('Keeping the saved content for ' + name, error);
        }
    });
    requests.push((async () => {
        try {
            const config = jsyaml.load(await fetchText(contentDir + 'config.yml'));
            Object.entries(config).forEach(([id, value]) => {
                const target = document.getElementById(id);
                if (target && typeof value === 'string') target.textContent = value;
            });
        } catch (error) {
            console.warn('Keeping the saved page labels', error);
        }
    })());

    await Promise.all(requests);
    if (scrollSpy) scrollSpy.refresh();
    if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
        try { await MathJax.typesetPromise(); }
        catch (error) { console.warn('Could not typeset mathematics', error); }
    }
});
