import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html'
})
export class ProgrammingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  user: string = '';
  programming: [] = [];
  
  loading: boolean = true;
  searchProgramming: boolean = false;

  constructor(
    private getService: GetService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!).userName;
    const programming = JSON.parse(localStorage.getItem('programming')!);
    if (programming != null) {
      this.loading = false;
      this.programming = programming;
    }
  }

  search( termino: any ) {
    this.searchProgramming = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id: termino
    };

    this.subscription.push(
      this.getService.getProgramming(data).subscribe((res) => {
        this.programming = res.data;
        this.setState();
        localStorage.setItem('programming', JSON.stringify(this.programming));
      }, () => this.setState() )
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.searchProgramming = false;
  }

}
