import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from "app/shared/okta/okta-authentication";
import { OktaAuth } from "@okta/okta-auth-js";
import { Subscription } from 'rxjs';

import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    

    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    public Userfullname;
    
    constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any,
        private element: ElementRef, public location: Location, private authService: AuthService, private oktaSDKAuth: OktaSDKAuthService) { }
   

    ngOnInit() {
        var authService = new OktaAuth(this.oktaSDKAuth.config);
        //console.log(this.oktaSDKAuth.config);
        //console.log(this.oktaSDKAuth.strPostLogoutURL);

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
                                document.getElementById('logged_in_user').innerHTML = "ようこそ" + user.given_name + " " + user.family_name + "さん";
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
            
        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }
    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
            return false;
        }
        else {
            return true;
        }
    }


}

