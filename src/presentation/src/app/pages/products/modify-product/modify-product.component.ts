import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Brand} from '../../../models/brand.model';
import {Category} from '../../../models/category.model';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {Provider} from '../../../models/provider.model';
import {Product} from '../../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import {ProviderService} from '../../../services/provider.service';
import {ProductService} from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  brand: Brand;
  brands: Brand[] = [];
  category: Category ;
  categories: Category[]= [];
  providers: Provider[];
  product: Product;
  form: FormGroup;
  submitted = false;
  staticAlertClosed=false;

  closeResult = '';
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private location: Location,
    private categoryService:CategoryService,
    private brandService:BrandService,
    private providerService:ProviderService,
    private productService:ProductService,
    private formBuilder: FormBuilder
  ) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        nameProduct: ['', Validators.required],
        reference: ['', Validators.required],
        brandProduct: ['', Validators.required],
        categoryProduct: ['', Validators.required],
        cost: ['', [Validators.required,Validators.min(0)]],
        price: ['', [Validators.required,Validators.min(0)]],
        quantity: [0],
        description: [''],
      });


      this.brand = new Brand();
      this.product = new Product();
      this.product.brand = new Brand();
      this.product.category = new Category();
      this.category = new Category();

      this.getProduct();
      this.getBrands();
      this.getCategories();
      this.getProviders();
    }

  get f() { return this.form.controls; }


  open(content) {
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

  getProduct(){
    this.form.controls.reference.setValue( this.route.snapshot.paramMap.get('id').toString());
    this.productService.get().subscribe(res=>{
      res.products.forEach(prod => {
        if(prod.reference === this.form.value.reference){
          this.form.controls.nameProduct.setValue(prod.name);
          this.form.controls.brandProduct.setValue(prod.brand.reference);
          this.form.controls.cost.setValue(prod.cost);
          this.form.controls.price.setValue(prod.price);
          this.form.controls.quantity.setValue(prod.quantity);
          this.form.controls.description.setValue(prod.description);
          this.form.controls.categoryProduct.setValue(prod.category.reference);
        }
      });
    });
  }

  modifyProduct(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value
    this.product.name = formData.name;
    this.product.category.reference = formData.categoryProduct;
    this.product.reference = formData.reference;
    this.product.description = formData.description;
    this.product.quantity = formData.quantity;
    this.product.brand.reference = formData.brandProduct;
    this.product.price = formData.price;
    this.product.cost = formData.cost;
    this.productService.put(this.product).subscribe(p => {
      if (p != null) {
      this.showNotification('Modificación', p.message,'bottom', 'right')
      }
      this.location.back();
    });
  }

  addBrand() {
    this.brandService.post(this.brand).subscribe(p => {
      if (p != null) {
        this.showNotification('Aviso', p.message,'bottom', 'right')
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
        this.showNotification('Aviso', p.message,'bottom', 'right')
      }
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
