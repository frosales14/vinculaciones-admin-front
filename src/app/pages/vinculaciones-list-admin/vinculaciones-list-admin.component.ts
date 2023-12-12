import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vinculacion } from 'src/app/models/interfaces/vinculacion.interface';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vinculaciones-list-admin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './vinculaciones-list-admin.component.html',
  styleUrls: ['./vinculaciones-list-admin.component.scss'],
})
export class VinculacionesListAdminComponent implements OnInit {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  public vinculaciones: Vinculacion[] = [];
  public vinculaciones$ = this.apiService.getVinculaciones();
  public studentId = this.authService.studentId;
  ngOnInit(): void {
    this.getVinculaciones();
  }

  getVinculaciones() {
    this.vinculaciones$.subscribe({
      next: (vinculaciones) => {
        this.vinculaciones = vinculaciones;
      },
    });
  }

  onVinculacionClick(id: string) {
    this.router.navigateByUrl(`/vinculaciones/editar/${id}`);
  }
}
