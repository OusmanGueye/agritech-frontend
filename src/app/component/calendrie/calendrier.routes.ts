import { Routes } from '@angular/router';

import {CalendrierComponent} from "./calendrier/calendrier.component";

export const calendrierRoute: Routes = [
  {
    path: 'list',
   component: CalendrierComponent,
    data: {
      title: 'Calendrier',
      breadcrumb: 'Calendrier',
    },
  },
];

export default calendrierRoute;
