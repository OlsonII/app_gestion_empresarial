import { Component, OnInit } from '@angular/core';
import {MovementService} from '../../services/movement.service';
import { Movement } from '../../models/movement.model';

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
        this.movements = data.movements;
        this.movements.forEach( (movement) => {

          if (movement.outputQuantity != '0'){
            movement.quantity = movement.outputQuantity;
            movement.type = 'Salida';
          }

          if (movement.inputQuantity != '0'){
            movement.quantity = movement.inputQuantity;
            movement.type = 'Entrada';
          }
        } )
        this.movements.reverse();
      }
    });
  }



}
