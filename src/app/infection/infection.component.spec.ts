import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionComponent } from './infection.component';

describe('InfectionComponent', () => {
  let component: InfectionComponent;
  let fixture: ComponentFixture<InfectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
