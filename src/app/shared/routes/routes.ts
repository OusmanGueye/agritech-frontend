import { Routes } from '@angular/router';
import siteRoute from "../../component/site/site.routes";

export const dashData: Routes = [
    {
        path: 'pages',
        data: {
            title: "sample-page",
            breadcrumb: "sample-page",

        },
        loadChildren: () => import('../../../app/component/pages/pages.routes').then(r => r.pages)
    },
    {
        path: 'sample-page',
        data: {
            title: "sample-page",
            breadcrumb: "sample-page",

        },
        loadChildren: () => import('../../../app/component/sample-page/sample-pages.routes').then(r => r.samplePages)
    },
    {
        path: 'site',
        data: {
            title: "site",
            breadcrumb: "site",
        },
        loadChildren: () => import('../../../app/component/site/site.routes').then(r => r.siteRoute)
    },
    {
        path: 'entreprise',
        data: {
            title: 'entreprise',
            breadcrumb: 'entreprise',
        },
        loadChildren: () =>
            import('../../../app/component/entreprise/entreprise.routes').then(
                (m) => m.entrepriseRoute
            ),
    },
    {
        path: 'admin',
        data: {
            title: "admin",
            breadcrumb: "admin",
        },
        loadChildren: () => import('../../../app/component/admin/admin.routes').then(r => r.adminRoute)
    },
    {
        path: 'stock',
        data: {
            title: 'Stock',
            breadcrumb: 'Stock',
        },
        loadChildren: () =>
            import('../../../app/component/stock/stock.routes').then(
                (m) => m.stockRoute
            ),
    },
    {
        path: 'equipement',
        data: {
            title: 'Equipement',
            breadcrumb: 'Equipement',
        },
        loadChildren: () =>
            import('../../../app/component/equipement/equipement.routes').then(
                (m) => m.equipementRoute
            ),
    },
    {
        path: 'intrant',
        data: {
            title: 'Intrant',
            breadcrumb: 'Intrant',
        },
        loadChildren: () =>
            import('../../../app/component/intrant/intrant.routes').then(
                (m) => m.intrantRoute
            ),
    },
    {
        path: 'parcelle',
        data: {
            title: 'Parcelle',
            breadcrumb: 'Parcelle',
        },
        loadChildren: () =>
            import('../../../app/component/parcelle/parcelle.routes').then(
                (m) => m.parcelleRoute
            ),
    },
    {
        path: 'culture',
        data: {
            title: 'Culture',
            breadcrumb: 'Culture',
        },
        loadChildren: () =>
            import('../../../app/component/culture/culture.routes').then(
                (m) => m.cultureRoute
            ),
    },
    {
        path: 'calendrier',
        data: {
            title: 'Calendrier',
            breadcrumb: 'Calendrier',
        },
        loadChildren: () =>
            import('../../../app/component/calendrie/calendrier.routes').then(
                (m) => m.calendrierRoute
            ),
    },
    {
        path: 'meteo',
        data: {
            title: 'Meteo',
            breadcrumb: 'Meteo',
        },
        loadChildren: () =>
            import('../../../app/component/meteo/meteo.routes').then(
                (m) => m.meteoRoute
            ),
    },
    {
        path: 'client',
        data: {
            title: 'Client',
            breadcrumb: 'Client',
        },
        loadChildren: () =>
            import('../../../app/component/client/client.routes').then(
                (m) => m.clientRoute
            ),
    },
    {
        path: 'marche',
        data: {
            title: 'Marche',
            breadcrumb: 'Marche',
        },
        loadChildren: () =>
            import('../../../app/component/marche/marche.routes').then(
                (m) => m.MarcheRoutes
            ),
    },
    {
        path: 'commande',
        data: {
            title: 'Commande',
            breadcrumb: 'Commande',
        },
        loadChildren: () =>
            import('../../../app/component/commande/commande.routes').then(
                (m) => m.commandeRoute
            ),
    },
    {
        path: 'employe',
        data: {
            title: 'Employe',
            breadcrumb: 'Employe',
        },
        loadChildren: () =>
            import('../../../app/component/employe/employe.routes').then(
                (m) => m.employeRoute
            ),
    },
    {
        path: 'tache',
        data: {
            title: 'Tache',
            breadcrumb: 'Tache',
        },
        loadChildren: () =>
            import('../../../app/component/tache/tache.routes').then(
                (m) => m.tacheRoute
            ),
    },
    {
        path: 'fournisseur',
        data: {
            title: 'Fournisseur',
            breadcrumb: 'Fournisseur',
        },
        loadChildren: () =>
            import('../../../app/component/fournisseur/founisseur.routes').then(
                (m) => m.founisseurRoute
            ),
    },
    {
        path: 'facture-fournisseur',
        data: {
            title: 'Facture Fournisseur',
            breadcrumb: 'Facture Fournisseur',
        },
        loadChildren: () =>
            import('../../../app/component/facture-fournisseur/facture-fournisseur.routes').then(
                (m) => m.factureFournisseurRoute
            ),
    },
    {
        path: 'compte',
        data: {
            title: 'Compte',
            breadcrumb: 'Compte',
        },
        loadChildren: () =>
            import('../../../app/component/comptabilite/compte/compte.routes').then(
                (m) => m.compteRoute
            ),
    },
    {
        path: 'transaction',
        data: {
            title: 'Transaction',
            breadcrumb: 'Transaction',
        },
        loadChildren: () =>
            import('../../../app/component/comptabilite/transaction/transaction.routes').then(
                (m) => m.transactionRoute
            ),
    },
    {
        path: 'depense',
        data: {
            title: 'Charge',
            breadcrumb: 'Charge',
        },
        loadChildren: () =>
            import('../../../app/component/comptabilite/depence/depense.routes').then(
                (m) => m.depenseRoute
            ),
    },
    {
        path: 'formation',
        data: {
            title: 'Formation',
            breadcrumb: 'Formation',
        },
        loadChildren: () =>
            import('../../../app/component/Formation/formation.routes').then(
                (m) => m.formationRoute
            ),
    },
    {
        path: 'observation',
        data: {
            title: 'Observation',
            breadcrumb: 'Observation',
        },
        loadChildren: () =>
            import('../../../app/component/observation/observation.routes').then(
                (m) => m.observationRoute
            ),
    }

]