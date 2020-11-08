import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Brand} from '../../models/brand.model';
import {BrandService}from '../../services/brand.service';
import { ModalsComponent } from '../modals/modals.component';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  searchValue:string;
  closeResult = '';
  brands: Brand[] = [];
  brand: Brand;
  reference:string;
  name:string;


  constructor(
    private brandService: BrandService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.brand = new Brand();
    this.getBrands();
  }

  getBrands(){
    this.brandService.get().subscribe(
      res=>{
        if(res!=null){
          this.brands = res.brands;
        }
      }
    )
  }

  open(brand: Brand,opcion :string) {
    if( opcion === 'create'){
      this.brand = new Brand();
    }
    if (opcion === 'modify'){
      this.brand = brand;
    }
    const modalRef = this.modalService.open(ModalsComponent);
    modalRef.componentInstance.brand = this.brand;
    modalRef.componentInstance.option= opcion;

    this.getBrands();
  }

}
