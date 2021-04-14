import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Input() user: string = '';
  @Input() get: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  termino: string = '';

  search() {
    this.onEnter.emit( this.termino );
  }

}
