import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Brand} from '../../models/brand.model';
import {BrandList} from '../../models/ObjetoLista';
import {BrandService}from '../../services/brand.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  searchValue:string;
  brandList: BrandList;
  closeResult = '';
  brands: Brand[] = [];
  brand: Brand;
  reference:string;
  name:string;

  constructor(
    private brandService: BrandService,
    private modalService: NgbModal,
    private toastr: ToastrService
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
    );
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
  }

  modifyBrand() {
    this.brandService.put(this.brand).subscribe(p => {
      if (p != null) {
        this.showNotification('Modificado', p.message, 'bottom', 'right')

      }

    });
  }

  showNotification(titulo, mensaje, from, align) {
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>' + mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' + align
    });
  }
}
