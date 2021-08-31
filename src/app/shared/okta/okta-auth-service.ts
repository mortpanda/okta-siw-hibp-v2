import { Injectable } from '@angular/core';
import { OktaAuth } from "@okta/okta-auth-js";

@Injectable({
  providedIn: 'root'
})
export class OktaSDKAuthService {
  constructor(){ }
  strRedirectURL = 'https://192.168.1.210:4200/';
  strClientID = '0oa18tefheexDDijM1d7';
  strIssuer = 'https://csm-apac.oktapreview.com/oauth2/default';
  strPostLogoutURL = 'https://192.168.1.210:4200/';
  strScope = ['openid', 'email', 'profile'];
  strResponseType = ['token','id_token'];
  strResponseMode = 'fragment';
  strPkce = false;
  
   
    config = {
        clientId: this.strClientID,
        issuer: this.strIssuer,
        redirectUri: this.strRedirectURL,
        postLogoutRedirectUri:this.strRedirectURL,
        responseMode: this.strResponseMode,
        responseType: this.strResponseType,
        scopes: this.strScope,
    };

    OktaSDKAuthClient = new OktaAuth(this.config);    
}
