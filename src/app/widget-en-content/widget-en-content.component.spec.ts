import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEnContentComponent } from './widget-en-content.component';

describe('WidgetEnContentComponent', () => {
  let component: WidgetEnContentComponent;
  let fixture: ComponentFixture<WidgetEnContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEnContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
