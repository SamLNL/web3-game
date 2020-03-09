# Single

Place vector images here that shouldn't be included in a sprite.
These Vector images will be optimized during copy to the public folder.
These vector files will also be copied to the `/templates/_inline/_svg`
folder so you can include them directly in twig e.g.
`{% source 'image.svg' ignore missing %}`.

See also:

## See also:

- `tools/gulp/tasks/imagesSvg.js` for the gulp task
- `paths.[src|dist].images` in the `package.json` for the globs
