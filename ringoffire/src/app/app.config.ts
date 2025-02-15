import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), // Hier wird Hash-Routing aktiviert
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-a4979',
        appId: '1:280476104262:web:f1023ba7b3c48594853c47',
        storageBucket: 'ring-of-fire-a4979.firebasestorage.app',
        apiKey: 'AIzaSyBHUhSaav0i4nTnFiOBrxEy-z1SzFh1PhY',
        authDomain: 'ring-of-fire-a4979.firebaseapp.com',
        messagingSenderId: '280476104262',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
