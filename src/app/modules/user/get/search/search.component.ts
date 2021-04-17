import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Input() user: string = '';
  @Input() get: string = '';
  @Input() all: boolean = false;
  @Input() options: any[] = [];
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  @Output() onPrint: EventEmitter<string> = new EventEmitter();
  @Output() onDelivery: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  termino: string = '';
  code: any = '';
  id: string = '';
  hide: boolean = false;

  search() {
    this.onEnter.emit( this.termino );
  }

  print() {
    this.onPrint.emit(this.id);
  }

  clear() {
    this.onClear.emit();
  }

  toggleCanceled() {
    this.onHide.emit( this.hide );
  }

  nDelivery() {
    this.onDelivery.emit( this.code );
  }

}
