import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ViewEncapsulation } from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y'; 


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  loginform: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
