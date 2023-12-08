import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVinculacionComponent } from './add-vinculacion.component';

describe('AddVinculacionComponent', () => {
  let component: AddVinculacionComponent;
  let fixture: ComponentFixture<AddVinculacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddVinculacionComponent]
    });
    fixture = TestBed.createComponent(AddVinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
