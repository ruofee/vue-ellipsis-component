module.exports = {
  head: [
    [
      'script',
      {},
      `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?cb5395783f48fe7b934e89091b8da0ec";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    `,
    ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vue-ellipsis-component',
      description: '高性能、可自定义的 vue 文本缩略组件。支持自定义缩略符、尾文本过滤、富文本缩略等功能。',
    },
  },
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    sidebar: [
      { title: '指南', collapsable: false, children: ['/guide/', '/getting-started/', '/usage/'] },
      { title: 'API', collapsable: false, path: '/api/' },
      { title: 'Vue 3.x', collapsable: false, path: '/vue3.x/' },
      { title: 'Q&A', collapsable: false, path: '/q-a/' },
    ],
    nav: [
      { text: 'API', link: '/api/' },
      { text: 'Vue 3.x', link: 'https://github.com/ruofee/vue-ellipsis-3' },
      { text: 'GitHub', link: 'https://github.com/ruofee/vue-ellipsis-component' },
    ],
  },
};
