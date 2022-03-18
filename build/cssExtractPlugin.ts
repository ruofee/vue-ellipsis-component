import type { PluginOption } from 'vite';

let packageNames: Array<string> = [];
let viteConfig;
let IIFEcss;

// 将 css 打包到 js 文件中
export default function(): PluginOption {
  return {
    apply: 'build',
    enforce: 'post',
    name: 'ViteSingleCssPlugin',
    configResolved(config) {
      viteConfig = config;
      packageNames = viteConfig.build.lib.formats.map(format => viteConfig.build.lib.fileName(format));
    },
    generateBundle(_, bundle) {
      const cssFileName = 'style.css';
      const { [cssFileName]: cssBundle } = bundle;
      if (cssBundle) {
        IIFEcss = `(function() {try {var elementStyle = document.createElement('style');elementStyle.innerText = ${JSON.stringify((cssBundle as any).source)};document.head.appendChild(elementStyle);} catch(error) {console.error(error, 'unable to concat style inside the bundled file')}})()`;
        delete bundle[cssFileName];
      }
      packageNames.forEach(packageName => {
        if (bundle[packageName]) {
          const taregtBundle: any = bundle[packageName];
          taregtBundle.code += IIFEcss;
        }
      })
    }
  }
}