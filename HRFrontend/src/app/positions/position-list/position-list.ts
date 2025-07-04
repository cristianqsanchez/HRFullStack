import { Component, OnInit } from '@angular/core';
import { PositionService, Position } from '../positions.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './position-list.html',
})
export class PositionListComponent implements OnInit {
  positions: Position[] = [];

  constructor(
    private positionService: PositionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions() {
    this.positionService.getAll().subscribe((data) => {
      this.positions = data;
    });
  }

  edit(position: Position) {
    this.router.navigate(['/positions/edit', position.id]);
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este puesto?')) {
      this.positionService.delete(id).subscribe(() => this.loadPositions());
    }
  }

  create() {
    this.router.navigate(['/positions/new']);
  }
}
