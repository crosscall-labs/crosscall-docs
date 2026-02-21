// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CrossCall Protocol',
  tagline: 'Native crosschain execution. No bridges.',
  favicon: 'img/favicon.ico',

  url: 'https://0xdoppo.github.io/crosscall-docs/',
  baseUrl: '/',

  organizationName: 'crosscall-labs',
  projectName: 'crosscall-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'CrossCall',
        logo: {
          alt: 'CrossCall Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/crosscall-labs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Introduction', to: '/' },
              { label: 'Architecture', to: '/overview/architecture' },
              { label: 'Call Abstraction', to: '/protocol/call-abstraction' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Twitter', href: 'https://twitter.com/crosscalllabs' },
              { label: 'GitHub', href: 'https://github.com/crosscall-labs' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CrossCall Labs, Inc.`,
      },
      prism: {
        theme: themes.dracula,
        darkTheme: themes.dracula,
        additionalLanguages: ['solidity', 'go', 'bash'],
      },
    }),
};

module.exports = config;
