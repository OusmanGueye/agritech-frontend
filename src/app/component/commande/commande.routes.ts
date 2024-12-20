import { Routes } from '@angular/router';
import {CommandeComponent} from "./commande/commande.component";
import {NewCommandeComponent} from "./new-commande/new-commande.component";


export const commandeRoute: Routes = [
  {
    path: 'list',
    component: CommandeComponent,
    data: {
      title: 'List Commande',
        breadcrumb: 'List Commande',
    },
  },
  {
    path: 'new',
    component: NewCommandeComponent,
    data: {
      title: 'New Commande',
        breadcrumb: 'New Commande',
    },
  }

];

export default commandeRoute;
