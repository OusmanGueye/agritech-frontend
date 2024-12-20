import {Routes} from "@angular/router";
import {MarcheComponent} from "./marche/marche.component";

export const MarcheRoutes: Routes = [
    {
        path: 'list',
        component: MarcheComponent,
        data: {
            title: 'Marche',
            breadcrumb: 'Marche',
        },
    }
];

export default MarcheRoutes;