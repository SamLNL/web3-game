/**
 * gdpr plugin for Craft CMS
 *
 * Index Field JS
 *
 * @author    Emotion
 * @copyright Copyright (c) 2018 Emotion
 * @link      emotion.nl
 * @package   Gdpr
 * @since     2.0.0
 */
(function() {
    $('.globalContent').redactor({
        "buttons": ["format","bold","italic","lists","link","align","file","horizontalrule"],
        "plugins": ["source","fullscreen","clips"]
    });
})();