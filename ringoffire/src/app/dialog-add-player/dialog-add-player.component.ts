import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule,MatButtonModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = "";
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }

}
