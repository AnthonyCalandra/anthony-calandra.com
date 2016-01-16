var marked = require('marked');
var nsh = require('node-syntaxhighlighter');
var scripts = {
  'as3': 'shBrushAS3.js',
  'actionscript3': 'shBrushAS3.js',
  'bash': 'shBrushBash.js',
  'shell': 'shBrushBash.js',
  'cf': 'shBrushColdFusion.js',
  'coldfusion': 'shBrushColdFusion.js',
  'c-sharp': 'shBrushCSharp.js',
  'csharp': 'shBrushCSharp.js',
  'cpp': 'shBrushCpp.js',
  'c': 'shBrushCpp.js',
  'css': 'shBrushCss.js',
  'delphi': 'shBrushDelphi.js',
  'pas': 'shBrushDelphi.js',
  'pascal': 'shBrushDelphi.js',
  'diff': 'shBrushDiff.js',
  'patch': 'shBrushDiff.js',
  'erl': 'shBrushErlang.js',
  'erlang': 'shBrushErlang.js',
  'groovy': 'shBrushGroovy.js',
  'js': 'shBrushJScript.js',
  'jscript': 'shBrushJScript.js',
  'javascript': 'shBrushJScript.js',
  'java': 'shBrushJava.js',
  'jfx': 'shBrushJavaFX.js',
  'javafx': 'shBrushJavaFX.js',
  'perl': 'shBrushPerl.js',
  'pl': 'shBrushPerl.js',
  'php': 'shBrushPhp.js',
  'plain': 'shBrushPowerPlain.js',
  'text': 'shBrushPowerPlain.js',
  'ps': 'shBrushPowerShell.js',
  'powershell': 'shBrushPowerShell.js',
  'py': 'shBrushPython.js',
  'python': 'shBrushPython.js',
  'rails': 'shBrushRuby.js',
  'ror': 'shBrushRuby.js',
  'ruby': 'shBrushRuby.js',
  'scala': 'shBrushScala.js',
  'sql': 'shBrushSql.js',
  'vb': 'shBrushVb.js',
  'vbnet': 'shBrushVb.js',
  'xml': 'shBrushXml.js',
  'xhtml': 'shBrushXml.js',
  'xslt': 'shBrushXml.js',
  'html': 'shBrushXml.js',
  'xhtml': 'shBrushXml.js'
};
var requiredScripts = [];

marked.setOptions({
  sanitize: false,
  highlight: function(code, language) {
    language = language || 'text';
    if (requiredScripts.indexOf(scripts[language]) === -1) {
      requiredScripts.push(scripts[language]);
    }
    // Default to text if the language can't be found.
    if (scripts[language] === undefined) {
      language = 'text';
    }
    return nsh.highlight(code, nsh.getLanguage(language));
  }
});
module.exports = {
  marked: marked,
  requiredScripts: requiredScripts,
  scripts: scripts
};
