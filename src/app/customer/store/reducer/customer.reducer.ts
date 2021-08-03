import { Action, createReducer, on } from '@ngrx/store';
import * as CustomerActions from '../action/customer.actions';
import { Customer } from 'src/app/models/customer';


export const customerFeatureKey = 'customer';

export interface CustomerState {
  customers: Customer[];
  selectCustomer: Customer;
}

export const initialState: CustomerState = {
  customers: [],
  selectCustomer: {
    _id: '',
    name: ''
  }
};


export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.clickCustomer, (state: CustomerState, {customer}) => (
    { ...state, selectCustomer: customer }
  )),
  on(CustomerActions.addCustomer, (state: CustomerState, {customer}) => (
    { ...state, customers: [...state.customers, customer] }
  )),
  on(CustomerActions.removeCustomer, (state: CustomerState, {customer}) => {
    let newState = state.customers.filter(element => element._id !== customer._id);
    return ({...state, customers: newState});
  }),
  on(CustomerActions.updateCustomer, (state: CustomerState, {customer}) => {
    let updateState = state.customers.map(element => {
      if(element._id === customer._id) {
        element = customer
      }
      return element;
    });
    return ({...state, customers: updateState});
  })
);

export function reducer(state: CustomerState | undefined, action: Action): any {
  return customerReducer(state, action);
}
