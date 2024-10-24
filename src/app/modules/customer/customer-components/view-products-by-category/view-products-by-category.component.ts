import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { elementAt } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.scss']
})
export class ViewProductsByCategoryComponent {

  categoryId:number = this.activatedroute.snapshot.params["categoryId"];
  Products = [];
  validateForm: FormGroup;
  isSpinning: boolean = false;
  size: NzButtonSize = 'large';

  constructor(private activatedroute: ActivatedRoute, private service: CustomerService, private fb: FormBuilder) {

  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]], // Form control with validation
    });
    this.getProductsByCategory();

  }

  getProductsByCategory(){
    this.service.getProductsByCategory(this.categoryId).subscribe((res)=>{
      console.log(res);
      res.forEach(element =>{
        element.processedImg = "data:image/jpeg;base64,"+ element.returnedImg;
        this.Products.push(element);
      })
      
    })
  }

  submitForm(): void {
    this.isSpinning = true; // Start spinner
    this.Products = []; // Clear products before the search

    // Call the service to search for products by title
    this.service
      .getProductsByCategoryAndTitle(
        this.categoryId,
        this.validateForm.get('title')?.value
      )
      .subscribe(
        (res) => {
          res.forEach((element: any) => {
            element.processedImg =
              'data:image/jpeg;base64,' + element.returnedImg;
            this.Products.push(element);
          });
          this.isSpinning = false;
        },
        (error) => {
          console.error('Error fetching products: ', error);
          this.isSpinning = false;
        }
      );
  }

}
