import { Component, OnInit, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { ViewEncapsulation } from '@angular/core';




declare const OktaWidget: any;
declare const RemoveLoginWidget: any;


@Component({
  selector: 'app-widget-modal',
  templateUrl: './widget-modal.component.html',
  styleUrls: ['./widget-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetModalComponent implements OnInit {
  constructor(public _dialogRef: MatDialogRef<WidgetModalComponent>) { 
  }
  // Close the dialog
   closeModal() {
   this._dialogRef.close();
   //Remove the widget
   RemoveLoginWidget();

}    
  ngOnInit(){
    //RemoveLoginWidget(); 
    OktaWidget();
    
    
  }
}

  
  
  
