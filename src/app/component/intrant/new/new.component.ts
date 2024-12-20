import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import Swal from 'sweetalert2';
import {IStock} from "../../stock/stock.model";
import {IntrantType} from "../../enumerations/intrant-type.model";
import {StockService} from "../../stock/service/stock.service";
import {IntrantService} from "../service/intrant.service";
import {NgClass, NgForOf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";

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
  intrantForm!: FormGroup;
  stocks: IStock[] = [];
  isSubmitting = false;

  intrantTypes = Object.keys(IntrantType); // Liste des types d'intrants

  constructor(
      private fb: FormBuilder,
      private stockService: StockService,
      private intrantService: IntrantService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStocks();
  }

  initForm(): void {
    this.intrantForm = this.fb.group({
      nom: ['', [Validators.required]],
      type: ['', [Validators.required]],
      quantite: [0, [Validators.required, Validators.min(1)]],
      dateExpiration: ['', Validators.required],
      stockId: ['', Validators.required], // Liaison avec le stock
    });
  }

  loadStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (data) => {
        this.stocks = data.body || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stocks', err);
      },
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    if (this.intrantForm.valid) {
      const formData = this.intrantForm.value;
      const { stockId, ...intrantData } = formData; // Séparer le stockId des autres données

      this.intrantService.createIntrant(intrantData, stockId).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Intrant créé avec succès !',
          }).then(() => {
            // Réinitialiser le formulaire ou rediriger
            this.intrantForm.reset();
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de l’intrant.',
          });
          console.error('Erreur lors de la création de l’intrant :', err);
        },
      });
    } else {
      this.isSubmitting = false;
    }
  }
}
