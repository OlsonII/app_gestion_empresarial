import { Component, OnInit } from '@angular/core';
import {Product}from '../../../Models/product.model';
import {ProductService}from '../../../services/product.service';
import {ExportToExcelService} from '../../../services/exportToexcel.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.scss']
})
export class ConsultarProductoComponent implements OnInit {


  productos:Product[] =[];
  searchValue = '';

  constructor(private productService:ProductService,
    private exportService:ExportToExcelService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.get().subscribe(
      res=>{
        if(res!=null){
          this.productos = res.products;
        }else{
          console.log(res.message)
        }
      }
    )
  }

  exportToExcel(){
    this.exportService.exportProducts(this.productos,"productos");
  }


}
