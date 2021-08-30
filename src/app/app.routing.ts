import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
//import { ProfileComponent } from './examples/profile/profile.component';
//import { SignupComponent } from './examples/signup/signup.component';
//import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { HomeComponent } from './home/home.component';
import { EnContentComponent } from './en-content/en-content.component';
import { EnComponent } from './en/en.component'; 
import {WidgetJpComponent} from './widget-jp/widget-jp.component';
import {WidgetEnComponent} from './widget-en/widget-en.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomeComponent},
    { path: 'en',          component:EnComponent},
    { path: 'widget-jp',          component:WidgetJpComponent},
    { path: 'widget-en',          component:WidgetEnComponent},
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home',             component: ComponentsComponent },
    //{ path: 'user-profile',     component: ProfileComponent },
    //{ path: 'signup',           component: SignupComponent },
    //{ path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
