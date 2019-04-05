module.exports = function (api) {
  api.cache(true);
  return {
    ignore: ['*/node_modules/'],
    presets: ["@babel/preset-react","@babel/preset-env"]
  };
}
