import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {StateStorageService} from "../auth/state-storage.service";
import {Observable} from "rxjs";

@Injectable()
export class EntrepriseIdInterceptor implements HttpInterceptor {
    private readonly stateStorageService = inject(StateStorageService);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const entrepriseId: string | null = this.stateStorageService.getEntrepriseId();
        if (entrepriseId) {
            const params = request.params ? request.params : new HttpParams();
            request = request.clone({
                params: params.set('entrepriseId', entrepriseId),
            });
        }else {
            console.error('Entreprise Id is not set');
        }
        return next.handle(request);
    }
}
