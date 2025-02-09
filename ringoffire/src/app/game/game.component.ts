import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  readonly dialog = inject(MatDialog);
  pickCardAnimation = false;
  currentCard: string = '';

  //Das "!" sagt TypeScript, dass wir es später initialisieren.
  game: Game | any;

  ngOnInit() {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
    console.log('Test');
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        setTimeout(() => {
          this.pickCardAnimation = false;
          this.game.playedCards.push(this.currentCard);
        }, 1000);
      }
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
