import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CancelService } from '../../services/cancel.service';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html'
})
export class ProgrammingComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  programming: [] = [];
  
  loading: boolean = true;
  cancelProgramming: boolean = false;

  constructor(
    private cancelService: CancelService
  ) { }

  ngOnInit(): void { }

  anular( id: any ) {
    if(typeof(id) === 'object') {
      id = id.id;
    }
    this.cancelProgramming = true;
    this.loading = true;
    const data = {
      token: JSON.parse(localStorage.getItem('user')!).createdToken,
      id
    };

    this.subscription.push(
      this.cancelService.cancelProgramming(data).subscribe((res) => {
        this.programming = res.data;
        this.setState();
      }, (err) => {
        this.programming = err.error.message;
        this.setState();
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  setState() {
    this.loading = false;
    this.cancelProgramming = false;
  }

}
