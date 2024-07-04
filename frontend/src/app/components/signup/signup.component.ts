import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm !: FormGroup;
  passwordFieldType: string = 'password';
  hidePassword: boolean = true

  constructor(private fb: FormBuilder, private userService: UserService , private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    }, { validator: this.passwordMatchValidator });

  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('conpassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility() {
    //this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    console.log("hello", this.hidePassword);
    this.hidePassword = !this.hidePassword
    console.log("hello2", this.hidePassword);
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.userService.createUser(this.signupForm.value).subscribe({
      next: (res) => {
        console.log("success!!");
        this.snackbar.open('Sign up successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        console.log("error!!", err);
        this.snackbar.open('Sign up failed. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    })
  }

}




