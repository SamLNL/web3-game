<?php

return [
  'imagerSystemPath' => '@webroot/media/imager/',
  'imagerUrl' => '@web/media/imager/',
  'cacheEnabled' => true,
  'cacheDuration' => 31104000, // 1 year
  'cacheDurationRemoteFiles' => 31104000, // 1 year
  'jpegQuality' => 80,
  'pngCompressionLevel' => 7,
  'interlace' => true, // false, true ('line'), 'none', 'line', 'plane', 'partition'
  'allowUpscale' => true,
  'convertToRGB' => true, // Should images be converted to RGB?
  'useCwebp' => false,

  'fillTransforms' => false,
  'fillAttribute' => 'width', // this could be any attribute that is numeric
  'fillInterval' => '200',
  'optimizeType' => 'job',
  'optimizers' => ['jpegoptim', 'mozjpeg', 'gifsicle', 'pngquant'],
  'optimizerConfig' => [
    'jpegoptim' => [
      'extensions' => ['jpg'],
      'path' => '/usr/bin/jpegoptim',
      'optionString' => '-s',
    ],
    'jpegtran' => [
      'extensions' => ['jpg'],
      'path' => '/usr/bin/jpegtran',
      'optionString' => '-optimize -copy none',
    ],
    'mozjpeg' => [
      'extensions' => ['jpg'],
      'path' => '/usr/bin/mozjpeg',
      'optionString' => '-optimize -copy none',
    ],
    'optipng' => [
      'extensions' => ['png'],
      'path' => '/usr/bin/optipng',
      'optionString' => '-o2',
    ],
    'pngquant' => [
      'extensions' => ['png'],
      'path' => '/usr/bin/pngquant',
      'optionString' => '--strip --skip-if-larger',
    ],
    'gifsicle' => [
      'extensions' => ['gif'],
      'path' => '/usr/bin/gifsicle',
      'optionString' => '--optimize=3 --colors 256',
    ],
    'tinypng' => [
      'extensions' => ['png', 'jpg'],
      'apiKey' => '',
    ],
    'kraken' => [
      'extensions' => ['png', 'jpg', 'gif'],
      'apiKey' => '',
      'apiSecret' => '',
      'additionalParams' => [
        'lossy' => true,
      ]
    ],
    'imageoptim' => [
      'extensions' => ['png', 'jpg', 'gif'],
      'apiUsername' => '',
      'quality' => 'medium'
    ],
  ]
];
