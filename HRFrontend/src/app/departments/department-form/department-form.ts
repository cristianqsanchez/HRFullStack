import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentService, Department } from '../departments.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-department-form',
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
  templateUrl: './department-form.html',
})
export class DepartmentFormComponent implements OnInit {
  form!: FormGroup;


  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      ubication: ['']
    });
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.departmentService.getById(id).subscribe((dept) => {
        this.form.patchValue(dept);
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  save() {
    const department = this.form.value as Partial<Department>;

    if (this.isEditMode) {
      this.departmentService.update(department.id!, department).subscribe(() => {
        this.router.navigate(['/departments']);
      });
    } else {
      this.departmentService.create(department).subscribe(() => {
        this.router.navigate(['/departments']);
      });
    }
  }
}
