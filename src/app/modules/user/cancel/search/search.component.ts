import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-anular-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() anularTitle: string = '';
  @Input() from: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  id: string = '';

  constructor() { }

  ngOnInit(): void { }

  anular() {
    this.onEnter.emit( this.id );
  }

}
