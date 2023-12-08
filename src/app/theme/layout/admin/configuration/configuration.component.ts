import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  private authService = inject(AuthService);

  public isAdmin = this.authService.roles.includes('admin');

  onAddVinculacionClick() {}
}
