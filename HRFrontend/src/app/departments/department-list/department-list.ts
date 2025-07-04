import { Component, OnInit } from '@angular/core';
import { DepartmentService, Department } from '../departments.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './department-list.html',
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe((data) => {
      this.departments = data;
    });
  }

  edit(department: Department) {
    this.router.navigate(['/departments/edit', department.id]);
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este departamento?')) {
      this.departmentService.delete(id).subscribe(() => this.loadDepartments());
    }
  }

  create() {
    this.router.navigate(['/departments/new']);
  }
}
