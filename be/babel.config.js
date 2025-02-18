module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript", // Ensure TypeScript support
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs", // Converts ESModules to CommonJS
  ],
};
