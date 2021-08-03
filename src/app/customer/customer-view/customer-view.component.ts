import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/core/service/customer/customer.service';
import { Customer } from 'src/app/models/customer';
import { addCustomer, clickCustomer, removeCustomer } from '../store/action/customer.actions';
import { CustomerState } from '../store/reducer/customer.reducer';
import { selectCustomers } from '../store/selector/customer.selectors';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(private store: Store<CustomerState>, private customerService: CustomerService) {
    this.customers$ = this.store.pipe(select(selectCustomers));
  }

  ngOnInit(): void {
    this.customerService.listAll().subscribe((res) => {
      res.map((obj: any)=>{
        const customer = new Customer();
        customer.name = obj.name;
        customer._id = obj._id
        this.store.dispatch(addCustomer(customer));
      })
    })
  }

  removeCustomer(obj: Customer): void {
    this.customerService.delete(obj).subscribe((res) => {
      this.store.dispatch(removeCustomer(obj));
    })
  }

  clickCustomer(obj: Customer): void {
    this.store.dispatch(clickCustomer(obj));
  }

}
