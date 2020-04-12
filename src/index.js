const RenderWebGL = require('./RenderWebGL');
const SvgRenderer = require('./scratch-svg-renderer');

/**
 * Export for NPM & Node.js
 * @type {RenderWebGL}
 */
module.exports = RenderWebGL;

// 导出SVGRenderer, scratch-gui中用得上
module.exports.SVGRenderer = SvgRenderer.SVGRenderer;

// 导出BitmapAdapter, scratch-gui中用得上
module.exports.BitmapAdapter = SvgRenderer.BitmapAdapter;
