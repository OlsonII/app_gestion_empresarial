import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Brand} from '../../../models/brand.model';
import {Location} from '@angular/common';
import {Category} from '../../../models/category.model';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {Provider} from '../../../models/provider.model';
import {Product} from '../../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import {ProviderService} from '../../../services/provider.service';
import {JwtAuthService} from '../../../services/auth/jwt-auth.service';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsComponent } from '../../modals/modals.component';
import { ModalCategoryComponent } from '../../modal-category/modal-category.component';


@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent implements OnInit {

  brand: Brand;
  brands: Brand[] = [];
  category: Category ;
  categories: Category[]= [];
  providers: Provider[];
  product: Product;
  token;
  userId;
  staticAlertClosed=false;
  form: FormGroup;
  submitted = false;

  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private categoryService:CategoryService,
    private brandService:BrandService,
    private providerService:ProviderService,
    private productService:ProductService,
    private auth:JwtAuthService,
    private location:Location,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.brand = new Brand();
    this.product = new Product();
    this.category = new Category();
    this.product.brand = new Brand();
    this.product.category = new Category();
    this.getBrands();
    this.getCategories();
    this.getProviders();
    this.token = this.auth.getJwtToken();
    this.userId = this.auth.getUser();
    this.form = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      reference: ['', Validators.required],
      brandProduct: ['', Validators.required],
      categoryProduct: ['', Validators.required],
      cost: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [0],
      description: [''],
    });
  }

  get f() { return this.form.controls; }


  open() {
    const modalRef = this.modalService.open(ModalsComponent);
    this.brand = new Brand();
    modalRef.componentInstance.option= 'create';
    modalRef.componentInstance.brand= this.brand;
  }

  openModalCategory(){
    const modalRef = this.modalService.open(ModalCategoryComponent);
    this.brand = new Brand();
    modalRef.componentInstance.option= 'create';
    modalRef.componentInstance.category= this.category;
  }

  addProduct(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value
    this.product.name = formData.nameProduct;
    this.product.reference = formData.reference;
    this.product.description = formData.description;
    this.product.category.reference = formData.categoryProduct;
    this.product.brand.reference = formData.brandProduct;
    this.product.cost = formData.cost;
    this.product.price = formData.price;
    this.product.quantity = formData.quantity;
    this.productService.post(this.product).subscribe(p => {
      this.showNotification('Registro', p.message,'bottom', 'right');
      this.location.back();
    });
  }

  addBrand() {
    this.brand.token=this.token;
    this.brand.userIdentification = this.userId;
    this.brandService.post(this.brand).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro', p.message,'bottom', 'right')
      }
      this.getBrands();
    });
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

  addCategory() {
    this.categoryService.post(this.category).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro', p.message,'bottom', 'right')
      }
      this.showNotification('Agregado', 'categoria: '+ this.category.name +' creada con exito!','bottom', 'right')
      this.getCategories();
    });
  }

  getCategories(){
    this.categoryService.get().subscribe(
      res=>{
        if(res!=null){
          this.categories = res.categories;
        }
      }
    )
  }

  getProviders(){
    this.providerService.get().subscribe(
      res=>{
        if(res!=null){
          this.providers = res.providers;
        }
      }
    )
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
