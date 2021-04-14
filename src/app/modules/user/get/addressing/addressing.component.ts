import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-addressing',
  templateUrl: './addressing.component.html'
})
export class AddressingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  addressing: [] = [];
  
  loading: boolean = true;
  searchAddressing: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
  }

  search( termino: any ) {
    this.searchAddressing = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    this.subscription.push(
      this.getService.getAddressing(data).subscribe((res) => {
        this.addressing = res.data;
        this.setState();
      }, () => this.setState() )
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchAddressing = false;
  }

}
