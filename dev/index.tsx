import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { kaluzagraphPlugin, KaluzagraphPage } from '../src/plugin';

createDevApp()
  .registerPlugin(kaluzagraphPlugin)
  .addPage({
    element: <KaluzagraphPage />,
    title: 'Root Page',
    path: '/kaluzagraph'
  })
  .render();
