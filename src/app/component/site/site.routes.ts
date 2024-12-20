import { Routes } from '@angular/router';

import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";

export const siteRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: "Liste des sites",
      breadcrumb: "Liste des sites",
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
        title: "Nouveau site",
        breadcrumb: "Nouveau site",
    }
  }
  // {
  //   path: ':id/view',
  //   loadComponent: () => import('./detail/site-detail.component').then(m => m.SiteDetailComponent),
  //   resolve: {
  //     site: SiteResolve,
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
  // {
  //   path: 'new',
  //   loadComponent: () => import('./update/site-update.component').then(m => m.SiteUpdateComponent),
  //   resolve: {
  //     site: SiteResolve,
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
  // {
  //   path: ':id/edit',
  //   loadComponent: () => import('./update/site-update.component').then(m => m.SiteUpdateComponent),
  //   resolve: {
  //     site: SiteResolve,
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
];

export default siteRoute;
