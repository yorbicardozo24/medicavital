import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

  @Input() data: string[] = [];
  @Input() name: string = '';

  messageMapping:
    {[k: string]: string} = {
      '=0': 'Datos no encontrados.',
      '=1': '1 registro encontrado.',
      'other': '# registros encontrados.'
    };

  constructor() { }

  ngOnInit(): void {
  }

}
