import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  roles: string[] = ['Administrador','Encargado de inventario','Vendedor'];
  user: User;
  users: User[];
  staticAlertClosed=false;
  searchValue:string;

  constructor(private toastr: ToastrService, private userService:UserService) {}

  ngOnInit() {
    this.user = new User();
    this.getUsers();
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

  getUsers(){
    this.userService.get().subscribe(
      res=>{
        if(res!=null){
          this.users = res.users;
        }
      }
    );
  }

  add() {
    this.userService.post(this.user).subscribe(p => {
      if (p != null) {
        this.showNotification('Registro',p.message,'bottom','right');
      }

      this.getUsers();
    });
  }

}
