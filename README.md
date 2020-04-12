## scratch-render

#### 主要目的

基于[scratch-render](README_scratch.md)，去掉对scratch-render-fonts的引用，这些字体有1.1M

```javascript
关于scratch-render-fonts中加载的字体，我认真分析了一下，还真的可以去掉
舞台中绘制的精灵有的是png，有的是svg，当然还有其他形式

1）这些字体作用于svg中的文字，目前还真没有在svg中加text，就算有text，我们也不大可能用到这些字体，因为我们都不了解

2）并且最关键一点这些字体还只用于Scratch 2.0 quirks，如果不存在这些字体，2.0的就使用系统默认字体
Transforms an SVG's text elements for Scratch 2.0 quirks
// scratch-svg-renderer/src/svg-renderer.js  102行
if (fromVersion2) {
  // 这个地方就是处理文字字体的地方
  this._transformText();
  ......
}


另外：font-loader-hoc.jsx就是来检查这些字体加载的，FontLoaderHOC可以被去掉了，字体虽然被打包到js，仍然会有load事件
```



#### 代码修改点

scratch-render依赖了scratch-svg-renderer，scratch-svg-renderer又依赖了scratch-render-fonts

为了少子工程，决定将scratch-render和scratch-svg-render二合一，修改如下

1. scratch-render/package.json添加scratch-svg-renderer用到的依赖

   ```javascript
   "base64-js": "1.2.1",
   "transformation-matrix": "1.15.0",
   "scratch-svg-renderer": "删除掉"
   ```

2. 将scratch-svg-renderer/src拷贝到scratch-render/src目录下，重命名为scratch-svg-renderer

3. 改scratch-renderer/src/SVGSkin.js第四行

   ```javascript
   const SvgRenderer = require('./scratch-svg-renderer').SVGRenderer;
   ```

4. 改了scratch-renderer/src/scratch-svg-renderer/font-inliner.js文件，具体请参考该文件

   

#### 如何维护代码，与官方同步

- scratch-renderer/src/SVGSkin.js只改了一行，其它与官方代码相同即可

- scratch-svg-renderer/font-inliner.js改动很小，其它与官方scratch-svg-renderer/src保持相同即可

  





