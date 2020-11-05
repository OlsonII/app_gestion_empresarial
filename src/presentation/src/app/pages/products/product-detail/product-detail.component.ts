import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from "../../../services/product.service";
import {Brand} from "../../../models/brand.model";
import {Category} from "../../../models/category.model";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product:Product;
  constructor(private route: ActivatedRoute,
    private router:Router,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.product = new Product();
    this.product.brand = new Brand();
    this.product.category = new Category();
    this.getProduct();
  }

  getProduct(){
    this.product.reference = this.route.snapshot.paramMap.get('id').toString();
    this.productService.get().subscribe(res=>{

      res.products.forEach(prod => {
        if(prod.reference == this.product.reference){
          this.product = prod;
        }
      });
    });
  }

  registrarEntrada(){
    this.router.navigate(['productInOut',{id:this.product.reference}]);
  }
}
