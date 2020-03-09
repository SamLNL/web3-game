# Single

Place vector images here that shouldn't be included in a sprite.
These Vector images will be optimized during copy to the public folder.
These vector files will also be copied to the `/templates/_inline/_svg`
folder so you can include them directly in twig e.g.
`{% include 'image.svg' ignore missing %}`.

# Sprite

These images will be joined into a single svg sprite located here:
`/public/assets/images/svg/sprite/`

Usage:

```html
<svg>
  <use xlink:href="/assets/images/svg/sprite.svg#icon-1"></use>
</svg>
```

See also:

## See also:

- `tools/gulp/tasks/imagesSvg.js` for the gulp task
- `paths.[src|dist].images` in the `package.json` for the globs
