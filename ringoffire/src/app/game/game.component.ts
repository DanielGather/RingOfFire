import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  collection,
  addDoc,
  docData,
  doc,
  updateDoc,
  UpdateData,
} from '@angular/fire/firestore';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    GameInfoComponent,
    PlayerMobileComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(private route: ActivatedRoute) {}

  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  clicked: boolean = false;
  gameSubscription: any;
  routeSubscription: any;
  //Das "!" sagt TypeScript, dass wir es später initialisieren.
  game!: Game;
  gameId: string = '';

  async ngOnInit() {
    this.newGame();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.gameId = id;
      console.log('ID aus der URL:', id);      if (id) {
        const gameDocRef = doc(this.firestore, 'games', id);
        this.gameSubscription = docData(gameDocRef).subscribe((gameData) => {
          this.game = new Game();
          if (gameData) {
            this.game.currentPlayer = gameData['currentPlayer'];
            this.game.playedCards = gameData['playedCards'];
            this.game.players = gameData['players'];
            this.game.stack = gameData['stack'];
            this.game.pickCardAnimation = gameData['pickCardAnimation'];
            this.game.currentCard = gameData['currentCard'];
          }
        });
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  ngOnDestroy() {
    // Unsubscribe, um Speicherlecks zu vermeiden
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }

  takeCard() {
    if (this.game.players.length > 0) {
      if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop() as string;
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        setTimeout(() => {
          this.game.pickCardAnimation = false;
          this.game.playedCards.push(this.game.currentCard);
        this.saveGame();
        }, 1000);
      }
    } else {
      this.clicked = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.game.players.push(name);
        this.clicked = false;
        this.saveGame();
      }
    });
  }

  saveGame() {
    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameDocRef, this.game.toJson())
      .then(() => console.log('Dokument erfolgreich aktualisiert'))
      .catch((error) =>
        console.error('Fehler beim Aktualisieren des Dokuments:', error)
      );
  }
}
