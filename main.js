/* jshint devel: true */
/* global define, brackets */

define(function (require) {
  // Brackets modules
  var AppInit            = brackets.getModule("utils/AppInit");
  var MainViewManager    = brackets.getModule('view/MainViewManager');
  var DocumentManager    = brackets.getModule('document/DocumentManager');
  var EditorManager      = brackets.getModule('editor/EditorManager');
  var LanguageManager    = brackets.getModule("language/LanguageManager");

  // this is a map object of lowercased name and language object
  var languages = LanguageManager.getLanguages();
  // load lookup list of shebang values
  var map = require('shebang-map');

  function getFirstLine(doc) {
    return doc.getRange({line: 0, ch: 0}, {line:1, ch:0}).trim();
  }

  function detectLanguage(firstLine) {
    var langName = map[firstLine];

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

  function highlightShebang(firstLine) {
    var editor = EditorManager.getActiveEditor();
    // this is probably not supported, but I could not find a supported way to get
    // the original CodeMirror object, and most methods are not exposed on the
    // Document object
    var codeMirror = editor._codeMirror;

    if (!codeMirror || !codeMirror.markText) {
      return;
    }

    codeMirror.markText(
      { line: 0, ch: 0 }, //from
      { line: 0, ch: firstLine.length }, // to
      {
        className: 'cm-meta',
        inclusiveLeft: false,
        inclusiveRight: true
      }
    );
  }

  function detectAndHighlight() {
    var doc = DocumentManager.getCurrentDocument();

    if (!doc) {
      // user probs closed everything
      return;
    }

    var firstLine = getFirstLine(doc);
    var language;

    if (!/^#\!/.test(firstLine)) {
      return;
    }

    // this is a shebang comment... highlight it
    highlightShebang(firstLine);

    if (doc) {
      language = detectLanguage(firstLine);
    }

    if (language) {
      setLanguage(doc, language);
    }
  }

  function init() {
    MainViewManager.on('currentFileChange', detectAndHighlight);
    DocumentManager.on('documentSaved', detectAndHighlight);
  }

  // Initialize extension
  AppInit.appReady(init);
});
