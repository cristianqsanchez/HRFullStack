import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employees.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Department, DepartmentService } from '../../departments/departments.service';
import { Position, PositionService } from '../../positions/positions.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './employee-list.html',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  positions: Position[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.departmentService.getAll().subscribe(deps => this.departments = deps);
    this.positionService.getAll().subscribe(pos => this.positions = pos);
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  edit(employee: Employee) {
    this.router.navigate(['/employees/edit', employee.id]);
  }

  delete(id: number) {
    if (confirm('¿Eliminar este empleado?')) {
      this.employeeService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

  create() {
    this.router.navigate(['/employees/new']);
  }

  canCreate(): boolean {
    return this.departments.length > 0 && this.positions.length > 0;
  }
}
