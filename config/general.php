<?php
/**
 * Craft 3 Multi-Environment
 * Efficient and flexible multi-environment config for Craft 3 CMS
 *
 * $_ENV constants are loaded by craft3-multi-environment from .env.php via
 * ./web/index.php for web requests, and ./craft for console requests
 *
 * @author    nystudio107
 * @copyright Copyright (c) 2017 nystudio107
 * @link      https://nystudio107.com/
 * @package   craft3-multi-environment
 * @since     1.0.5
 * @license   MIT
 */

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in src/config/GeneralConfig.php
 */

return [

  // All environments
  '*' => [
    // Whether we should use a yaml config file for keeping track of admin changes
    'useProjectConfigFile' => true,

    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // The default length of time Craft will store data, RSS feed, and template caches
    'cacheDuration' => 0,

    // The default options that should be applied to each search term
    'defaultSearchTermOptions' => array(
      'subLeft' => true,
      'subRight' => true,
    ),

    // Whether images transforms should be generated before page load
    'generateTransformsBeforePageLoad' => true,

    // Whether generated URLs should omit index.php (e.g. http://domain.com/path instead of http://domain.com/index.php/path)
    'omitScriptNameInUrls' => true,

    // This value should be the same across all environments. Note that if this key ever changes, any data that was encrypted with it will be inaccessible.
    'securityKey' => getenv('SECURITY_KEY'),

    // The base URL to the site(s). If set, it will take precedence over the Base URL settings in Settings → Sites → [Site Name].
    'siteUrl' => getenv('SITE_URL'),


    // Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.
    'useEmailAsUsername' => true,

    // Whether Craft should specify the path using PATH_INFO or as a query string parameter when generating URLs.
    'usePathInfo' => true,

    // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
    'aliases' => [
      '@basePath' => CRAFT_BASE_PATH,
      '@baseUrl' => getenv('SITE_URL'),
      '@mediaPath' => CRAFT_BASE_PATH.'/public/media/',
      '@mediaUrl' => getenv('SITE_URL').'/media/',
      '@inlineJs' => '_inline/_js',
      '@inlineSvg' => '_inline/_svg',
      '@inlineCss' => '_inline/_css',
    ]
  ],

  // Live (production) environment
  'live' => [
    // Craft defined config settings
    'allowUpdates' => false,
    'backupOnUpdate' => false,
    // set it to false so only on local admin changes can happen
    'allowAdminChanges' => true,
    'devMode' => false,
    'enableTemplateCaching' => true,
    'isSystemLive' => true,
    // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
    'aliases' => [
    ],
    // Custom site-specific config settings
    'custom' => [
    ]
  ],

  // Staging (pre-production) environment
  'staging' => [
    // Craft defined config settings
    'allowUpdates' => false,
    'backupOnUpdate' => false,
    // set it to false so only on local admin changes can happen
    'allowAdminChanges' => true,
    'devMode' => false,
    'enableTemplateCaching' => true,
    'isSystemLive' => true,
    // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
    'aliases' => [
    ],
    // Custom site-specific config settings
    'custom' => [
    ]
  ],

  // Local (development) environment
  'dev' => [
    // Craft defined config settings
    'allowUpdates' => true,
    'backupOnUpdate' => true,
    'allowAdminChanges' => true,
    'devMode' => true,
    'enableTemplateCaching' => false,
    'isSystemLive' => true,
    // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
    'aliases' => [
    ],
    // Custom site-specific config settings
    'custom' => [
    ]
  ],
];
