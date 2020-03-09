# biljoenbad

> Additional information or tag line. Edit or remove.

## Gulp Tasks

Check the `tools/gulp/tasks` folder

Some frequently used tasks:

```shell
gulp
```

Starts a development server

```shell
gulp build
```

Builds a production version of the project

```shell
gulp compile:javascript
```

Compiles the javascript

```shell
gulp compile:styles
```

Compiles the styles

## Node Scripts

```shell
node tools/scripts/performance.js --url https://www.emotion.nl
```

Runs a lighthouse audit on the given URL

```shell
node tools/scripts/critical.js --url https://www.emotion.nl/sitemap.xml
```

Generates a critical css files for every page in the sitemap (TODO: not finished)
