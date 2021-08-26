import { Component, OnInit } from '@angular/core';
import {OktaSDKAuthService} from 'app/shared/okta/okta-auth-service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(private OktaAuthClient : OktaSDKAuthService) { }

    ngOnInit() {}

    OktaLogout(){
        this.OktaAuthClient.OktaSDKAuthClient.signOut();
        }

}
