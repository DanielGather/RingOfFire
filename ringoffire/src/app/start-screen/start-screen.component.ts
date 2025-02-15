import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore,doc,addDoc,collection} from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);


  constructor(private router: Router) {}
  
  async newGame() {
    let game = new Game();
    //START GAME
    console.log(game);
    
    await addDoc(collection(this.firestore, 'games'), game.toJson())
      .catch((e) => {
        console.log(e);
      })
      .then((docRef) => {
        console.log('Dokument erfolgreich unter der id:',docRef?.id,'hinzugefügt');
        this.router.navigate(['/game/'+ docRef?.id])
      });
  }
}
