import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeService, Employee } from '../employees.service';
import { DepartmentService, Department } from '../../departments/departments.service';
import { PositionService, Position } from '../../positions/positions.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './employee-form.html',
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;

  isEditMode = false;
  departments: Department[] = [];
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) { }

  today = new Date()

  get isReady(): boolean {
    return this.departments.length > 0 && this.positions.length > 0;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: [0, Validators.required],
      departmentId: [0, Validators.required],
      positionId: [0, Validators.required],
    });

    this.departmentService.getAll().subscribe(d => this.departments = d);
    this.positionService.getAll().subscribe(p => this.positions = p);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.employeeService.getById(id).subscribe(e => this.form.patchValue({
        ...e,
        birthDate: new Date(e.birthDate),
        hireDate: new Date(e.hireDate)
      }));
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const emp = this.form.value;

    if (this.isEditMode) {
      this.employeeService.update(emp.id!, emp).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.create(emp).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
