import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Firestore, QuerySnapshot, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { onSnapshot, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  title = 'ringoffire';

  games:any = []
  data;

  constructor() {
  this.data = this.getData();
  }

  ngOnDestroy(){
    this.data();
  }

  getData() {
    return onSnapshot(collection(this.firestore, 'games'), (snapshot) => {
      const gamesArray : any = []
      snapshot.forEach((doc) => {
        gamesArray.push({id:doc.id, date: doc.data()})
        this.games = gamesArray
      });
    });
  }
}
