import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

export const entrepriseRoute: Routes = [
  {
    path: 'list', // Chemin racine pour le module
    component: ListComponent, // Composant par défaut pour la liste
    data: {
        title: 'Liste des entreprises', // Titre de la page
        breadcrumb: 'Liste des entreprises', // Fil d'Ariane
    }
  },
  {
    path: 'new', // Sous-chemin pour ajouter une nouvelle entreprise
    component: NewComponent,
    data: {
        title: 'Ajouter une entreprise',
        breadcrumb: 'Ajouter une entreprise',
    }
  },
];

export default entrepriseRoute;
