import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CreateVinculacion,
  Vinculacion,
} from 'src/app/models/interfaces/vinculacion.interface';
import { CreateStudent } from 'src/app/models/interfaces/student.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    account_number: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    career_years: [, [Validators.required]],
    contact_phone: ['', [Validators.required]],
    day: [, [Validators.required]],
    month: [, [Validators.required]],
    year: [, [Validators.required]],
    inscription_year: [, [Validators.required]],
  });

  public showErrors = false;

  sendForm() {
    if (this.signupForm.invalid) {
      this.showErrors = true;
      return;
    }
    const { day, month, year, ...data } = this.signupForm.value;
    const birth_date = `${year}/${month}/${day}`;

    const student: CreateStudent = {
      ...data,
      birth_date,
    };

    this.authService.register(student).subscribe({
      next: (data) => {
        this.router.navigateByUrl('dashboard/vinculaciones');
      },
    });
  }
}
