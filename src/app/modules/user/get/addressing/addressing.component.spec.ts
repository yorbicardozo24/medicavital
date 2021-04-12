import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressingComponent } from './addressing.component';

describe('AddressingComponent', () => {
  let component: AddressingComponent;
  let fixture: ComponentFixture<AddressingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
