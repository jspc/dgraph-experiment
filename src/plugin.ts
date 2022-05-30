import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const kaluzagraphPlugin = createPlugin({
  id: 'kaluzagraph',
  routes: {
    root: rootRouteRef,
  },
});

export const KaluzagraphPage = kaluzagraphPlugin.provide(
  createRoutableExtension({
    name: 'KaluzagraphPage',
    component: () =>
      import('./components/ServicesComponent').then(m => m.ServicesComponent),
    mountPoint: rootRouteRef,
  }),
);
