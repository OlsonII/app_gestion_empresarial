import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent implements OnInit {

  @Input() category:Category;
  @Input() option:string;
  token;
  userId;

  constructor(public activeModal: NgbActiveModal,
              private categoryService: CategoryService,
              private toastr: ToastrService,
              private auth:JwtAuthService,) { }

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

  modifyCategory() {
    const namee = this.category.name;
    console.log(this.category);
    this.categoryService.put(this.category).subscribe(p => {
      if (p != null) {
        this.showNotification('Modificado', 'Marca: ' + namee + ' modificada con exito!', 'bottom', 'right');
      }

    });
  }

  addCategory() {
    const namee = this.category.name;
    this.category.token = this.token;
    this.category.userIdentification = this.userId;
    this.categoryService.post(this.category).subscribe(p => {
      if (p != null) {
        this.showNotification('Agregado', 'Marca: '+ namee +' creada con exito!','bottom', 'right')
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
