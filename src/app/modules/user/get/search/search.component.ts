import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Input() user: string = '';
  @Input() get: string = '';
  @Input() all: boolean = false;
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();

  termino: string = '';
  hide: boolean = false;

  search() {
    this.onEnter.emit( this.termino );
  }

  toggleCanceled() {
    this.onHide.emit( this.hide );
  }

}
