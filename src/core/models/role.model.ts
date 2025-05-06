export enum RoleType {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  SALESPERSON = 'salesperson'
}

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}