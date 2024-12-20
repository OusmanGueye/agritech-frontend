import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IEntreprise} from "../../entreprise/entreprise.model";
import {Sexe} from "../../enumerations/sexe.model";
import {AdminService} from "../service/admin.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {EntrepriseService} from "../../entreprise/service/entreprise.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  adminForm: FormGroup;
  isSubmitting = false;
  entreprises: IEntreprise[] = []; // Liste des entreprises
  selectedFile: File | null = null; // Photo de l'administrateur
  sexes = Object.keys(Sexe); // Liste des valeurs du sexe
  imagePreview: string | ArrayBuffer | null = null; // Aperçu de l'image

  constructor(
      private fb: FormBuilder,
      private adminService: AdminService,
      private entrepriseService: EntrepriseService,
      private router: Router
  ) {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sexe: [null, Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      entrepriseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe({
      next: (response) => {
        this.entreprises = response.body || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des entreprises :', err);
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Générer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // URL ou base64 de l'image
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.adminForm.invalid || !this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis et sélectionner une photo.',
      });
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('admin', new Blob([JSON.stringify(this.adminForm.value)], { type: 'application/json' }));
    formData.append('entrepriseId', this.adminForm.get('entrepriseId')?.value);
    formData.append('image', this.selectedFile);

    this.adminService.createAdmin(formData).subscribe({
      next: () => {
        this.isSubmitting = false;

        // SweetAlert pour le succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Administrateur créé avec succès.',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/admin']); // Redirection après la confirmation
        });
      },
      error: (err) => {
        this.isSubmitting = false;

        // SweetAlert pour l'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la création de l\'administrateur. Veuillez réessayer.',
        });
        console.error('Erreur lors de la création de l\'administrateur :', err);
      },
    });
  }


}
