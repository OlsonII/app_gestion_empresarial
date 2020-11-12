import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from '../../models/brand.model';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modals.component.html'
})
export class ModalsComponent implements OnInit{
  @Input() brand:Brand;
  @Input() option:string;
  token;
  userId;

  constructor(public activeModal: NgbActiveModal,
              private brandService: BrandService,
              private toastr: ToastrService,
              private auth:JwtAuthService,
              ) {
  }

  ngOnInit(): void {
    this.token = this.auth.getJwtToken();
    this.userId = this.auth.getUser();
  }


  dismiss(){
    this.activeModal.dismiss('Cross click');
  }

  close(){
    this.activeModal.close('Close click');
  }

  modifyBrand() {
    const namee = this.brand.name;
    this.brand.token = this.token;
    this.brand.userIdentification = this.userId;
    console.log(this.brand);
    this.brandService.put(this.brand).subscribe(p => {
      if (p != null) {
        this.showNotification('Modificacion', 'Marca: '+ p.message, 'bottom', 'right')
      }
      else{
        this.showNotification('Error', 'Marca: '+ p.message,'bottom', 'right')
      }

    });
  }

  addBrand() {
    this.brand.token = this.token;
    this.brand.userIdentification = this.userId;
    this.brandService.post(this.brand).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro', 'Marca: '+ p.message,'bottom', 'right')
      }
      else {
        this.showNotification('Error', 'Marca: '+ p.message,'bottom', 'right')
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




