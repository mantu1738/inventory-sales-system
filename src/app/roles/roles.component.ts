import { Component } from "@angular/core";
import { RoleService } from "../../core/services/role.service";
import { Role } from "../../core/models/role.model";
import { CommonModule } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";
import { RoleActionComponent } from "./roles-action/roles-action.component";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  imports:[CommonModule]
})

export class RolesComponent {
  roles: Role[] = [];

  constructor(private roleService: RoleService,private modalService:BsModalService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  addRole() {
    this.modalService.show(RoleActionComponent, {
      class: 'modal-dialog modal-lg modal-dialog-centered',
    }).onHidden?.subscribe(() => {
      this.loadRoles();
    });
  }

  editRole(role: Role) {
    console.log(role);
  }

  deleteRole(id: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
    }
  }
}
