import { Component, Input, OnInit } from '@angular/core';
import { ProductsServiceLocalStorageService } from 'src/app/Service/products-service-local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss']
})
export class CardCartComponent implements OnInit{
  constructor(public productServiceStorage:ProductsServiceLocalStorageService,private location: Location){}


@Input() products:any
length:any
total:number=0

updateQte(product: any) {
  this.productServiceStorage.updateQte(product);
  location.reload();
}
refresh(){
  location.reload();
}

deleteProduct(product:any){
  if(this.productServiceStorage.GetProduct()?.length>1){
    this.productServiceStorage.deleteProduct(product)
  }else{
    this.productServiceStorage.clearProductList();
  }
  this.location.replaceState('/cart');
  location.reload();
}
plusQte(product:any){
  product.quantity +=1;
}

moinsQte(product:any){
  if(product.quantity>0)
  product.quantity -=1;
}

ngOnInit(): void {
  this.length=this.products?.length;
  for (let index = 0; index < this.products?.length; index++) {
    this.total = Number(this.products[index].prix) * Number(this.products[index].quantity)
  }
}


}
