import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import { Brand } from '../../models/brand.model';
import { ModalsComponent } from '../modals/modals.component';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';

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
    this.getCategories();
  }

  getCategories(){
    this.categoryService.get().subscribe(
      res=>{
        if (res != null){
          this.categories=res.categories
        }
      }
    )
  }

  open(category: Category,opcion :string) {
    if( opcion === 'create'){
      this.category = new Brand();
    }
    if (opcion === 'modify'){
      this.category = category;
    }
    const modalRef = this.modalService.open(ModalCategoryComponent);
    modalRef.componentInstance.category = this.category;
    modalRef.componentInstance.option= opcion;

  }


}
