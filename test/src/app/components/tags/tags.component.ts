import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { SharedService } from 'src/app/services/SharedService';

export interface Label {
  name: string;
  chipColor:string
}
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})


export class TagsComponent {
  constructor(private sharedService: SharedService) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  labels: Label[] = [];
  selectedChip: any;

  SelectedChip(object:Label){
    this.sharedService.setSelectedChip(object);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.labels.push({name: value,chipColor:this.getRandomColor()});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(label: Label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  edit(label: Label, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(label);
      return;
    }

    // Edit existing fruit
    const index = this.labels.indexOf(label);
    if (index >= 0) {
      this.labels[index].name = value;
    }
  }
}
