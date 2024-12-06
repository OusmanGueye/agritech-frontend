import { Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes'

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pages/sample-page1',
        pathMatch: 'full'
    },

    {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
        title: 'login.title',
    },

    {
        path: '',
        component: ContentComponent,
        children: dashData,
    },
];
