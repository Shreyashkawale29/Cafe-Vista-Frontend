import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.scss']
})
export class GetReservationsComponent {

  isSpinning: boolean = false;
  reservations:any;

  constructor(private service:AdminService, private message:NzMessageService){}

  ngOnInit() {
    this.getReservationByUser();
  }

  getReservationByUser(){
    this.service.getReservations().subscribe((res) => {
        console.log(res);
        this.reservations = res;
    })
  }

  changeReservationstatus(reservationId:number, status:string){

    console.log(reservationId);
    console.log(status);
    this.service.changeReservationstatus(reservationId, status).subscribe((res) => {
      console.log(res);
      if(reservationId!=null){
        this.getReservationByUser();
        this.message.success("Reservation Status changed successfully",{nzDuration:5000});

      }else{
        this.message.error("Something went wrong",{nzDuration:5000});

      }

    })
}
}
