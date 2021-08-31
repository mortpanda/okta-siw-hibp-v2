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


//declare const RemoveLoginWidget: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  uriHibp = 'https://api.pwnedpasswords.com/range/';
  results: string[];
  loginform: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;


  constructor(private fb: FormBuilder, private authService: AuthService, private oktaSDKAuth: OktaSDKAuthService, private http: HttpClient) { }


  async ngOnInit() {
    //RemoveLoginWidget();
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
    }
  }



  async onSubmit() {
    var username = this.loginform.get("username").value;
    var password = this.loginform.get("password").value;

    console.log("event fired");
    console.log("Hashing entered password....")

    var strPasswordHash = CryptoJS.SHA1(password).toString();

    console.log("Hashed password is " + strPasswordHash);
    document.getElementById("console").innerHTML += " ";
    document.getElementById("console").innerHTML += "<font color=white>" + '&nbsp' + '&nbsp' + "ハッシュ化されてパスワードは "
      + "<font color=red>" + strPasswordHash + "<font color=white>" + " です。" + "<br>";

    var strQueryString = strPasswordHash.substring(0, 5);
    var strCompareText = (strPasswordHash.substring(5, 999));
    console.log(strQueryString);
    document.getElementById("console").innerHTML += "<font color=white>" + '&nbsp' + '<br>' + '&nbsp' + '&nbsp' + "  HIBP検索文字列 "
      + "<font color=red>" + strQueryString + "<br>";
    document.getElementById("console").innerHTML += "<br> <br> <h1 style=" + "'padding: 15px'>" + "CHECKING HIBP.......";

    var strGetUrI = this.uriHibp + strQueryString
    this.http.get(strGetUrI, { responseType: 'text' })
      // レスポンスはテキストとしてsubscribeに渡される
      .subscribe(text => {
        console.log(text)
        var strResponse = text;
        var strMatchedPW
        var intBreached
        var strResponseLine = strResponse.split("\n");
        const myDiv = document.getElementById("console");
        for (var i = 0; i < strResponseLine.length; i++) {
          var arrLines = strResponseLine[i].split(":");
          var strHIBPhas = arrLines[0].toUpperCase();
          //console.log(strResponseLine[i]);
          document.getElementById("console").innerHTML += '&nbsp' + '&nbsp' + '&nbsp' + strResponseLine[i].toUpperCase() + "<br>";
          if (strCompareText.toUpperCase() == strHIBPhas) {

            strMatchedPW = arrLines[0];
            intBreached = arrLines[1];
            document.getElementById("console").innerHTML += "<font color=red>" + '&nbsp' + '&nbsp' + strResponseLine[i] + "<br>";
          }
          else {
          }
        }
        console.log(strMatchedPW);
        console.log(intBreached);
        document.getElementById("console").innerHTML += "<h2>" + '&nbsp' + '&nbsp' + "<font color=white>" + "入力されたパスワードはHIBPによると " + "<font color=red>" + intBreached + "<font color=white>" + " 回の漏洩履歴があります。" + "</h2>";

        myDiv.scrollTop = myDiv.scrollHeight;
        myDiv.scrollTop = myDiv.scrollHeight;
      });
    //console.log("loginInvalid", this.loginInvalid);
    //console.log("formSubmitAttempt", this.formSubmitAttempt);
    //console.log("returnUrl", this.oktaSDKAuth.strRedirectURL);
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    //if (this.loginform.valid) {
    //try {

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
