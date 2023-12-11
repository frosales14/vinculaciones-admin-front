import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  subscription: Subscription = new Subscription();

  public isAdmin = this.authService.roles.includes('admin');
  public showAddBtn = true;

  ngOnInit(): void {
    this.onNavigation();
  }

  onNavigation() {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event['url'] as string;
        const paths = url.split('/');
        this.showAddBtn = !(paths[2] === 'agregar');
      });
  }

  onAddVinculacionClick() {
    this.router.navigateByUrl('/vinculaciones/agregar');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
