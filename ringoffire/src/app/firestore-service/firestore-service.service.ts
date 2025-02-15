import { ActivatedRoute } from '@angular/router';
import { Injectable, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreServiceService {
  firestore: Firestore = inject(Firestore);
  data;
  games: any = [];
  id :string = "";
  constructor(private route: ActivatedRoute) {
    this.data = this.getData();
  }

  ngOnDestroy() {
    this.data();
  }

  getUrlId(){
    const id = this.route.snapshot.params['id'];
    console.log(id);
    return id;
  }

  getData() {
    return onSnapshot(collection(this.firestore, 'games'), (snapshot) => {
      const gamesArray: any = [];
      snapshot.forEach((doc) => {
        gamesArray.push({ id: doc.id, date: doc.data() });
        this.games = gamesArray;
      });
    });
  }
}
