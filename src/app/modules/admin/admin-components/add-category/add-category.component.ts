import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: String | ArrayBuffer | null = null;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  // Correct lifecycle hook name
  ngOnInit(): void {
    // Initialize the form with FormBuilder
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  postCategory(): void {
    console.log(this.categoryForm.value);
    const formdata: FormData = new FormData();
    
    if (this.selectedFile) {
      formdata.append('img', this.selectedFile);
    }
    
    formdata.append('name', this.categoryForm.get('name').value);
    formdata.append('description', this.categoryForm.get('description').value);

    this.service.postCategory(formdata).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.message.success('Category posted successfully', { nzDuration: 5000 });
        } else {
          this.message.error('Something went wrong!', { nzDuration: 5000 });
        }
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
