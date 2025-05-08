import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { User } from "../../core/models/user.model";
import { UserService } from "../../core/services/user.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { UserActionComponent } from "./user-action/user-action.component";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";
import { AlertService } from "../components/alert/alert.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls:["./users.component.css"],
  imports:[CommonModule,SpinnerLoaderComponent]
})

export class UsersComponent {

  users:User[]=[];
  isLoading = true;

  constructor(
    private userService:UserService,
    private modalService:BsModalService,
    private alertService:AlertService
  ) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.isLoading=true;
    this.userService.getUsers().subscribe((data:User[])=>{
      this.users=data;
      this.isLoading=false;
    });
  }

  onAddUser() {
    this.modalService.show(UserActionComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
    }).onHidden?.subscribe(() => {
      this.getUsers();
    });;
  }

  onEditUser(user:User) {
    if(this.users){
      this.modalService.show(UserActionComponent, {
        class: 'modal-dialog modal-lg modal-dialog-centered',
        initialState: {
          isEditMode: true,
          user: user,
        },
      }).onHidden?.subscribe(() => {
        this.getUsers();
      });
    }
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
      this.alertService.showWarning("User deleted successfully.");
    });
  }
}
