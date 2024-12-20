import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SiteService} from "../../site/service/site.service";
import {ISite} from "../../site/site.model";
import {NgClass, NgForOf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {TypeSite} from "../../enumerations/type-site.model";
import {EquipementType} from "../../enumerations/equipement-type.model";
import {EquipementService} from "../service/equipement.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  equipementForm!: FormGroup;
  sites: ISite[] = [];
  isSubmitting = false;
  typeEquipements = Object.keys(EquipementType); // Liste des types de site

  constructor(private fb: FormBuilder, private siteService: SiteService,private equipementService: EquipementService,  private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSites();
  }

  initForm(): void {
    this.equipementForm = this.fb.group({
      nom: ['', [Validators.required]],
      type: ['', [Validators.required]],
      etat: [''],
      siteId: ['', [Validators.required]], // Liaison avec le site
    });
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
    this.isSubmitting = true;
    if (this.equipementForm.valid) {
      const formData = this.equipementForm.value;
      const { siteId, ...equipementData } = formData;

      this.equipementService.createEquipement(equipementData, siteId).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          // Afficher une notification de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Équipement créé avec succès !',
            confirmButtonText: 'OK',
          }).then(() => {
            // Rediriger vers la page liste des équipements après confirmation
            this.router.navigate(['/equipement/list']);
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          // Afficher une alerte d'erreur avec SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la création de l’équipement.',
          });
          console.error('Erreur lors de la création de l’équipement :', err);
        },
      });
    } else {
      this.isSubmitting = false;
    }
  }

}
