import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PositionService, Position } from '../positions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-position-form',
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
  templateUrl: './position-form.html',
})
export class PositionFormComponent implements OnInit {
  form!: FormGroup;


  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: ['']
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.positionService.getById(id).subscribe((pos) => {
        this.form.patchValue(pos);
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  save() {
    const position = this.form.value;

    if (this.isEditMode) {
      this.positionService.update(position.id!, position).subscribe(() => {
        this.router.navigate(['/positions']);
      });
    } else {
      this.positionService.create(position).subscribe(() => {
        this.router.navigate(['/positions']);
      });
    }
  }
}
