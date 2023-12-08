import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-vinculacion',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-vinculacion.component.html',
  styleUrls: ['./add-vinculacion.component.scss'],
})
export class AddVinculacionComponent {}
