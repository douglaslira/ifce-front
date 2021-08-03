import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';
import { addCustomer, updateCustomer } from '../store/action/customer.actions';
import { CustomerState } from '../store/reducer/customer.reducer';
import { CustomerService } from '../../core/service/customer/customer.service';
import { Observable } from 'rxjs';
import { clickCustomer } from '../store/selector/customer.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  userForm: any;
  labelButton: string = 'Add';
  isUpdate: boolean = false;
  updateCts: Customer = {
    _id: '',
    name: ''
  }
  customerObj$: Observable<Customer>;

  constructor(
    private store: Store<CustomerState>,
    public formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.customerObj$ = this.store.pipe(select(clickCustomer));
    this.customerObj$.subscribe((s)=>{
      this.userForm.controls['name'].setValue(s.name);
      if(s.name !== '') {
        this.labelButton = 'Update';
        this.isUpdate = true;
        this.updateCts.name = s.name;
        this.updateCts._id = s._id;
      }
    })
  }

  ngOnInit(): void {
  }

  get getControl(){
    return this.userForm.controls;
  }

  addCustomer(): void {

    const customer = new Customer();
    customer.name = this.userForm.controls['name'].value;

    if(this.isUpdate) {
      this.updateCts.name = this.userForm.controls['name'].value;
      this.customerService.update(this.updateCts).subscribe((res) => {
        this.store.dispatch(updateCustomer(this.updateCts));
        this.userForm.reset();
        this.labelButton = 'Add';
        this.isUpdate = false;
        this.updateCts = {
          _id: '',
          name: ''
        }
      })
    } else {
      this.customerService.create(customer).subscribe((res) => {
        customer._id = res._id;
        this.store.dispatch(addCustomer(customer));
        this.userForm.reset();
        this.labelButton = 'Add';
        this.isUpdate = false;
      })
    }

  }

}
