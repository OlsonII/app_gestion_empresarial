import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductInput,ProductOutput} from '../../../models/product-in-out.model';
import { ProductsInOutService} from '../../../services/products-in-out.service';
import { Product} from '../../../models/product.model';
import { Location} from '@angular/common';
import { ProductService} from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {Category} from "../../../models/category.model";
import {Brand} from "../../../models/brand.model";

@Component({
  selector: 'app-products-in-and-out',
  templateUrl: './products-in-and-out.component.html',
  styleUrls: ['./products-in-and-out.component.scss']
})
export class ProductsInAndOutComponent implements OnInit {


  product:Product= new Product();
  Entrada=true;
  Salida=false;
  razon:string;
  cantidad:number;
  productRefence:string;
  staticAlertClosed=false;
  constructor(private InOutService:ProductsInOutService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService:ProductService,
    private location:Location) { }

  ngOnInit(): void {


    this.product.category= new Category();
    this.product.brand=new Brand();
    this.getParam();

  }

  getParam(){
    if(this.route.snapshot.paramMap.get('id')){
    this.productRefence = this.route.snapshot.paramMap.get('id').toString();
    this.getProduct();
    }
  }
  switch(){
    if(this.Entrada){
      this.Entrada=false;
      this.Salida = true;
    }else{
      this.Entrada=true;
      this.Salida=false;
    }
  }

  getProduct(){
    this.productService.get().subscribe(res=>{

      res.products.forEach(prod => {
        if(prod.reference == this.productRefence){
          this.product = prod;
        }
      });
    });
    this.location.replaceState('/productsInOut/');
  }

  registrarMovimiento(){
    if(this.cantidad>0){
      if(this.Entrada){
        const prodIn:ProductInput = new ProductInput();
        prodIn.description = this.razon;
        prodIn.inputQuantity = this.cantidad;
        prodIn.productReference = this.product.reference;
        this.InOutService.postInput(prodIn).subscribe(r=>{
          this.showNotification('Registro Movimiento', r.message,'bottom', 'right')
          this.location.back();
        });
      }else if(this.Salida){
        if(this.product.quantity>=this.cantidad){
          const prodOut:ProductOutput = new ProductOutput;
          prodOut.description = this.razon;
          prodOut.outputQuantity = this.cantidad;
          prodOut.productReference = this.product.reference;
          this.InOutService.postOutput(prodOut).subscribe(r=>{
            this.showNotification('Registro Movimiento', r.message,'bottom', 'right')
            this.location.back();
          });
        }
      }
    }

  }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>'+mensaje, titulo, {
       disableTimeOut: true,
       closeButton: true,
       enableHtml: true,
       toastClass: 'alert alert-success alert-with-icon',
       positionClass: 'toast-' + from + '-' +  align
     });

  }
}
