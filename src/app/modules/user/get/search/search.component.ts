import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() user: string = '';
  @Input() get: string = '';
  @Input() options: any[] = [];
  @Input() all: boolean = false;
  @Input() filter: any;
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  @Output() onPrint: EventEmitter<any> = new EventEmitter();
  @Output() onDelivery: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  termino: string = '';
  terminoFac: string = '';
  code: any = '';
  ConTec: any = '';
  TipoTec: any = '';
  id: string = '';
  idFact: string = '';
  hide: boolean = false;

  search() {
    this.onEnter.emit( this.termino );
  }

  ngOnInit() {
    if (this.filter != undefined) {
      this.code = this.filter.nEntrega;
      this.TipoTec = this.filter.tipo;
      this.ConTec = this.filter.conTec;
    }
  }

  print() {
    this.onPrint.emit( {id: this.id, idFact: this.idFact} );
  }

  clear() {
    this.TipoTec = '';
    this.ConTec = '';
    this.code = '';
    this.onClear.emit();
  }

  toggleCanceled() {
    this.onHide.emit( this.hide );
  }

  nDelivery() {
    this.onDelivery.emit(
      {
        tipo: this.TipoTec,
        conTec: this.ConTec,
        nEntrega: this.code
      }
    );
  }

}
