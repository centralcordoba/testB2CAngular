import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { IPublicClientApplication } from '@azure/msal-browser';

// ... resto de tu código

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-b2c-app';
  isLoggedIn = false;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  async ngOnInit() {
    // Espera a que la instancia MSAL esté inicializada
    await this.msalService.instance.init();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
      });
  }

  async login() {
    const request: RedirectRequest = {
      scopes: ['openid', 'profile', 'User.Read']
    };
    this.msalService.loginRedirect(request);
  }

  logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
}