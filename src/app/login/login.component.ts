import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { DeafultCredComponent } from "../components/default-cred/default-cred.component";
import { AlertService } from "../components/alert/alert.service";
import { ItemService } from "../../core/services/item.service";
import { SalesService } from "../../core/services/sales.service";
import { RoleService } from "../../core/services/role.service";

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
    private authService: AuthService,
    private modalService:BsModalService,
    private alertService:AlertService,
    private itemsService:ItemService,
    private salesService:SalesService,
    private roleService:RoleService
  ) {
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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onSubmit(){
    this.loading = true;
    this.authService.login(this.formControls['username'].value, this.formControls['password'].value).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
        this.alertService.showSuccess('Login successful!');
      }
      , error: (error) => {
        this.loading = false;
        this.error = error.message;
        this.alertService.showError('Login failed! Please check your credentials.');
      }
    });
  }

  showCredentials(){
    this.modalService.show(DeafultCredComponent,{
      class: 'modal-dialog-centered',
    })
  }

}
