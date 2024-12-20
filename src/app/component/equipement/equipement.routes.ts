import { Routes } from '@angular/router';

import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";

export const equipementRoute: Routes = [
   {
    path: 'list',
    component: ListComponent,
    data: {
      title: "Liste des équipements",
      breadcrumb: "Liste des équipements",
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: "Nouvel équipement",
      breadcrumb: "Nouvel équipement",
    }
  }
];

export default equipementRoute;
