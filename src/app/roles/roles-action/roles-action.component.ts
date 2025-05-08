import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../../core/models/role.model';
import { RoleService } from '../../../core/services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SpinnerLoaderComponent } from '../../components/spinner-loader/spinner-loader.component';
import { AlertService } from '../../components/alert/alert.service';

@Component({
  selector: 'app-role-action',
  templateUrl: './roles-action.component.html',
  imports: [FormsModule, CommonModule, SpinnerLoaderComponent],
})
export class RoleActionComponent implements OnInit {
  @Input() role: Role | null = null;
  @Input() isEditMode: boolean = false;
  isLoading:boolean=false;
  roleForm:any = {
    name: '',
    type: 'admin',
    permissions: []
  };

  permissionsList = [
    'user.manage', 'role.manage', 'item.manage', 'sales.manage', 'dashboard.view'
  ];

  constructor(private roleService: RoleService,
    private modalService:BsModalService,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.roleForm = this.role ? { ...this.role } : { name: '', type: 'admin', permissions: [] };
  }



  togglePermission(perm: string) {
    if (!this.roleForm.permissions) return;
    const index = this.roleForm.permissions.indexOf(perm);
    index > -1 ? this.roleForm.permissions.splice(index, 1) : this.roleForm.permissions.push(perm);
  }

  saveRole() {
    if (this.roleForm.permissions.length === 0) {
      alert('Please select at least one permission.');
      return;
    }
    this.isLoading=true;
    if (this.role?.id) {
      this.roleService.updateRole(this.role.id, this.roleForm).subscribe(() => {
        this.modalService.hide();
        this.isLoading=false;
        this.alertService.showSuccess('Role updated successfully.');
      });
    } else {
      this.roleService.createRole(this.roleForm as Role).subscribe(() => {
        this.modalService.hide();
        this.isLoading=false;
        this.alertService.showSuccess('Role added successfully.');
      });
    }
    this.roleForm = { name: '', type: 'admin', permissions: [] };
  }

  isChecked(perm: string): boolean {
    return this.roleForm.permissions?.includes(perm) ?? false;
  }
}
