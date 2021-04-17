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
  @Output() onPrint: EventEmitter<string> = new EventEmitter();

  termino: string = '';
  id: string = '';
  hide: boolean = false;

  search() {
    this.onEnter.emit( this.termino );
  }

  print() {
    this.onPrint.emit(this.id);
  }

  toggleCanceled() {
    this.onHide.emit( this.hide );
  }

}
