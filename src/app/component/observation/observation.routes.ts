import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";


export const observationRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'Observation',
      breadcrumb: 'Observation',
    },
  },
];

export default observationRoute;
