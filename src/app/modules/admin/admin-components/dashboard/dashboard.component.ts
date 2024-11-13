import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  categories: any[] = [];
  
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean = false;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });

    this.getAllCategories();
  }

  submitForm() {
    this.isSpinning = true;
    this.categories = [];
  
    this.adminService
      .getAllCategoriesByTitle(this.validateForm.get('title')!.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          res.forEach((element: any) => {
            
            if (element.returnedImg) {
              element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            } else {
              
              element.processedImg = 'assets/default-placeholder-image.jpg'; 
            }
            this.categories.push(element);
          });
          this.isSpinning = false;
        },
        error: (err) => {
          console.error('Error searching categories', err);
          this.isSpinning = false;
        },
      });
  }
  
  getAllCategories() {
    this.categories = [];
  
    this.adminService.getAllCategory().subscribe({
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
