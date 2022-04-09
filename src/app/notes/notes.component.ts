import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './notes.Component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  baslik = '';
  aciklama = '';
  selected = '';
  notes: any[] = [];
  currentIndex = 0;
  status: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
    this.notes = JSON.parse(localStorage.getItem('notes')||'{}')
    console.log(this.notes)
  }

     insertData() {
    const note = {
      baslik: this.baslik,
      aciklama: this.aciklama
    }
    const noteItem = JSON.stringify(note)
    this.addData(noteItem)
    this.getData();
  }

  addData(item: string) {
    const local = localStorage.getItem("notes")
    if (local) {
      const noteArray = JSON.parse(local)
      noteArray.push(JSON.parse(item));
      localStorage.setItem('notes', JSON.stringify(noteArray))
    } else {
      localStorage.setItem('notes', '[' + item + ']')
    }
  }
  selectData(index: number){
    this.status = true;
    this.currentIndex = index;
    this.baslik = this.notes[index].baslik
    this.aciklama = this.notes[index].aciklama
    
  }
  updateData(index: number) {
     this.notes[index].baslik = this.baslik
     this.notes[index].text = this.aciklama;
    const noteItem = JSON.stringify(this.notes)
    localStorage.removeItem('notes')
    localStorage.setItem('notes', noteItem)
    this.status = false;
  }

  deleteData(index: number) {
    const alert =confirm('Silmek istediğinize emin misiniz ?')
    if(alert==true){
      this.notes.splice(index, 1)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
  getData() {
    const noteItems = localStorage.getItem('notes')
    if (noteItems) {
      this.notes = JSON.parse(noteItems)
    }
  }
}


