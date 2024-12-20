import { Routes } from '@angular/router';

import {ListComponent} from "./list/list.component";
import {UserRouteAccessService} from "../../core/auth/user-route-access.service";
import {NewComponent} from "./new/new.component";

export const parcelleRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'Liste des parcelles',
      breadcrumb: 'Liste des parcelles',
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: 'Nouvelle parcelle',
      breadcrumb: 'Nouvelle parcelle',
    },
  }
];

export default parcelleRoute;
