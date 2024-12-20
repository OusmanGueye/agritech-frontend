import { Routes } from '@angular/router';

import {MeteoComponent} from "./meteo/meteo.component";

export const meteoRoute: Routes = [
  {
    path: 'list',
    component: MeteoComponent,
    data: {
      title: 'Meteo',
      breadcrumb: 'Meteo',
    },
  },
];

export default meteoRoute;
