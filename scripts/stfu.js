const fs = require("fs");

(() => {
  const codeToObscure = /console.warn\([\s\S].*`Require cycle:/;
  const problemFilePath = require.resolve(
    "metro/src/lib/polyfills/require.js.flow"
  );
  const problemFileContent = fs.readFileSync(problemFilePath, "utf8");
  fs.writeFileSync(
    problemFilePath,
    problemFileContent.replace(codeToObscure, "const noConsoleWarn = (`"),
    "utf8"
  );
})();

(() => {
  const codeToObscure = /console.warn\('Require cycle:/;
  const problemFilePath = require.resolve("metro/src/lib/polyfills/require.js");
  const problemFileContent = fs.readFileSync(problemFilePath, "utf8");
  fs.writeFileSync(
    problemFilePath,
    problemFileContent.replace(codeToObscure, "const noConsoleWarn = ('"),
    "utf8"
  );
})();

(() => {
  const codeToObscure = /console.warn\([\s\S].*"Require cycle:/;
  const problemFilePath = require.resolve("metro/src/lib/polyfills/require.js");
  const problemFileContent = fs.readFileSync(problemFilePath, "utf8");
  fs.writeFileSync(
    problemFilePath,
    problemFileContent.replace(codeToObscure, 'const noConsoleWarn = ("'),
    "utf8"
  );
})();
