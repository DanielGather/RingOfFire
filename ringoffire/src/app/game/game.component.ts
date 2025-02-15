import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, collection, addDoc, docData,doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(private route: ActivatedRoute){}

  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  pickCardAnimation = false;
  currentCard: string = '';
  clicked:boolean = false

  //Das "!" sagt TypeScript, dass wir es später initialisieren.
  game!: Game;

  async ngOnInit() {
    this.newGame();

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID aus der URL:', id);
      if (id) {
        const gameDocRef = doc(this.firestore, 'games', id);
        docData(gameDocRef).subscribe(game => {
          console.log('Dokument aus Firestore:', game);
          this.game = game as Game;
          if(game){
            this.game.currentPlayer = game['currentPlayer'];
            this.game.playedCards = game['playedCards'];
            this.game.players = game['players'];
            this.game.stack = game['stack'];
          }
        });
      }
    });


    // await addDoc(collection(this.firestore, "games"),this.game.toJson()).catch((e) =>{
    //   console.log(e);
    // }).then((docRef)=>{
    //   console.log("Dokument erfolgreich unter der id:",docRef?.id, "hinzugefügt");
    // })
    // console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }



  takeCard() {
    if(this.game.players.length > 0){
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop() as string;
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
        setTimeout(() => {
          this.pickCardAnimation = false;
          this.game.playedCards.push(this.currentCard);
        }, 1000);
      }
    } else {
      this.clicked = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)
    dialogRef.afterClosed().subscribe(name => {
      if(name){
        this.game.players.push(name)
        this.clicked = false;
      }
    });
  }
}
