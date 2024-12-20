import { Routes } from '@angular/router';
import {DepenseComponent} from "./depense/depense.component";
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";
import {NewDepenseComponent} from "./new-depense/new-depense.component";



export const depenseRoute: Routes = [
  {
    path: 'list',
    component: DepenseComponent,
    data: {
     title: 'Depense',
        breadcrumb: 'Depense',
    },
  },
    {
        path: 'new',
        component: NewDepenseComponent,
        data: {
            title: 'New Depense',
            breadcrumb: 'New Depense',
        },
    }
];

export default depenseRoute;
