import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrls: ['./post-reservation.component.scss'],
})
export class PostReservationComponent implements OnInit {  
  isSpinning: boolean = false;
  validateForm: FormGroup;

  TableType: string[] = [
    'Standard Table',
    'Booth',
    'Communal Table',
    'Bar Table',
    'Outdoor Table',
    'High-top Table',
    "Chef's Table",
    'Banquette',
    'Convertible Table',
    'Corner Table',
    'Family-Style Table',
    'Window-side Table',
    'Private Dining Table',
    'Lounge Table',
    'Round Table',
    'Custom Table',
  ];

  constructor(
    private fb: FormBuilder, 
    private service: CustomerService, 
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tableType: [null, Validators.required],
      dateTime: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  postReservation() {
    if (this.validateForm.valid) {
      console.log("Form Values before submission:", this.validateForm.value);

      this.service.postReservation(this.validateForm.value).subscribe(
        (res) => {
          console.log("Response from API:", res);
          if (res.id != null) {
            this.message.success("Reservation posted successfully", { nzDuration: 5000 });
          } else {
            this.message.error("Something went wrong", { nzDuration: 5000 });
          }
        },
        (error) => {
          console.error("Error posting reservation:", error);
          this.message.error("Failed to post reservation", { nzDuration: 5000 });
        }
      );
    } else {
      this.message.error("Please complete the form before submitting", { nzDuration: 5000 });
    }
  }
}
