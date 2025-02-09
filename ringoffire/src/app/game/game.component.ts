import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
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
}
