import { Routes } from '@angular/router';


import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";

export const cultureRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'Liste des cultures',
      breadcrumb: 'Liste des cultures',
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: 'Nouvelle culture',
      breadcrumb: 'Nouvelle culture',
    },
  }
];

export default cultureRoute;
