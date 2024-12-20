import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import Swal from 'sweetalert2';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgClass, NgForOf} from "@angular/common";
import {ISite} from "../../site/site.model";
import {TypeSol} from "../../enumerations/type-sol.model";
import {ParcelleService} from "../service/parcelle.service";
import {SiteService} from "../../site/service/site.service";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  parcelleForm!: FormGroup;
  sites: ISite[] = [];
  isSubmitting = false;

  typeSolOptions = Object.keys(TypeSol); // Obtenir les types de sols

  constructor(
      private fb: FormBuilder,
      private parcelleService: ParcelleService,
      private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSites();
  }

  initForm(): void {
    this.parcelleForm = this.fb.group({
      nom: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.min(1)]],
      superficie: ['', [Validators.required, Validators.min(0.1)]],
      typeSol: ['', Validators.required],
      isDisponible: [true], // Valeur par défaut
      isCultuve: [false], // Valeur par défaut
      siteId: ['', Validators.required], // Association avec le site
    });
  }

  loadSites(): void {
    this.siteService.getAllSites().subscribe({
      next: (data) => {
        this.sites = data.body || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sites', err);
      },
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    if (this.parcelleForm.valid) {
      const formData = this.parcelleForm.value;
      const { siteId, ...parcelleData } = formData;

      this.parcelleService.createParcelle(parcelleData, siteId).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Parcelle créée avec succès !',
          }).then(() => {
            this.parcelleForm.reset(); // Réinitialiser le formulaire
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de la parcelle.',
          });
          console.error('Erreur lors de la création de la parcelle :', err);
        },
      });
    } else {
      this.isSubmitting = false;
    }
  }
}
