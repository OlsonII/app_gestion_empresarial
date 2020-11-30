/* tslint:disable:triple-equals */
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {Product}from '../../models/product.model';
import {ProductService}from '../../services/product.service';
import {Sale} from '../../models/sale.model';
import {SalesService} from '../../services/sales.service';
import {JwtAuthService} from '../../services/auth/jwt-auth.service';
import { Client } from '../../models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent implements OnInit,OnDestroy {

  productos:Product[] =[];
  clients: Client[];
  totalSale = 0;
  productosFactura:Product[]=[];
  searchValue = '';
  public isCollapsed = true;
  form: FormGroup;
  client:Client;
  submitted = false;
  closeResult = '';
  formClientValidate = false;

  constructor(
    private productService:ProductService,
    private salesService:SalesService,
    private jwtAuth:JwtAuthService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    window.addEventListener('resize', this.updateColor);
    this.getProducts();
    this.client = new Client();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      telephone: ['', Validators.required],
      street: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  dataClient(){
    this.formClientValidate = true;
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

  getProducts(){
    this.productService.get().subscribe(
      res=>{
        if(res!=null){
          this.productos = res.products;
        }
      }
    )
  }

  showNotification(titulo, mensaje,from, align){
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>'+mensaje, titulo, {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });

  }

  addClient() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    this.client.name = formData.name;
    this.client.identification = formData.identification;
    this.client.email = formData.email;
    this.client.street = formData.street;
    this.client.telephone = formData.telephone;
    this.clientService.post(this.client).subscribe(p => {
      if (p != null) {
        this.formClientValidate = false;
        this.showNotification('Registro',p.message,'bottom','right');
      }
    });
  }

  getClient(content){
    console.log('press enter')
    let result = false;
    this.clientService.get().subscribe(res=> {
      res.clients.forEach(client => {
        if (client.identification === this.form.value.identification) {
          this.client = client;
          this.form.controls.name.setValue(client.name);
          this.form.controls.email.setValue(client.email);
          result = true;
        }
      })
      if (result == false) {
        this.open(content);
      };
    });
  }

  getTotalSale(){
    let subTotal = 0;
    this.productosFactura.forEach(prod => {
      subTotal+= prod.price;
    });
    this.totalSale = subTotal;
  }

  addProduct(prod:Product){

    let entro=false;
    const newProd = {...prod};
    newProd.quantity = 1;

    if(prod.quantity>0){
      this.productosFactura.forEach(prodFact => {
        if(prodFact.reference == prod.reference){
          entro=true;

          newProd.quantity = prodFact.quantity + 1;

          prod.quantity --;
        }
      });

      if(entro){
        const index = this.productosFactura.findIndex((produtc)=>produtc.reference==prod.reference);
        if (index > -1) {
          this.productosFactura[index].quantity = newProd.quantity;
          this.productosFactura[index].price = newProd.quantity * newProd.price;
        }else{
          console.log('not found');
        }
      }else{
          this.productosFactura.push(newProd);
          prod.quantity --;
      }
    }
    this.getTotalSale();
  }

  registrarVenta(){
    const venta = new Sale();
    venta.products = this.productosFactura;
    venta.clientIdentification = this.form.value.identification;
    venta.value = this.totalSale;
    console.log(venta);
    this.salesService.post(venta).subscribe(res=>{
      console.log(res);
    }
    );
  }

 // NAVBAR  ---
  updateColor = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
      if (window.innerWidth < 993 && !this.isCollapsed) {
        navbar.classList.add('bg-white');
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.remove('bg-white');
        navbar.classList.add('navbar-transparent');
      }
    };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  ngOnDestroy(){
    window.removeEventListener('resize', this.updateColor);
 }
}
