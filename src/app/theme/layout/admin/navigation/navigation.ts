import { Injectable } from '@angular/core';
import { DattaConfig } from '../../../../app-config';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
  DattaConfig;
  rol: string[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Información',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-bar-chart-2',
        classes: 'nav-item',
        rol: ['admin'],
      },
    ],
  },
  {
    id: 'vinculacion',
    title: 'Vinculacion',
    type: 'group',
    icon: 'feather icon-calendar',
    children: [
      {
        id: 'vinculaciones',
        title: 'vinculaciones',
        type: 'collapse',
        icon: 'feather icon-link',
        children: [
          {
            id: 'Vinculaciones',
            title: 'Disponibles',
            type: 'item',
            url: '/vinculaciones/disponible',
            icon: 'feather icon-clipboard',
            classes: 'nav-item',
            rol: ['student'],
          },
          {
            id: 'Vinculaciones',
            title: 'Agregar',
            type: 'item',
            url: '/vinculaciones/agregar',
            icon: 'feather icon-plus',
            classes: 'nav-item',
            rol: ['admin'],
          },
          {
            id: 'Vinculaciones',
            title: 'Lista',
            type: 'item',
            url: '/vinculaciones/lista',
            icon: 'feather icon-clipboard',
            classes: 'nav-item',
            rol: ['admin'],
          },
          {
            id: 'Vinculaciones',
            title: 'Recursos',
            type: 'item',
            url: '/vinculaciones/recursos',
            icon: 'feather icon-paperclip',
            classes: 'nav-item',
            rol: ['student'],
          },
        ],
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
