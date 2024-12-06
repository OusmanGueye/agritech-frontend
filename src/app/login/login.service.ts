import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


import { Login } from './login.model';
import {AccountService} from "../core/auth/account.service";
import {AuthServerProvider} from "../core/auth/auth-jwt.service";
import {Account} from "../core/auth/account.model";

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly accountService = inject(AccountService);
  private readonly authServerProvider = inject(AuthServerProvider);

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
