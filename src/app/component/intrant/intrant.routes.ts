import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {UserRouteAccessService} from "../../core/auth/user-route-access.service";
import {NewComponent} from "./new/new.component";



export const intrantRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'Intrants',
      breadcrumb: 'Intrants',
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: 'Nouvel intrant',
      breadcrumb: 'Nouvel intrant',
    },
  }
];

export default intrantRoute;
