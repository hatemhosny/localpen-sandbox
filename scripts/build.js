var esbuild = require('esbuild');
var fs = require('fs');
var path = require('path');

var srcDir = path.resolve(__dirname + '/../src');
var outDir = path.resolve(__dirname + '/../build/v1');
var node_modules = path.resolve(__dirname + '/../node_modules');

esbuild.buildSync({
  entryPoints: ['src/utils.ts'],
  bundle: true,
  minify: true,
  outfile: outDir + '/utils.js',
  format: 'iife',
});

fs.copyFileSync(path.resolve(srcDir + '/index.html'), path.resolve(outDir + '/index.html'));
fs.copyFileSync(
  path.resolve(node_modules + '/es-module-shims/dist/es-module-shims.min.js'),
  path.resolve(outDir + '/es-module-shims.min.js'),
);
fs.copyFileSync(
  path.resolve(node_modules + '/es-module-shims/dist/es-module-shims.min.js.map'),
  path.resolve(outDir + '/es-module-shims.min.js.map'),
);

console.log('built to: ' + outDir);
