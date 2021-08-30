import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetJpContentComponent } from './widget-jp-content.component';

describe('WidgetJpContentComponent', () => {
  let component: WidgetJpContentComponent;
  let fixture: ComponentFixture<WidgetJpContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetJpContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetJpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
