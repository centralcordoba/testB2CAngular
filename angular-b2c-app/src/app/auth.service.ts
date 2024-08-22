// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { PublicClientApplication, InteractionType, BrowserCacheLocation, IPublicClientApplication  } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private msalInstance: IPublicClientApplication ;

  constructor() {
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: '1bc419f8-89e3-425e-ada7-51b618868fda',
        authority: 'https://emanuelorg.onmicrosoft.com.b2clogin.com/emanuelorg.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN',
        redirectUri: 'http://localhost:4200',
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false,
      }
    });
    this.handleRedirectPromise();
  }

  private handleRedirectPromise(): void {
    this.msalInstance.handleRedirectPromise()
      .then(response => {
        // Handle response
        if (response) {
          console.log('Logged in successfully!', response);
        }
      })
      .catch(error => {
        console.error('Error handling redirect:', error);
      });
  }

  // Other methods...
}