import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedSectionComponent } from './closed-section.component';

describe('ClosedSectionComponent', () => {
  let component: ClosedSectionComponent;
  let fixture: ComponentFixture<ClosedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
