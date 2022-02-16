# Gulp template

I hope it makes life easier and developing faster.

## Running the project locally

- Install all dependencies

```bash
npm i
```

- Start your project
  
```bash
npm run dev
```

## File structure

- `gulp` - where the magic is working
  - `gulpfile.js` - main gulp configure
  - `common` - configs and paths
  - `tasks` - describe task you want the gulp to do
  - `version.json` - created dynamically to avoid caching files during development (don't touch it)
- `src` - our project
  - `fonts`
  - `img`
  - `scss`
  - `js`
  - `html` - partials of html (header, footer, sidebar)
  - `example.html`
  - `index.html` - main endpoint

There is an example of Wikipedia page. When you start your project, don't forget to delete it in `src/fonts/*`, `src/img/*`, `src/scss/example.scss`, `src/example.html`.

Also take a look another version of my [gulp template](https://github.com/themse/gulp-starter).

## Tech stack

Here's a brief high-level overview of the tech stack:

- [Node.js v.16.13.1](https://nodejs.org/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Gulp v.4.0.2](https://gulpjs.com/) - A toolkit to automate & enhance your workflow
