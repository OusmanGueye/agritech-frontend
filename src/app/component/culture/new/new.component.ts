import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import Swal from 'sweetalert2';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgClass, NgForOf} from "@angular/common";
import {IParcelle} from "../../parcelle/parcelle.model";
import {TypeCulture} from "../../enumerations/type-culture.model";
import {ParcelleService} from "../../parcelle/service/parcelle.service";
import {CultureService} from "../service/culture.service";

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
  cultureForm!: FormGroup;
  parcelles: IParcelle[] = [];
  typeCultureOptions = Object.keys(TypeCulture); // Liste des types de culture
  isSubmitting = false;

  constructor(
      private fb: FormBuilder,
      private parcelleService: ParcelleService,
      private cultureService: CultureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadParcelles();
  }

  initForm(): void {
    this.cultureForm = this.fb.group({
      nom: ['', [Validators.required]],
      dateSemis: ['', Validators.required],
      dateRecolte: ['', Validators.required],
      typeCulture: ['', Validators.required],
      parcelleId: ['', Validators.required], // Liaison avec une parcelle
    });
  }

  loadParcelles(): void {
    this.parcelleService.getAllParcelle().subscribe({
      next: (data) => {
        this.parcelles = data.body || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des parcelles', err);
      },
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    if (this.cultureForm.valid) {
      const formData = this.cultureForm.value;
      const { parcelleId, ...cultureData } = formData; // Séparer `parcelleId` des autres données

      this.cultureService.createCulture(cultureData, parcelleId).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Culture créée avec succès !',
          }).then(() => {
            this.cultureForm.reset(); // Réinitialiser le formulaire
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de la culture.',
          });
          console.error('Erreur lors de la création de la culture :', err);
        },
      });
    } else {
      this.isSubmitting = false;
    }
  }
}
