import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {EntrepriseService} from "../service/entreprise.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {

  entrepriseForm: FormGroup;
  isSubmitting = false;
  validate = false; // Permet d'afficher les classes de validation

  constructor(
      private fb: FormBuilder,
       private entrepriseService: EntrepriseService,
      private router: Router
  ) {
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      localisation: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.validate = true; // Active les classes de validation

    if (this.entrepriseForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.entrepriseService.createEntreprise(this.entrepriseForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          title: 'Succès !',
          text: 'L\'entreprise a été créée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/entreprise/list']); // Redirection après la confirmation
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la création de l\'entreprise.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Erreur lors de la création de l\'entreprise :', err);
      },
    });
  }

}
