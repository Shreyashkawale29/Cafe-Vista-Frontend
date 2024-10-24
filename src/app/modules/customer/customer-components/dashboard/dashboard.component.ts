import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from '../../customer-service/customer.service';


@Component({
  selector: 'customer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

categories: any[] = [];
isSpinning: boolean = false;
validateForm: FormGroup;
size:NzButtonSize = 'large';



constructor(
  private customerService: CustomerService,
  private fb: FormBuilder
  
) {}

ngOnInit(): void {
  this.validateForm = this.fb.group({
    title: [null, Validators.required]
  });
  this.getAllCategories();
}

searchCategory(){
  this.categories = [];
  
  console.log(this.validateForm.value);
  this.customerService.getCategoriesByName(this.validateForm.get(['title'])!.value).subscribe((res) => {
    console.log(res);
    res.forEach((element: any) => {
      element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
      this.categories.push(element);
    });
  });
}


getAllCategories() {
  this.categories = [];

  this.customerService.getAllCategory().subscribe({
    next: (res) => {
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    },
    error: (err) => {
      console.error('Error fetching categories', err);
    }
  });
}

}
