<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

return [
  '*' => [
    'modules' => [
      'my-module' => \modules\Module::class,
    ],
  ],
  'dev' => [
    'components' => [
      'mailer' => function () {
        // Get the stored email settings
        $settings = craft\helpers\App::mailSettings();

        // Override the transport adapter class
        $settings->transportType = craft\mail\transportadapters\Smtp::class;

        // Override the transport adapter settings
        $settings->transportSettings = [
          'host' => 'mailhog',
          'port' => '1025',
          'useAuthentication' => false,
        ];

        // Create a Mailer component config with these settings
        $config = craft\helpers\App::mailerConfig($settings);

        // Instantiate and return it
        return Craft::createObject($config);
      },
    ]
  ],
  'staging' => [
    'components' => [
      'mailer' => function() {
        // Get the stored email settings
        $settings = App::mailSettings();

        // Override the transport adapter class
        $settings->transportType = \craft\mail\transportadapters\Smtp::class;

        // Override the transport adapter settings
        $settings->transportSettings = [
          'host' => 'smtp.mailtrap.io',
          'port' => '587',
          'useAuthentication' => true,
          'username' => 'e0278b4f146f67',
          'password' => '06dcfedde6552e'
        ];

        $config = App::mailerConfig($settings);
        return Craft::createObject($config);
      },
    ]
  ]
];
