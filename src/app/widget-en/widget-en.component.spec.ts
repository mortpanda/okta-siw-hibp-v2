import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEnComponent } from './widget-en.component';

describe('WidgetEnComponent', () => {
  let component: WidgetEnComponent;
  let fixture: ComponentFixture<WidgetEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
