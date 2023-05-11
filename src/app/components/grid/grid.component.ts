import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Puzzle } from 'src/models/sudoku'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() grid: Puzzle = []
  @Input() downloading: boolean = false

  @Output() updateCell = new EventEmitter<{ i: number; j: number; e: Event }>()

  update(i: number, j: number, e: Event) {
    this.updateCell.emit({ i, j, e })
  }
}
