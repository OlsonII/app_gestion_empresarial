import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductInput,ProductOutput} from '../../../models/product-in-out.model';
import { ProductsInOutService} from '../../../services/products-in-out.service';
import { Product} from '../../../models/product.model';
import { Location} from '@angular/common';
import { ProductService} from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {Category} from '../../../models/category.model';
import {Brand} from '../../../models/brand.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-in-and-out',
  templateUrl: './products-in-and-out.component.html',
  styleUrls: ['./products-in-and-out.component.scss']
})
export class ProductsInAndOutComponent implements OnInit {


  product:Product= new Product();
  in=true;
  out=false;
  staticAlertClosed=false;
  form: FormGroup;
  submitted = false;

  constructor(private InOutService:ProductsInOutService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService:ProductService,
    private location:Location, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productReference: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.product.category= new Category();
    this.product.brand=new Brand();
    this.getParam();

  }

  get f() { return this.form.controls; }


  getParam(){
    if(this.route.snapshot.paramMap.get('id')){
      this.form.controls.productReference.setValue(this.route.snapshot.paramMap.get('id').toString());
      this.getProduct();
    }
  }
  switch(){
    if(this.in){
      this.in = false;
      this.out = true;
    }else{
      this.in = true;
      this.out = false;
    }
  }

  getProduct(){
    this.productService.get().subscribe(res=>{

      res.products.forEach(prod => {
        if(prod.reference === this.form.value.productReference){
          this.product = prod;
        }
      });
    });
    this.location.replaceState('/productsInOut/');
  }

  registrarMovimiento(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value
    if(formData.quantity>0){
      if(this.in){
        const prodIn:ProductInput = new ProductInput();
        prodIn.description = formData.description;
        prodIn.inputQuantity = formData.quantity;
        prodIn.productReference = formData.productReference;
        console.log(prodIn);
        this.InOutService.postInput(prodIn).subscribe(r=>{
          this.showNotification('Registro Movimiento', r.message,'bottom', 'right')
          this.location.back();
        });
      }else if(this.out){
        if(this.product.quantity>=formData.quantity){
          const prodOut:ProductOutput = new ProductOutput();
          prodOut.description = formData.description;
          prodOut.outputQuantity = formData.quantity
          prodOut.productReference = formData.productReference;
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
