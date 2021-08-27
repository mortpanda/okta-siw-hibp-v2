import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/shared/okta/okta-authentication";
import { OktaAuth } from "@okta/okta-auth-js";
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { DOCUMENT } from '@angular/common';
import CryptoJS from 'crypto-js';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-en-content',
  templateUrl: './en-content.component.html',
  styleUrls: ['./en-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnContentComponent implements OnInit {

  uriHibp = 'https://api.pwnedpasswords.com/range/';
  results: string[];
  loginform: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  
  

  constructor(private fb: FormBuilder, private authService: AuthService, private oktaSDKAuth: OktaSDKAuthService, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

}
