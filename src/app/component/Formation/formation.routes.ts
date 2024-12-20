import { Routes } from '@angular/router';


import {FormationComponent} from "./formation/formation.component";

export const formationRoute: Routes = [
  {
    path: 'list',
    component: FormationComponent,
    data: {
      title: 'Formation',
        breadcrumb: 'Formation',
    },
  },
];

export default formationRoute;
