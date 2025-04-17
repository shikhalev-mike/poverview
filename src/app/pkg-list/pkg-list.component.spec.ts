import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkgListComponent } from './pkg-list.component';

describe('PkgListComponent', () => {
  let component: PkgListComponent;
  let fixture: ComponentFixture<PkgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkgListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PkgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
