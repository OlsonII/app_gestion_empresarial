import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {
  roles: string[] = ['Administrador','Encargado de inventario','Vendedor'];
  user: User;
  staticAlertClosed=false;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
     private userService:UserService) {}

  ngOnInit() {
    this.user = new User();
    this.getUser();
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

  getUser(){
    this.user.identification = this.route.snapshot.paramMap.get('id').toString();
    this.userService.get().subscribe(res=>{

      res.users.forEach(user => {
        if(user.identification === this.user.identification){
          this.user = user;
          this.user.newIdentification = user.identification;
        }
      });
    }
    );
  }

  updateUser(){
    this.userService.put(this.user).subscribe(res=>{
      this.showNotification('Modificación', res.message,'bottom', 'right');
      this.location.back();
    })

  }

}
