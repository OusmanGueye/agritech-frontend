import { Routes } from '@angular/router';

import {EmployeComponent} from "./employe/employe.component";
import {NewEmployeComponent} from "./new-employe/new-employe.component";

export const employeRoute: Routes = [
  {
    path: 'list',
    component: EmployeComponent,
    data: {
      title: 'List Employe',
        breadcrumb: 'List Employe',
    },
  },
  {
    path: 'new',
    component: NewEmployeComponent,
    data: {
      title: 'New Employe',
        breadcrumb: 'New Employe',
    },
  }
];

export default employeRoute;
