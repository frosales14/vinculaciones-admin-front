import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculacionesListAdminComponent } from './vinculaciones-list-admin.component';

describe('VinculacionesListAdminComponent', () => {
  let component: VinculacionesListAdminComponent;
  let fixture: ComponentFixture<VinculacionesListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VinculacionesListAdminComponent]
    });
    fixture = TestBed.createComponent(VinculacionesListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
