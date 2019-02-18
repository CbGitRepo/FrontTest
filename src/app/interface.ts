import { ModuleWithProviders } from '@angular/core';

export interface IClient {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  gender: string;
  commandeCount: number;
  commandes?: ICammande[];
  
}
export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
//Parameters needs to be camel case 
export interface ICammande {
  id?: number;
  quantity: number;
  price: number;
  products: IProduct[];
    
}

export interface IProduct {
  id?: number;
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productWeight: number;
}



