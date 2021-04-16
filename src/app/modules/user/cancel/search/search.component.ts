import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-anular-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() anularTitle: string = '';
  @Input() from: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  user: string = '';
  id: string = '';

  suggestions!: any[];
  options: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    this.suggestions = JSON.parse(localStorage.getItem(this.from)!);
    if (this.suggestions != null) {
      if (this.from == 'addressing') {
        this.options = this.suggestions.map((item) => item.IDProgramacion );
      } else if (this.from == 'delivery') {
        this.options = this.suggestions.map((item) => item.IDEntrega );
      } else if (this.from == 'deliveryReport') {
        this.options = this.suggestions.map((item) => item.IDReporteEntrega );
      } else if (this.from == 'billing') {
        this.options = this.suggestions.map((item) => item.IDFacturacion );
      }
    }
  }

  anular() {
    this.onEnter.emit( this.id );
  }

}
