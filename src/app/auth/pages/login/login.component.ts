import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginCredentials } from 'src/app/models/interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public onSignInClick() {
    if (this.loginForm.invalid) return;

    const credentials = { ...this.loginForm.value } as LoginCredentials;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/vinculaciones/disponible');
      },
    });
  }
}
