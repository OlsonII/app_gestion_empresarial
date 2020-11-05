import { Component, OnInit } from '@angular/core';
import {MovementService} from '../../services/movement.service';
import {Movement} from '../../models/movemet.model';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  movements:Movement[] = [];

  constructor(
    private movementService: MovementService,
  ) { }

  ngOnInit(): void {
    this.movementService.get().subscribe(data =>{
      if (data != null){
        console.log(data.movements);
        this.movements = data.movements;
        this.movements.reverse();
      }
    });
  }

}
