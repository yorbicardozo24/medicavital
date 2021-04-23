import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Input() user: string = '';
  @Input() get: string = '';
  @Input() options: any[] = [];
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  @Output() onPrint: EventEmitter<any> = new EventEmitter();
  @Output() onDelivery: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  termino: string = '';
  terminoFac: string = '';
  code: any = '';
  id: string = '';
  idFact: string = '';
  hide: boolean = false;

  search() {
    this.onEnter.emit( this.termino );
  }

  print() {
    this.onPrint.emit( {id: this.id, idFact: this.idFact} );
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
