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
        name: 'Get',
        icon: 'find_in_page',
        isCollapsed: true,
        route: 'get',
        children: [
          {
            name: 'Direccionamiento',
            url: 'get/addressing'
          },
          {
            name: 'Programación',
            url: 'get/programming'
          },
          {
            name: 'Entrega',
            url: 'get/delivery'
          },
          {
            name: 'Reporte Entrega',
            url: 'get/delivery-report'
          },
          {
            name: 'Facturación',
            url: 'get/billing'
          }
        ]
      },
      {
        name: 'Put',
        icon: 'swap_horiz',
        isCollapsed: true,
        route: 'put',
        children: [
          {
            name: 'Programación',
            url: 'put/programming'
          },
          {
            name: 'Entrega',
            url: 'put/delivery'
          },
          {
            name: 'Reporte Entrega',
            url: 'put/delivery-report'
          },
          {
            name: 'Facturación',
            url: 'put/billing'
          }
        ]
      },
      {
        name: 'Anular',
        icon: 'block',
        isCollapsed: true,
        route: 'cancel',
        children: [
          {
            name: 'Programación',
            url: 'cancel/programming'
          },
          {
            name: 'Entrega',
            url: 'cancel/delivery'
          },
          {
            name: 'Reporte Entrega',
            url: 'cancel/delivery-report'
          },
          {
            name: 'Facturación',
            url: 'cancel/billing'
          }
        ]
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
