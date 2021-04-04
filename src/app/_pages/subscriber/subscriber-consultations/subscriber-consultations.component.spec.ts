import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberConsultationsComponent } from './subscriber-consultations.component';

describe('SubscriberConsultationsComponent', () => {
  let component: SubscriberConsultationsComponent;
  let fixture: ComponentFixture<SubscriberConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberConsultationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
