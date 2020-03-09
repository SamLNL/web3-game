# Sprite

These images will be joined into a single svg sprite located here:
`/public/assets/images/svg/sprite/`

Usage:

```html
<svg>
  <use xlink:href="/assets/images/svg/sprite.svg#icon-1"></use>
</svg>
```

## See also:

- `tools/gulp/tasks/imagesSvg.js` for the gulp task
- `paths.[src|dist].images` in the `package.json` for the globs

## Note

Older browsers need a polyfill to be able to user `symbol` sprites.
The default `_layout.twig` already loads `svgxuse.min.js` which should
fix that.
