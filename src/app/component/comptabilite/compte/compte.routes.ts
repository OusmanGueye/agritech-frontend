import { Routes } from '@angular/router';

import {CompteComponent} from "./compte/compte.component";

export const compteRoute: Routes = [
  {
    path: 'list',
    component: CompteComponent,
    data: {
      title: 'Compte',
        breadcrumb: 'Compte',
    },
  }
];

export default compteRoute;
