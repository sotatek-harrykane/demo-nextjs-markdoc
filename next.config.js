/** @type {import('next').NextConfig} */

// const removeImports = require("next-remove-imports")();

// module.exports = removeImports({
//   experimental: {
//     appDir: true,
//   },
// });

// const withMarkdoc = require("@markdoc/next.js");
// module.exports = withMarkdoc()({
//     pageExtensions: ["tsx", "jsx", "js", "ts", "md", "mdoc"],
// });

// const withPlugins = require("next-compose-plugins");
// const withMarkdoc = require("@markdoc/next.js");
// const removeImports = require("next-remove-imports");

// const NextConfig = withPlugins([withMarkdoc, removeImports], {
//     pageExtensions: ["tsx", "jsx", "js", "ts", "md", "mdoc"],
//     experimental: {
//         appDir: true,
//     },
//     webpack(config) {
//         return config;
//     },
// });

// module.exports = NextConfig;


const removeImports = require("next-remove-imports")();
const withMarkdoc = require("@markdoc/next.js");
const { merge } = require("lodash");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ["tsx", "jsx", "js", "ts", "md", "mdoc"],
};

module.exports = merge(removeImports, withMarkdoc())(nextConfig);
