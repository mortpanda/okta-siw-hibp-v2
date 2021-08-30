import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

declare const OktaWidget: any;

@Component({
  selector: 'app-widget-jp-content',
  templateUrl: './widget-jp-content.component.html',
  styleUrls: ['./widget-jp-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetJpContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    OktaWidget();
  }

}
