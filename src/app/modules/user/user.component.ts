import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  styles: [':host{display: block; height: 100vh;}']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
