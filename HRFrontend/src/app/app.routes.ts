import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employees/employee-form/employee-form';
import { EmployeeListComponent } from './employees/employee-list/employee-list';
import { DepartmentListComponent } from './departments/department-list/department-list';
import { DepartmentFormComponent } from './departments/department-form/department-form';
import { PositionFormComponent } from './positions/position-form/position-form';
import { PositionListComponent } from './positions/position-list/position-list';
import { DashboardComponent } from './shared/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentFormComponent },
  { path: 'departments/edit/:id', component: DepartmentFormComponent },
  { path: 'positions', component: PositionListComponent },
  { path: 'positions/new', component: PositionFormComponent },
  { path: 'positions/edit/:id', component: PositionFormComponent },
];
