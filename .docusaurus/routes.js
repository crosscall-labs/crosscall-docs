import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f4a'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '5ff'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '8d0'),
            routes: [
              {
                path: '/overview/architecture',
                component: ComponentCreator('/overview/architecture', '2b4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/overview/how-we-differ',
                component: ComponentCreator('/overview/how-we-differ', '45a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/overview/why-crosscall',
                component: ComponentCreator('/overview/why-crosscall', '840'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/protocol/call-abstraction',
                component: ComponentCreator('/protocol/call-abstraction', 'd7e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/protocol/glossary',
                component: ComponentCreator('/protocol/glossary', '42f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/protocol/solvers',
                component: ComponentCreator('/protocol/solvers', 'be5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/use-cases/bridging',
                component: ComponentCreator('/use-cases/bridging', '83f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/use-cases/crosschain-liquidity',
                component: ComponentCreator('/use-cases/crosschain-liquidity', '8b9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/use-cases/native-execution',
                component: ComponentCreator('/use-cases/native-execution', 'ae9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/use-cases/overview',
                component: ComponentCreator('/use-cases/overview', '9b6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '682'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
