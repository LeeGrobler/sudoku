import { Component } from '@angular/core'
import grid from '../grid'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sudoku Daily'
  date = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  grid = grid

  updateCell(i: number, j: number, e: Event) {
    this.grid[i][j].current = parseInt((<HTMLSelectElement>e.target).value)
  }

  checkSolution() {
    const checkCell = (s: boolean, v: (typeof grid)[0][0]) => s && v.current === v.actual
    const checkRow = (s: boolean, v: (typeof grid)[0]) => s && v.reduce(checkCell, true)
    const solved = this.grid.reduce(checkRow, true)

    console.log('solved:', solved)
  }
}
