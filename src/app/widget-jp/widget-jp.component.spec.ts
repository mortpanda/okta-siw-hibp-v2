import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetJpComponent } from './widget-jp.component';

describe('WidgetJpComponent', () => {
  let component: WidgetJpComponent;
  let fixture: ComponentFixture<WidgetJpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetJpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetJpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
