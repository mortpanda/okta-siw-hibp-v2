import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/shared/okta/okta-authentication";
import { OktaAuth } from "@okta/okta-auth-js";
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  loginform: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private oktaSDKAuth: OktaSDKAuthService) { }

  async ngOnInit() {

    this.loginform = this.fb.group({
      username: ["", Validators.email],
      password: ["", Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await console.log("You are Logged in");
      var authService = new OktaAuth(this.oktaSDKAuth.config);
      //console.log(this.oktaSDKAuth.config);
      authService.session.get()
        .then(function (session) {
          // logged in
          //console.log(session);

          authService.token.getWithoutPrompt({
            responseType: 'id_token', // or array of types
            sessionToken: 'testSessionToken' // optional if the user has an existing Okta session
          })
            .then(function (res) {
              var tokens = res.tokens;
              //console.log(tokens);
              // Do something with tokens, such as
              authService.tokenManager.setTokens(tokens);
              //console.log(tokens.accessToken.value);

              return authService.token.getUserInfo(tokens.accessToken, tokens.idToken)
                .then(function (user) {
                  console.log(user);
                  console.log('Howdy ' + user.given_name + " " + user.family_name);
                  document.getElementById('loggedinuser').innerHTML = "ようこそ " + user.given_name + " " + user.family_name + " さん";
                  this.Userfullname = user.given_name + " " + user.family_name;
                  console.log(this.Userfullname);
                })
            })
            .catch(function (err) {
              // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
            });
        })
        .catch(function (err) {
          // not logged in
        });

      //window.location.replace(this.oktaSDKAuth.strRedirectURL);
    }
  }

  async onSubmit() {
    console.log("event fired");
    console.log("loginInvalid", this.loginInvalid);
    console.log("formSubmitAttempt", this.formSubmitAttempt);
    console.log("returnUrl", this.oktaSDKAuth.strRedirectURL);

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    //if (this.loginform.valid) {
    //try {
    var username = this.loginform.get("username").value;
    var password = this.loginform.get("password").value;
    await this.authService.login(username, password);
    //} catch (err) {
    //alert(this.authService.strstateToken)      
    this.loginInvalid = true;
    //}
    //} else 
    {
      this.formSubmitAttempt = true;
      //console.log("username", username);
      //console.log("password", password);
    }
  }
  logout() {
    this.authService.OktaLogout();
  }
}
