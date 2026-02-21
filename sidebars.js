/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'overview/why-crosscall',
        'overview/architecture',
        'overview/how-we-differ',
      ],
    },
    {
      type: 'category',
      label: 'Protocol',
      collapsed: false,
      items: [
        'protocol/call-abstraction',
        'protocol/solvers',
        'protocol/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'use-cases/overview',
        'use-cases/bridging',
        'use-cases/native-execution',
        'use-cases/crosschain-liquidity',
      ],
    },
  ],
};

module.exports = sidebars;
