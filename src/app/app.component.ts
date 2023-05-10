import { Component } from '@angular/core'

import { SupabaseService } from './services/supabase.service'
import { Sudoku, Puzzle } from '../models/sudoku'

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
  solved: boolean = false
  status: string = ''
  sudoku!: Sudoku
  grid: Puzzle = []

  constructor(private supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.getDailySudoku()
  }

  async getDailySudoku() {
    try {
      this.status = 'Loading...'

      const { data, error, status } = await this.supabase.getDailySudoku()
      if (error && status !== 406) throw error

      console.log('data:', data)

      if (data) {
        if (!data.length) throw new Error('No daily sudoku found')

        this.grid = data[0]['puzzle'].map((row: (typeof this.grid)[0]) =>
          row.map((cell: (typeof this.grid)[0][0]) => ({
            ...cell,
            moddable: cell.current !== cell.actual,
          })),
        )
      }

      this.status = ''
    } catch (err) {
      if (err instanceof Error) {
        this.status = `Error: ${err.message}`
      }
    }
  }

  updateCell(i: number, j: number, e: Event) {
    this.grid[i][j].current = parseInt((<HTMLSelectElement>e.target).value)
  }

  checkSolution() {
    if (!this.solved) {
      const checkCell = (s: boolean, v: (typeof this.grid)[0][0]) => s && v.current === v.actual
      const checkRow = (s: boolean, v: (typeof this.grid)[0]) => s && v.reduce(checkCell, true)
      this.solved = this.grid.reduce(checkRow, true)

      this.status = this.solved ? 'You won! 🥳' : 'Not yet. Try again. 😅'
      if (!this.solved) setTimeout(() => (this.status = ''), 5000)
    }
  }
}
