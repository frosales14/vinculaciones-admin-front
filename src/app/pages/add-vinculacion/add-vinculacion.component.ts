import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {
  CreateVinculacion,
  Vinculacion,
} from 'src/app/models/interfaces/vinculacion.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-vinculacion',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-vinculacion.component.html',
  styleUrls: ['./add-vinculacion.component.scss'],
})
export class AddVinculacionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private apiService = inject(ApiService);

  public createVinculacionForm = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required, Validators.minLength(2)]],
    state: ['', [Validators.required]],
    atCharge: ['', [Validators.required]],
    start_date_day: [
      '',
      [Validators.required, Validators.min(1), Validators.max(31)],
    ],
    start_date_month: [
      '',
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    start_date_year: ['', [Validators.required, Validators.min(1)]],
    end_date_day: [
      '',
      [Validators.required, Validators.min(1), Validators.max(31)],
    ],
    end_date_month: [
      '',
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    end_date_year: ['', [Validators.required, Validators.min(1)]],
    hours: [0, [Validators.required, Validators.min(1)]],
    students_limit: [0, [Validators.required, Validators.min(1)]],
    budget: [0, [Validators.required]],
    description: ['', [Validators.required]],
  });

  public vinculacion?: Vinculacion;
  public editMode = false;
  public editId = '';

  ngOnInit(): void {
    this.getVinculacionInfo();
  }

  public getVinculacionInfo() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id) => id !== null),
        switchMap((id) => {
          return this.apiService.getVinculacionByID(id);
        }),
      )
      .subscribe((data: Vinculacion) => {
        this.setFormValues(data);
        this.editMode = true;
      });
  }

  public onSubmitForm() {
    if (this.createVinculacionForm.invalid) return;

    const {
      start_date_day,
      start_date_month,
      start_date_year,
      end_date_day,
      end_date_month,
      end_date_year,
      ...vinculacionRes
    } = this.createVinculacionForm.value;

    const vinculacion: CreateVinculacion = {
      ...vinculacionRes,
      start_date: `${start_date_year}-${start_date_month}-${start_date_day}`,
      end_date: `${end_date_year}-${end_date_month}-${end_date_day}`,
      students: [],
    };

    if (!this.editMode) {
      this.createVinculacion(vinculacion);
    } else {
      this.editVinculacion(vinculacion);
    }
  }

  private createVinculacion(vinculacionData: CreateVinculacion) {
    this.apiService.createVinculacion(vinculacionData).subscribe({
      next: (data) => {
        this.toastr.success('Vinculacion creada exitosamente');
        this.createVinculacionForm.reset();
      },
    });
  }

  private editVinculacion(vinculacion: CreateVinculacion) {
    this.apiService.updateVinculacion(this.editId, vinculacion).subscribe({
      next: (data) => {
        this.toastr.success('Vinculacion editada exitosamente');
      },
    });
  }

  private setFormValues(vinculacion: Vinculacion) {
    const { students, __v, _id, end_date, start_date, ...vinculacionInfo } =
      vinculacion;

    const end_date_format = new Date(end_date);
    const start_date_format = new Date(start_date);

    const end_date_day = end_date_format.getDate() + '';
    const end_date_month = end_date_format.getMonth() + 1 + '';
    const end_date_year = end_date_format.getFullYear() + '';

    const start_date_day = start_date_format.getDate() + '';
    const start_date_month = start_date_format.getMonth() + 1 + '';
    const start_date_year = start_date_format.getFullYear() + '';

    const vinculacionValues = {
      ...vinculacionInfo,
      start_date_day,
      start_date_month,
      start_date_year,
      end_date_day,
      end_date_month,
      end_date_year,
    };

    this.editId = _id;
    this.vinculacion = vinculacion;
    this.createVinculacionForm.patchValue(vinculacionValues);
  }
}
