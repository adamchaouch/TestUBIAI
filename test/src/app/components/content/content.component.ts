import { Directive, HostListener, ElementRef, Renderer2 ,Component, Input} from '@angular/core';
import { SharedService } from 'src/app/services/SharedService';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Input() selectedChip: any;
  @Input() text: any;

  test : Boolean=false
  annotations: Array<Object> = []
constructor(private el: ElementRef, private renderer: Renderer2,private sharedService: SharedService,private _snackBar: MatSnackBar,private http: HttpClient) { 
  this.sharedService.selectedChip$.subscribe((value) => {
    this.selectedChip = value;
  });
  this.sharedService.text$.subscribe((value) => {
    this.text = value;
  });
  console.log('datatt', this.text)

}
  
sendData(){
  if(this.annotations.length==0){
    this._snackBar.open("NO Annotation to send");
  }else{
    let uniqueArr = this.annotations.filter((obj:any, index, self) => 
    index === self.findIndex((t:any) => (
      t.start === obj.start && t.end === obj.end
      )))
      
      console.log()
      const url = 'http://127.0.0.1:8000/downloadfile';
      const payload ={text: JSON.stringify({'document':this.text,'annotation':uniqueArr}) };
      this.http.post(url, payload, { responseType: 'blob' }).subscribe(
        response => {
          const blob = new Blob([response], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'file.txt';
          link.click();
        },
        error => {
          console.error(error);
        }
      );
  };
}


@HostListener('mouseup') onMouseUp() {
  console.log(window.getSelection())
  
  if(this.selectedChip.name!=undefined){
    const selection = window.getSelection();
  let endPos
  if (selection && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const newNode = this.renderer.createElement('span');
    //this.renderer.addClass(newNode, 'highlight');
    this.renderer.setStyle(newNode, 'background-color', this.selectedChip.chipColor);

    this.renderer.appendChild(newNode, range.extractContents());
    range.insertNode(newNode);
    const selectedText = range.toString();
    const startPos = this.text.indexOf(selectedText);
    const endPos = startPos + selectedText.length ;
    
    this.annotations.push({
      start : startPos,
      end : endPos, 
      label : this.selectedChip.name, 
      text : selectedText
    })
    console.log("Start position: ", startPos);
    console.log("End position: ", endPos);
    console.log("annoo", this.annotations)

    //console.log(range.extractContents())
  }
  }
}




}