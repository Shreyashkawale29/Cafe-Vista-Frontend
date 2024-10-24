import { Component } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-get-all-reservations',
  templateUrl: './get-all-reservations.component.html',
  styleUrls: ['./get-all-reservations.component.scss']
})


export class GetAllReservationsComponent {

  isSpinning: boolean = false;
  reservations:any;

  constructor(private service:CustomerService){}

  ngOninit() {
    this.getReservationByUser();
  }

  getReservationByUser(){
    this.service.getReservationsByUser().subscribe((res) => {
        console.log(res);
        this.reservations = res;
    })
  }

}
