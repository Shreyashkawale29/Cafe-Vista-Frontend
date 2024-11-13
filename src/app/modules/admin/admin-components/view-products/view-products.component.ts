import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent {
  categoryId: any = this.activatedroute.snapshot.params['categoryId']; // Correct declaration
  Products: any[] = [];
  isSpinning: boolean;
  validateForm: FormGroup;
  size: NzButtonSize = 'large';

  constructor(
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsByCategory();

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]], // Form control with validation
    });
  }

  submitForm(): void {
    this.isSpinning = true; // Start spinner
    this.Products = []; // Clear products before the search

    // Call the service to search for products by title
    this.adminService
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

  getProductsByCategory(): void {
    this.Products = [];
    this.isSpinning = true;

    this.adminService.getProductsByCategory(this.categoryId).subscribe(
      (res) => {
        console.log(res);
        res.forEach((element: any) => {
          element.processedImg =
            'data:image/jpeg;base64,' + element.returnedImg; // Fixed string concatenation
          this.Products.push(element); // Push the processed product to the array
        });
        this.isSpinning = false; // Stop spinner after data is loaded
      },
      (error) => {
        console.error('Error fetching products: ', error);
        this.isSpinning = false; // Stop spinner on error
      }
    );
  }

  deleteProduct(productId: number){
    
        this.adminService.deleteProduct(productId).subscribe((res) => {
          if (res == null) {
            this.getProductsByCategory(); 
            this.message.success('Product Deleted Successfully.', { nzDuration: 5000 }); 
          } else {
            this.message.error('Something went wrong.', { nzDuration: 5000 }); 
          }
        }, (error) => {
          this.message.error('Error while deleting the product.', { nzDuration: 5000 }); 
          console.error('Delete product error: ', error);
        });
    }

    // updateProduct(productId: number): void {
    //   this.router.navigate([`/admin/product/${productId}`]);
    // }
}
