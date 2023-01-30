import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AddTextComponent } from '../add-text/add-text.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface TextData {
  text: string;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  text:string=""
  @Input() label: any;
  constructor(public dialog: MatDialog) {}

  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTextComponent,  {
      height: '400px',
      width: '600px',
      data: {text: this.text},

    });

    dialogRef.afterClosed().subscribe((result : any) => {
      console.log('The dialog was closed', result);
      this.text = result;
    });
  }
}
