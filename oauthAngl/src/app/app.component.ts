import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oauthAngl';

  constructor(private oauthService: OAuthService){
  }
  private async ConfigureAuth() : Promise<void>{
    this.oauthService.loginUrl= 'https://login.microsoftonline.com/955969cd-d2f8-476e-b654-700cff40c2a9/oauth2/v2.0/authorize';
    this.oauthService.clientId= '8e3a42f5-e618-4fee-babe-7bde449e68a0';
    this.oauthService.resource= '';
    this.oauthService.logoutUrl= '';
    this.oauthService.redirectUri= window.location.origin + '/';
    this.oauthService.scope= 'openid';
    this.oauthService.oidc= true;
    this.oauthService.setStorage(sessionStorage);

}
async ngOnInit(){
  await this.ConfigureAuth();
  this.oauthService.tryLogin({});

  if(!this.oauthService.getAccessToken()){
    await  this.oauthService.initImplicitFlow();
  }

  console.log(this.oauthService.getAccessToken);
}
}
