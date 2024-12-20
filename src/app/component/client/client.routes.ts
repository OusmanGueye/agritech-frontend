import { Routes } from '@angular/router';

import {ClientComponent} from "./client/client.component";
import {NewClientComponent} from "./new-client/new-client.component";

export const clientRoute: Routes = [
  {
    path: 'list',
    component: ClientComponent,
    data: {
      title: 'Client',
        breadcrumb: 'Client',
    },
  },
  {
    path: 'new',
    component: NewClientComponent,
    data: {
      title: 'Nouveau Client',
        breadcrumb: 'Nouveau Client',
    },
  }
];

export default clientRoute;
