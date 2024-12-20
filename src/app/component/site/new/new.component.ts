import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TypeSite} from "../../enumerations/type-site.model";
import Swal from "sweetalert2";
import {SiteService} from "../service/site.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  siteForm: FormGroup;
  isSubmitting = false;
  typeSites = Object.keys(TypeSite); // Liste des types de site

  constructor(private fb: FormBuilder, private siteService: SiteService,
              private router: Router) {
    this.siteForm = this.fb.group({
      nom: ['', Validators.required],
      reference: ['', Validators.required],
      localisation: [''],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      typeSite: [null, Validators.required],
      isDelete: [false],
      isDisponible: [true],
    });
  }

  onSubmit(): void {
    if (this.siteForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir correctement le formulaire.',
      });
      return;
    }

    this.isSubmitting = true;

    const siteData = this.siteForm.value;
    this.siteService.createSite(siteData).subscribe({
      next: () => {
        this.isSubmitting = false;

        // SweetAlert de succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Site créé avec succès.',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/site/list']); // Redirige vers la liste des sites
        });
      },
      error: (err) => {
        this.isSubmitting = false;

        // SweetAlert d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la création du site. Veuillez réessayer.',
        });
        console.error('Erreur lors de la création du site :', err);
      },
    });
  }
}
