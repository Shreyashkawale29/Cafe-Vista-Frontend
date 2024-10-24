import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent {
  productId: any = this.activatedroute.snapshot.params['productId'];
  validateForm: FormGroup; 
  imgChanged = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  isSpinning: boolean;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form group
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]], // Corrected bracket placement
      description: [null, [Validators.required]],
    });

    // Fetch the product data by ID
    this.getProductById();
  }

  getProductById(): void {
    this.adminService.getProductById(this.productId).subscribe((res) => {
      console.log(res);
      const productDto = res;

      // Set existing image
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;

      // Populate the form with the product details
      this.validateForm.patchValue(productDto);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    // Preview the selected image
    this.previewImage();

    // Indicate that the image has changed
    this.imgChanged = true;
    this.existingImage = null; // Clear existing image when new one is selected
  }

  previewImage(): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result; // Set the preview image
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {}

  updateProduct(){
    const formData: FormData = new FormData();

// Check if the image has changed and append the file if available
if (this.imgChanged && this.selectedFile) {
  formData.append('img', this.selectedFile);
}

// Append other form data (name, price, description)
formData.append('name', this.validateForm.get('name')!.value);
formData.append('price', this.validateForm.get('price')!.value);
formData.append('description', this.validateForm.get('description')!.value);

console.log(formData);  // Debugging formData

// Call the service to update the product
this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
  this.isSpinning = false;  // Stop the loading spinner

  // Check if the response contains a valid product ID
  if (res.id != null) {
    this.message.success('Product updated successfully.', { nzDuration: 5000 });
    this.router.navigateByUrl('/admin/dashboard');  // Redirect to dashboard after success
  } else {
    this.message.error('Something went wrong.', { nzDuration: 5000 });
  }
}, (error) => {
  // Handle the error response
  this.isSpinning = false;
  this.message.error('Error occurred while updating the product.', { nzDuration: 5000 });
  console.error('Update Product Error:', error);  // Log error for debugging
});

  }
}
