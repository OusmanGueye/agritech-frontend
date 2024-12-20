import { Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes'
import {UserRouteAccessService} from "./core/auth/user-route-access.service";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/calendrier/list',
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
        canActivate: [UserRouteAccessService],
    },

];
