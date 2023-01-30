import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedChip = new Subject<any>();
  private text = new Subject<any>();

  selectedChip$ = this.selectedChip.asObservable();
  text$ = this.text.asObservable();

  setSelectedChip(value: any) {
    this.selectedChip.next(value);
  }
  setText(value: any) {
    this.text.next(value);
}}