import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";



export const factureFournisseurRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'List Facture Fournisseur',
        breadcrumb: 'List Facture Fournisseur',
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: 'New Facture Fournisseur',
        breadcrumb: 'New Facture Fournisseur',
    },
  }
];

export default factureFournisseurRoute;
