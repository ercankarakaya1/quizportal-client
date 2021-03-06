import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      },
      {
        validator: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // createUser
    this.authService.signup(this.registerForm.value).subscribe(
      (data: any) => {
        // succes
        Swal.fire('Success', 'Successfully registered.', 'success');
        //this.snackBarService.success(data);
        console.log('response data-> ', data);
      },
      (error) => {
        // error
        this.snackBarService.error(error);
        console.log('response error-> ', error);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
