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

    

  // OktaLogout(bar?: string){ 
  //     this.OktaSDKAuthClient.tokenManager.clear();
  //     this.OktaSDKAuthClient.signOut({post_logout_redirect_uri:'https://192.168.1.210:4200/home'});
  //     location.reload();
  // }



}
 // var config = {
        //     // Required config
        //     issuer: 'https://kent-nagao-test.oktapreview.com/oauth2/aus14xmr8soQUuZda1d7',
          
        //     // Required for login flow using getWithRedirect()
        //     clientId: '0oa14uubjk8PiOnrR1d7',
        //     redirectUri: 'https://192.168.1.210:4200/home',
        //     scopes: ['openid', 'email', 'profile'],
          
        //     // Parse authorization code from hash fragment instead of search query
        //     responseMode: 'fragment',  
        //   };
          