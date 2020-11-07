import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  searchValue:string;
  categories: Category[];
  closeResult = '';
  category:Category;
  reference: string;
  name: string;

  constructor(
    private categoryService:CategoryService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.category = new Category();
    this.categoryService.get().subscribe(
        res=>{
          if (res != null){
            this.categories=res.categories
          }
        }
      )
  }

  open(content,categ:Category){
    this.category=categ
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

  modifyCategory() {
    this.categoryService.put(this.category).subscribe(p => {
      if (p != null) {
        this.showNotification('Aviso', p.message , 'bottom', 'right')
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
