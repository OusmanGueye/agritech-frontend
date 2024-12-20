import { Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {NewComponent} from "./new/new.component";




export const adminRoute: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
        title: 'Liste des administrateurs',
        breadcrumb: 'Liste des administrateurs'
    }
  },
    {
        path: 'new',
        component: NewComponent,
        data: {
            title: 'Créer un administrateur',
            breadcrumb: 'Créer un administrateur'
        }
    }
];

export default adminRoute;
