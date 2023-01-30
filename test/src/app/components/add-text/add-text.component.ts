import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/SharedService';
import { TextData } from '../layout/layout.component';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent {
  textForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTextComponent>,
    private sharedService: SharedService, 
    private formBuilder: FormBuilder
 
  ) {}

  ngOnInit(): void {
    this.textForm = this.formBuilder.group({
      value: new FormControl('', [
        Validators.required,
      ])
    });
  
  }
  showModal = false;
 
  onSubmit(){
    console.log("textttttt",this.textForm.value.value )
    this.sharedService.setText(this.textForm.value.value);
    this.close()
  }

  close(): void {
    this.dialogRef.close();
  }
}
