import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Menu {
  headTitle1?: string;
  level?: number;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  id?: number;
  bookmark?: boolean;
  children?: Menu[];
  horizontalList?: boolean;
  items?: Menu[]
}


@Injectable({
  providedIn: 'root'
})
export class NavmenuService {

  public isDisplay!: boolean;
  public language: boolean = false;
  public isShow: boolean = false;
  public closeSidebar: boolean = false;


  constructor() { }

  MENUITEMS: Menu[] = [
    // {
    //   headTitle1: "General",
    // },
    // {
    //   id: 1,
    //   level: 1,
    //   title: "Sample Page",
    //   icon: "home",
    //   type: "sub",
    //   active: true,
    //   children: [
    //     { path: '/pages/sample-page1', title: 'Sample-page1', type: 'link' },
	// 			{ path: '/pages/sample-page2', title: 'Sample-page2', type: 'link' },
    //   ],
    // },
    //
    // { level: 1, id:2,  path: '/sample-page',  title: "sample-page-3", icon: "support-tickets", active: false, type: "link" },
    // {
    //   headTitle1: "Administration",
    // },
    {
      id: 3,
      level: 1,
      title: "Entreprise",
      icon: "blog",
      type: "sub",
      active: true,
      children: [
        {
          path: '/entreprise/list', title: 'List', type: 'link',
        },
        {
          path: '/entreprise/new', title: 'Nouveau', type: 'link',
        }
      ],
    },
    {
      id: 4,
      level: 1,
      title: "Gerant",
      icon: "user",
      type: "sub",
      active: false,
      children: [
        {
          path: '/admin', title: 'List', type: 'link',
        },
        {
          path: '/admin/new', title: 'Nouveau', type: 'link',
        }
      ],
    },

    {
        headTitle1: "Gestion Des Ressources",
    },
      {
        id: 5,
        level: 1,
        title: "Site",
        icon: "form",
        type: "sub",
        active: false,
        children: [
          {
            path: '/site/list', title: 'List', type: 'link',
          },
          {
            path: '/site/new', title: 'Nouveau', type: 'link',
          }
        ],
      },
    {
        id: 6,
        level: 1,
        title: "Stock",
        icon: "others",
        type: "sub",
        active: false,
        children: [
            {
              path: '/stock/list', title: 'List', type: 'link',
            },
            {
              path: '/stock/new', title: 'Nouveau', type: 'link',
            }
        ],
    },
    {
      id: 7,
        level: 1,
        title: "Equipement",
        icon: "learning",
        type: "sub",
        active: false,
        children: [
            {
              path: '/equipement/list' , title: 'List', type: 'link',
            },
            {
              path: '/equipement/new', title: 'Nouveau', type: 'link',
            }
        ],
    },
    {
        id: 8,
        level: 1,
        title: "Intrant",
        icon: "support-tickets",
        type: "sub",
        active: false,
        children: [
            {
              path: '/intrant/list', title: 'List', type: 'link',
            },
            {
              path: '/intrant/new', title: 'Nouveau', type: 'link',
            }
        ],
    },
      {
          headTitle1: "Gestion Des Cultures",
      },
      {
            id: 9,
            level: 1,
            title: "Parcelle",
            icon: "form",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/parcelle/list', title: 'List', type: 'link',
                },
                {
                    path: '/parcelle/new', title: 'Nouveau', type: 'link',
                }
            ],
      },
        {
            id: 10,
            level: 1,
            title: "Culture",
            icon: "others",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/culture/list', title: 'List', type: 'link',
                },
                {
                    path: '/culture/new', title: 'Nouveau', type: 'link',
                }
            ],
        },
      {
            id: 16,
            level: 1,
            title: "Observation",
            icon: "learning",
            type: "link",
            active: false,
            path: '/observation/list',
      },
      {
            headTitle1: "Gestion Des Evenements",
        },
        {
            id: 11,
            level: 1,
            path: '/calendrier/list',
            title: "Calendrier",
            icon: "learning",
            type: "link",
            active: false,
       },
    {
        id: 12,
        level: 1,
        path: '/meteo/list',
        title: "Meteo",
        icon: "support-tickets",
        type: "link",
        active: false,
    },

        {
            headTitle1: "Gestion Des Ventes",
        },
      {
          id: 15,
          level: 1,
          title: "Marche",
          icon: "learning",
          type: "link",
          active: false,
          path: '/marche/list',
      },
        {
            id: 13,
            level: 1,
            title: "Client",
            icon: "form",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/client/list', title: 'List', type: 'link',
                },
                {
                    path: '/client/new', title: 'Nouveau', type: 'link',
                }
            ],
        },
        {
            id: 14,
            level: 1,
            title: "Commande",
            icon: "others",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/commande/list', title: 'List', type: 'link',
                },
                {
                    path: '/commande/new', title: 'Nouveau', type: 'link',
                }
            ],
        },

      {
            headTitle1: "Gestion Des Employes",
        },
        {
            id: 17,
            level: 1,
            title: "Employe",
            icon: "form",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/employe/list', title: 'List', type: 'link',
                },
                {
                    path: '/employe/new', title: 'Nouveau', type: 'link',
                }
            ],
        },
      {
            id: 18,
            level: 1,
            title: "Tache",
            icon: "others",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/tache/list', title: 'List', type: 'link',
                },
                {
                    path: '/tache/new', title: 'Nouveau', type: 'link',
                }
            ],
      },
      {
          headTitle1: "Gestion Des Fournisseurs",
      }
        ,
        {
            id: 19,
            level: 1,
            title: "Fournisseur",
            icon: "form",
            type: "sub",
            active: false,
            children: [
                {
                    path: '/fournisseur/list', title: 'List', type: 'link',
                },
                {
                    path: '/fournisseur/new', title: 'Nouveau', type: 'link',
                }
            ],
        },
    {
        id: 20,
        level: 1,
        title: "Facture Fournisseur",
        icon: "others",
        type: "sub",
        active: false,
        children: [
            {
                path: '/facture-fournisseur/list', title: 'List', type: 'link',
            },
            {
                path: '/facture-fournisseur/new', title: 'Nouveau', type: 'link',
            },
        ],
    },
      {
          headTitle1: "Gestion De La Comptabilite",
      }
        ,
      {
          id: 21,
          level: 1,
          title: "Compte",
          icon: "form",
          type: "link",
          active: false,
          path: '/compte/list',
      },
      {
            id: 22,
            level: 1,
            title: "Transaction",
            icon: "others",
            type: "link",
            active: false,
            path: '/transaction/list',
      },
        {
                id: 23,
                level: 1,
                title: "Charge",
                icon: "learning",
                type: "sub",
                active: false,
                children: [
                    {
                        path: '/depense/list', title: 'List', type: 'link',
                    },
                    {
                        path: '/depense/new', title: 'Nouveau', type: 'link',
                    }
                ],
        },
      {
            headTitle1: "Education",
        } ,
        {
            id: 24,
            level: 1,
            title: "Formation",
            icon: "form",
            type: "link",
            active: false,
            path: '/formation/list',
        },
      // {
      //       id: 25,
      //       level: 1,
      //       title: "Tutorial",
      //       icon: "others",
      //       type: "link",
      //       active: false,
      // }


  ]

  item = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
