import { Component, OnInit } from '@angular/core';
import {Product}from '../../models/product.model';
import {ProductService}from '../../services/product.service';
import {Sale} from '../../models/sale.model';
import {SalesService} from '../../services/sales.service';
import {JwtAuthService} from '../../services/auth/jwt-auth.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent implements OnInit {

  productos:Product[] =[];
  totalSale = 0;
  productosFactura:Product[]=[];
  searchValue = '';
  public isCollapsed = true;

  cliente:Client;

  constructor(private productService:ProductService,
    private salesService:SalesService,
    private jwtAuth:JwtAuthService
    ) { }

  ngOnInit(): void {
    window.addEventListener('resize', this.updateColor);
    this.getProducts();
  }

  getProducts(){
    this.productService.get().subscribe(
      res=>{
        if(res!=null){
          this.productos = res.products;
        }
      }
    )
  }



  getTotalSale(){
    let subTotal = 0;
    this.productosFactura.forEach(prod => {
      subTotal+= prod.price;
    });
    this.totalSale = subTotal;
  }

  addProduct(prod:Product){

    let entro=false;
    const newProd = {...prod};
    newProd.quantity = 1;

    if(prod.quantity>0){
      this.productosFactura.forEach(prodFact => {
        if(prodFact.reference == prod.reference){
          entro=true;

          newProd.quantity = prodFact.quantity + 1;

          prod.quantity --;
        }
      });

      if(entro){
        const index = this.productosFactura.findIndex((produtc)=>produtc.reference==prod.reference);
        if (index > -1) {
          this.productosFactura[index].quantity = newProd.quantity;
          this.productosFactura[index].price = newProd.quantity * newProd.price;
        }else{
          console.log('not found');
        }
      }else{
          this.productosFactura.push(newProd);
          prod.quantity --;
      }
    }
    this.getTotalSale();
  }

  registrarVenta(){
    const venta = new Sale();
    venta.products = this.productosFactura;
    venta.clientIdentification = '333'
    venta.value = this.totalSale;
    console.log(venta);
    this.salesService.post(venta).subscribe(res=>{
      console.log(res);
    }
    );
  }

 // NAVBAR  ---
  updateColor = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
      if (window.innerWidth < 993 && !this.isCollapsed) {
        navbar.classList.add('bg-white');
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.remove('bg-white');
        navbar.classList.add('navbar-transparent');
      }
    };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  ngOnDestroy(){
    window.removeEventListener('resize', this.updateColor);
 }
}
