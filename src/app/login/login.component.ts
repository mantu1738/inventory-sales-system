import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  imports: [ReactiveFormsModule, CommonModule, SpinnerLoaderComponent],
  styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string = '/dashboard';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  get formControls() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit(){
    this.loading = true;
    this.authService.login(this.formControls['username'].value, this.formControls['password'].value).subscribe({
      next: (response) => {
        console.log(response)
        this.loading = false;
        if(response.roleId === 'salesperson'){
          this.router.navigate(['/sales']);
        }
        else{
          this.router.navigate(['/dashboard']);
        }
      }
      , error: (error) => {
        this.loading = false;
        this.error = error.message;
      }
    });
  }

}
