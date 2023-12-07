import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  public signupForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    account_number: [''],
    gender: [''],
    career_years: [''],
    contact_phone: [''],
    day: [''],
    month: [''],
    year: [''],
    inscription_year: [''],
  });

  sendForm() {
    console.log(this.signupForm.value);
  }
}
