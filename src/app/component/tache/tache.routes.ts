import { Routes } from '@angular/router';
import {TacheComponent} from "./tache/tache.component";
import {NewTacheComponent} from "./new-tache/new-tache.component";


export const tacheRoute: Routes = [
  {
    path: 'list',
    component: TacheComponent,
    data: {
      title: 'List Tache',
        breadcrumb: 'List Tache',
    },
  },
  {
    path: 'new',
    component: NewTacheComponent,
    data: {
      title: 'New Tache',
        breadcrumb: 'New Tache',
    },
  }

];

export default tacheRoute;
