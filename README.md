# Zhechen Shi · Academic Homepage

[Visit the website](https://albus1446.github.io/) · [GitHub profile](https://github.com/Albus1446)

I am an Applied Physics undergraduate at Zhejiang University of Technology. My research covers exoplanet nulling interferometry, space-based gravitational-wave detection, and cold-atom experiments for quantum precision measurement.

The website presents my education, undergraduate research training, projects, talks and posters, selected awards, and scientific tools. It distinguishes research training and exploratory work from established results.

## Content and structure

- `contents/home.md`: introduction, research interests, education, and contact.
- `contents/research.md`: research experience, projects, and writing.
- `contents/talks.md`: talks, posters, and academic exchange.
- `contents/awards.md`: selected honors.
- `contents/skills.md`: tools, coursework, languages, and service.
- `contents/config.yml`: page title and profile labels.
- `index.html`: accessible page layout with a readable static copy of the content.
- `static/css/main.css`: navy and blue visual styling.
- `static/js/scripts.js`: content refresh and navigation.
- `scripts/render-content.cjs`: refreshes the static content from Markdown and YAML using the bundled libraries.

After editing the Markdown or YAML files, run:

```sh
node scripts/render-content.cjs
```

Preview the site with any local static web server. GitHub Pages publishes the site from this repository.

## Attribution

Adapted from Sen Li's open-source `academic-homepage-template` under the MIT license. The original profile photo and talk cover are retained. See [LICENSE](LICENSE).
