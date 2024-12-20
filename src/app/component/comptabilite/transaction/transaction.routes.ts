import { Routes } from '@angular/router';

import {TransactionComponent} from "./transaction/transaction.component";
import {NewComponent} from "./new/new.component";

export const transactionRoute: Routes = [
  {
    path: 'list',
    component: TransactionComponent,
    data: {
      title: 'List Transaction',
        breadcrumb: 'List Transaction',
    },
  },
  {
    path: 'new',
    component: NewComponent,
    data: {
      title: 'New Transaction',
        breadcrumb: 'New Transaction',
    },
  }
];

export default transactionRoute;
