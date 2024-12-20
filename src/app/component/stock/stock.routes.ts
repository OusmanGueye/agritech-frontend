import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";
import {UserRouteAccessService} from "../../core/auth/user-route-access.service";



export const stockRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
        title: 'Liste des stocks',
        breadcrumb: 'Liste des stocks',
    }
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
        title: 'Ajouter un stock',
        breadcrumb: 'Ajouter un stock',
    }
  }
];

export default stockRoute;
