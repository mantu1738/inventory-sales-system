import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormBuilderComponent, FormFieldProperties } from "../../components/form-builder/form-builder.component";
import { FormBuilderService } from "../../components/form-builder/form-builder.service";
import { User } from "../../../core/models/user.model";
import { AddEditUserForm } from "../../../core/forms/user.form";
import { BsModalService } from "ngx-bootstrap/modal";
import { UserService } from "../../../core/services/user.service";


@Component({
  selector: "app-user-action",
  templateUrl: "./user-action.compoent.html",
  imports:[CommonModule,ReactiveFormsModule,FormBuilderComponent],
  providers:[FormBuilderService]
})

export class UserActionComponent {

  userForm!:FormGroup;
  addEditUserFormFields!:FormFieldProperties[];
  @Input() isEditMode: boolean = false;
  @Input() user?:User;


  constructor(private formBuilder:FormBuilderService,
    private fb:FormBuilder,
     private addEditUserForm:AddEditUserForm,
     private modalService:BsModalService,
     private userService:UserService
    ) {
    this.addEditUserFormFields = this.addEditUserForm.getAddEditUserForm();
    this.userForm = this.fb.group({});
    this.formBuilder.updateForm(this.addEditUserFormFields, this.userForm);
  }
  ngOnInit() {

    if(this.isEditMode && this.user){
      this.userForm.patchValue({
        id: this.user.id,
        username: this.user.username,
        password: this.user.password,
        fullName: this.user.fullName,
        email: this.user.email,
        roleId: this.user.roleId,
      });
    }

  }

  onSubmit(){
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return;
    }

    const payload:User = {
      ...this.userForm.value
    };

    if(this.isEditMode && this.user){
      this.userService.updateUser(this.user.id,payload).subscribe((data:User)=>{
        console.log("User updated successfully",data);
        this.userForm.reset();
        this.modalService.hide(); // Hide the modal after successful submission
      });
      return;
    }

    this.userService.createUser(payload).subscribe((data:User)=>{
      console.log("User created successfully",data);
      this.userForm.reset();
      this.modalService.hide(); // Hide the modal after successful submission
    });
  }
}
