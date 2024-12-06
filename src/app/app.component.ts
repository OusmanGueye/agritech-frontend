import {Component, inject} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { TapToTopComponent } from './shared/component/tap-to-top/tap-to-top.component';
import {ApplicationConfigService} from "./core/config/application-config.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "./config/font-awesome-icons";
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,LoaderComponent,TapToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly applicationConfigService = inject(ApplicationConfigService);
  private readonly iconLibrary = inject(FaIconLibrary);

  constructor() {
    this.applicationConfigService.setEndpointPrefix(environment.apiUrl);
    this.iconLibrary.addIcons(...fontAwesomeIcons);
  }

}
