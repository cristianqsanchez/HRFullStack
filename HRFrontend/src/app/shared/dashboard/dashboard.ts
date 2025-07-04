import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../employees/employees.service';
import { DepartmentService } from '../../departments/departments.service';
import { PositionService } from '../../positions/positions.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    CardModule,
    ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  employeeCount = 0;
  departmentCount = 0;
  positionCount = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(e => this.employeeCount = e.length);
    this.departmentService.getAll().subscribe(d => this.departmentCount = d.length);
    this.positionService.getAll().subscribe(p => this.positionCount = p.length);
  }
}
