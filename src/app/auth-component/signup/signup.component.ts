import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isSpinning = false;
  validateForm!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validator added
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      checkPassword: ['', [Validators.required, this.confirmationValidation]], // Confirmation password check
      name: ['', Validators.required],
    });
  }

  
  confirmationValidation = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  };

  // Signup method
  signup() {
    if (this.validateForm.valid) {
      this.isSpinning = true; // Start spinner
      this.service.signup(this.validateForm.value).subscribe(
        (data) => {
          this.isSpinning = false; // Stop spinner
          if (data.id != null) {
            this.notification.success('SUCCESS', 'You are Signed Up Successfully', {
              nzDuration: 5000,
            });
          } else {
            this.notification.error('ERROR', 'Something went wrong', {
              nzDuration: 5000,
            });
          }
        },
        (error) => {
          this.isSpinning = false; // Stop spinner in case of error
          this.notification.error('ERROR', 'Signup failed. Please try again.', {
            nzDuration: 5000,
          });
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }
}
