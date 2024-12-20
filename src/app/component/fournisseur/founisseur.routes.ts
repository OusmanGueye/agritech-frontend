import { Routes } from '@angular/router';

import {FournisseurComponent} from "./fournisseur/fournisseur.component";
import {NewFournisseurComponent} from "./new-fournisseur/new-fournisseur.component";

export const founisseurRoute: Routes = [
  {
    path: 'list',
    component: FournisseurComponent,
    data: {
      title: 'List Fournisseur',
        breadcrumb: 'List Fournisseur',
    },
  },
  {
    path: 'new',
    component: NewFournisseurComponent,
    data: {
      title: 'New Fournisseur',
        breadcrumb: 'New Fournisseur',
    },
  }
];

export default founisseurRoute;
