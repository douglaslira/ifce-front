import { createAction, props } from '@ngrx/store';
import { Customer } from '../../../models/customer';

export const clickCustomer = createAction(
  '[Customer] Click Customers', (customer: Customer) => ({customer})
);

export const addCustomer = createAction(
  '[Customer] Add Customers', (customer: Customer) => ({customer})
);

export const removeCustomer = createAction(
  '[Customer] Remove Customers', (customer: Customer) => ({customer})
);

export const updateCustomer = createAction(
  '[Customer] Update Customers', (customer: Customer) => ({customer})
);

export const addAllCustomer = createAction(
  '[Customer] Add all Customers', (customer: Customer[]) => ({customer})
);




