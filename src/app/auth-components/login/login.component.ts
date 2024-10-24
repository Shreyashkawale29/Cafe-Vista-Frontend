import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { StorageService } from 'src/app/auth-services/strorage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSpinning: boolean;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {} // Inject StorageService

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Added email validator
      password: [null, Validators.required],
    });
  }

  // submitForm() {
  //   this.service.login(this.loginForm.value).subscribe((res) => {
  //     console.log(res);
  //   });
  // }
  submitForm() {
    if (this.loginForm.invalid) {
      console.log('Invalid form data');
      return;
    }

    this.isSpinning = true;  // Start spinning

    this.service.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole,
          };
          this.storageService.saveToken(res.jwt);
          this.storageService.saveUser(user);

          if (this.storageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (this.storageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/customer/dashboard');
          }
        } else {
          console.log('Wrong Credentials. Please try again');
        }
        this.isSpinning = false;  // Stop spinning when done
      },
      (error) => {
        console.log('Login error:', error);
        this.isSpinning = false;  // Stop spinning even if there is an error
      }
    );
  }
}
