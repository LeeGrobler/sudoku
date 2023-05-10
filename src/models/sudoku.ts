export type Puzzle = {
  current: number
  actual: number
  moddable: boolean
}[][]

export interface Sudoku {
  id: number
  createdAt: Date
  playAt: Date
  puzzle: Puzzle
}
