import { Component } from "@angular/core";
import { RoleService } from "../../core/services/role.service";
import { Role } from "../../core/models/role.model";
import { CommonModule } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";
import { RoleActionComponent } from "./roles-action/roles-action.component";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  imports:[CommonModule,SpinnerLoaderComponent]
})

export class RolesComponent {
  roles: Role[] = [];
  isLoading: boolean = false;

  constructor(private roleService: RoleService,private modalService:BsModalService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
      this.isLoading = false;
    });
  }

  addRole() {
    this.modalService.show(RoleActionComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
    }).onHidden?.subscribe(() => {
      this.loadRoles();
    });
  }

  editRole(role: Role) {
    const initialState = {
      role: role,
      isEditMode: true,
    };
    this.modalService.show(RoleActionComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
      initialState: initialState,
    }).onHidden?.subscribe(() => {
      this.loadRoles();
    });
  }

  deleteRole(id: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
    }
  }
}
