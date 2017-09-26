/* jshint devel: true */
/* global define, brackets */

define(function (require) {
  // Brackets modules
  var AppInit            = brackets.getModule("utils/AppInit");
  var MainViewManager    = brackets.getModule('view/MainViewManager');
  var DocumentManager    = brackets.getModule('document/DocumentManager');
  var LanguageManager    = brackets.getModule("language/LanguageManager");

  // this is a map object of lowercased name and language object
  var languages = LanguageManager.getLanguages();
  // load lookup list of shebang values
  var map = require('shebang-map');

  function detectLanguage(doc) {
    // get the first first line
    var part = doc.getRange({line: 0, ch: 0}, {line:1, ch:0}).trim();

    var langName = map[part];

    if (!langName) {
      // this is not a known language (or doesn't even use a shebang)
      return null;
    }

    var lang = languages[langName];

    if (!lang) {
      // this is not a language supported in this version of Brackets
      // (extensions can add new languages, so this lookup is generic)
      return null;
    }

    return lang;
  }

  function setLanguage(doc, lang) {
    var fullPath = doc.file.fullPath;

    // TODO this is from the Brackets source code... I still need to consider how
    // to not set this (so as to not mess with manually-set values from the user)

    // Set selected language as a path override for just this one file (not persisted)
    var defaultLang = LanguageManager.getLanguageForPath(fullPath, true);
    // if default language selected, pass null to clear the override
    LanguageManager.setLanguageOverrideForPath(fullPath, lang === defaultLang ? null : lang);
  }

  function init() {
    MainViewManager.on('currentFileChange', function() {
      var doc = DocumentManager.getCurrentDocument();
      var language;

      if (doc) {
        language = detectLanguage(doc);
      }

      if (language) {
        setLanguage(doc, language);
      }
    });
  }

  // Initialize extension
  AppInit.appReady(init);
});
