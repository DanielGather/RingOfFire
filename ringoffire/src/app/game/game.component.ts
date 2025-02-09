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
  currentCard: string | undefined = '';

  //Das "!" sagt TypeScript, dass wir es später initialisieren.
  game!: Game;

  ngOnInit() {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
    console.log("Test");
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);
      console.log('New Card:' + this.currentCard);
      console.log('Game is ', this.game);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
