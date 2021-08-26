import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authClient = new OktaAuth({
    issuer: "https://csm-apac.oktapreview.com/oauth2/default",
    clientId: "0oa18tefheexDDijM1d7",
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  constructor(private router: Router) {}

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string) {
    const transaction = await this.authClient.signIn({ username, password });
    
            var element = document.getElementById("loginpage");
            element.parentNode.removeChild(element);
            

            this.strstateToken = transaction.data.stateToken;
            
            //Uses the state token to perform MFA authentication using a newly created widget
            var oktaSignIn = new OktaSignIn({
              clientId: '0oa18tefheexDDijM1d7',
              baseUrl: 'https://csm-apac.oktapreview.com',
              language: 'ja',
              redirectUri: 'https://192.168.1.210:4200/',
              colors: {
                  brand: '#00297A',
                },
              stateToken: this.strstateToken,
              postLogoutRedirectUri:'https://192.168.1.210:4200/',
              authParams: {
                issuer: "https://csm-apac.oktapreview.com/oauth2/default",
                responseMode: 'fragment',
                responseType: ['token','id_token'],
                scopes: ['openid', 'email', 'profile'],
                pkce: false

                },
            });
            
              oktaSignIn.authClient.token.getUserInfo().then(function(user) {
              console.log("Hello, " + user.email + "! You are *still* logged in! :)");
              //document.getElementById("logout").style.display = 'block';
            }, function(error) {
              oktaSignIn.showSignInToGetTokens({
                el: '#okta-widget-container'
              }).then(function(tokens) {
                oktaSignIn.authClient.tokenManager.setTokens(tokens);
                oktaSignIn.remove();
      
                const idToken = tokens.idToken;
                const accessToken = tokens.accessToken;
                console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
                console.log(idToken);
                console.log(accessToken);


                return  oktaSignIn.authClient.token.getUserInfo(accessToken,idToken)
                .then(function(user) {
                  // user has details about the user
                  console.log(JSON.stringify(user));
                  window.location.replace("http://192.168.1.210:4200/");
                })
                .catch(function(err) {
                  // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
                });

              }).catch(function(err) {
                console.error(err);
              });
            });
  }

  OktaLogout(bar?: string){ 
    this.authClient.tokenManager.clear();
    this.authClient.signOut({postLogoutRedirectUri : 'https://192.168.1.210:4200/',idToken: this.idToken});
    location.reload();
}
            
}


