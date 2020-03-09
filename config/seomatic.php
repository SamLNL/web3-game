<?php

return [
  '*' => [
    // The public-facing name of the plugin
    'pluginName' => 'SEOmatic',

    // Should SEOmatic render metadata?
    'renderEnabled' => true,

    // Should SEOmatic render frontend sitemaps?
    'sitemapsEnabled' => true,

    // Should SEOmatic add to the http response headers?
    'headersEnabled' => true,

    // Should SEOmatic display the SEO Preview sidebar?
    'displayPreviewSidebar' => true,

    // Should SEOmatic display the SEO Analysis sidebar?
    'displayAnalysisSidebar' => true,

    // If `devMode` is on, prefix the <title> with this string
    'devModeTitlePrefix' => '&#x1f6a7; ',

    // The separator character to use for the `<title>` tag
    'separatorChar' => '|',

    // The max number of characters in the `<title>` tag
    'maxTitleLength' => 70,

    // The max number of characters in the `<meta name="description">` tag
    'maxDescriptionLength' => 155,

    // Site Groups define logically separate sites
    'siteGroupsSeparate' => true,

    // Whether to dynamically include the hreflang tags
    'addHrefLang' => true,

    // Should the meta generator tag and X-Powered-By header be included?
    'generatorEnabled' => true
  ],
  'live' => [
    // The server environment, either `live`, `staging`, or `local`
    'environment' => 'live'
  ],
  'staging' => [
    // The server environment, either `live`, `staging`, or `local`
    'environment' => 'staging',
  ],
  'dev' => [
    // The server environment, either `live`, `staging`, or `local`
    'environment' => 'local',
  ]
];
