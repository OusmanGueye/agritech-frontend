import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ISite} from "../../site/site.model";
import {SiteService} from "../../site/service/site.service";
import {NgClass} from "@angular/common";
import {StockService} from "../service/stock.service";
import {NgSelectModule} from "@ng-select/ng-select";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  stockForm: FormGroup;
  sites: ISite[] = [];
  isSubmitting = false;

  constructor(
      private fb: FormBuilder,
      private siteService: SiteService,
      private stockService: StockService,
      private router: Router
  ) {
    this.stockForm = this.fb.group({
      nom: ['', Validators.required],
      emplacement: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]],
      quantite: [0],
      siteId: [null, Validators.required], // Lien avec le site
    });
  }

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.siteService.getAllSites().subscribe({
      next: (response) => {
        this.sites = response.body || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sites :', err);
      },
    });
  }

  onSubmit(): void {
    if (this.stockForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir correctement le formulaire.',
      });
      return;
    }

    this.isSubmitting = true;

    const stockData = { ...this.stockForm.value }; // Données du formulaire
    const siteId = this.stockForm.get('siteId')?.value; // Récupération de l'ID du site

    this.stockService.createStock(stockData, siteId).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Stock créé avec succès.',
        }).then(() => {
          this.router.navigate(['/stock/list']); // Redirection vers la liste des stocks
        });
        this.isSubmitting = false;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la création du stock.',
        });
        console.error('Erreur lors de la création du stock :', err);
        this.isSubmitting = false;
      },
    });
  }



}
