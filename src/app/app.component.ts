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
  loading = false
  sudoku!: Sudoku
  grid: Puzzle = []

  constructor(private supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.getDailySudoku()
  }

  async getDailySudoku() {
    try {
      this.loading = true

      const { data, error, status } = await this.supabase.getDailySudoku()
      if (error && status !== 406) throw error

      console.log('data:', data)

      // if (!data?.length) {
      //   throw new Error('No daily sudoku found')
      // }

      if (data) {
        this.grid = data[0]['puzzle'].map((row: (typeof this.grid)[0]) =>
          row.map((cell: (typeof this.grid)[0][0]) => ({
            ...cell,
            moddable: cell.current !== cell.actual,
          })),
        )
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log('error: ', err.message)
      }
    } finally {
      this.loading = false
    }
  }

  updateCell(i: number, j: number, e: Event) {
    this.grid[i][j].current = parseInt((<HTMLSelectElement>e.target).value)
  }

  checkSolution() {
    const checkCell = (s: boolean, v: (typeof this.grid)[0][0]) => s && v.current === v.actual
    const checkRow = (s: boolean, v: (typeof this.grid)[0]) => s && v.reduce(checkCell, true)
    const solved = this.grid.reduce(checkRow, true)

    console.log('solved:', solved)
  }
}
