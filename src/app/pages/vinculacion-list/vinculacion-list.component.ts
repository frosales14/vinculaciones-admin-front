import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Vinculacion } from 'src/app/models/interfaces/vinculacion.interface';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vinculacion-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './vinculacion-list.component.html',
  styleUrls: ['./vinculacion-list.component.scss'],
})
export class VinculacionListComponent implements OnInit {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  public vinculaciones: Vinculacion[] = [];

  public vinculaciones$ = this.apiService.getVinculaciones();

  public studentId = this.authService.studentId;

  ngOnInit(): void {
    this.getVinculaciones();
  }

  onSuscribeClick(vinculacionId: string) {
    this.apiService
      .subscribeVinculalacion(vinculacionId)
      .pipe(switchMap(() => this.vinculaciones$))
      .subscribe({
        next: (vinculaciones) => {
          this.vinculaciones = vinculaciones;
        },
      });

    this.vinculaciones.forEach((vinculacion) => {
      vinculacion.students.find((student) => student._id == this.studentId);
    });
  }

  getVinculaciones() {
    this.vinculaciones$.subscribe({
      next: (vinculaciones) => {
        this.vinculaciones = vinculaciones;
      },
    });
  }

  isSusbcribe(vinculacion: Vinculacion) {
    return vinculacion.students.find((vin) => vin._id == this.studentId);
  }
}
