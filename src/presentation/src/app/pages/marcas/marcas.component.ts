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
  alg: object;
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
    this.brandService.get().subscribe(data => {
        if (data != null) {
          this.brands = data.brands;
        }
      }
    );
  }

  open(content,brand:Brand) {
    this.brand = brand;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  modifyBrand() {
    console.log(this.brand);
    this.brandService.put(this.brand).subscribe(p => {
      if (p != null) {
        this.brand = p;
        console.log('Encontro'+p);
      }
      this.showNotification('Modificado', 'Marca: ' + this.brand.name + ' modificado con exito!', 'bottom', 'right')

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
