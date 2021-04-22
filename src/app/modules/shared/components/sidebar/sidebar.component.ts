import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: any;

  constructor(
    public authSvc: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        name: 'Todos los Gets',
        icon: 'description',
        isCollapsed: true,
        url: 'all',
        route: 'all',
        children: []
      },
      {
        name: 'Direccionamiento',
        icon: 'find_in_page',
        isCollapsed: true,
        url: 'get/addressing',
        route: 'get',
        children: []
      },
      {
        name: 'Put',
        icon: 'swap_horiz',
        isCollapsed: true,
        url: 'put',
        route: 'put',
        children: [ ]
      }
    ];
    
    this.subMenuOpen();
  }

  subMenuOpen() {
    this.items.forEach((x: any) => {
      if(this.router.url.toString().indexOf(x.route) > -1) {
        x.isCollapsed = false;
      }
    });
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

  toggleMenuItem(item: any) {
    this.items.forEach((x: any) => {
      if (x.name == item.name) {
        x.isCollapsed = !x.isCollapsed;
      } else {
        x.isCollapsed = true;
      }
    });
  }

}
