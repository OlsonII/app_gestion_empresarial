import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-consult-user',
  templateUrl: './consult-user.component.html',
  styleUrls: ['./consult-user.component.scss']
})
export class ConsultUserComponent implements OnInit {

  users: User[];
  searchValue:string;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.getUsers();
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
}
