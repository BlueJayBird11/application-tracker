import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingSectionComponent } from './ongoing-section.component';

describe('OngoingSectionComponent', () => {
  let component: OngoingSectionComponent;
  let fixture: ComponentFixture<OngoingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
