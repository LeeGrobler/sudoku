import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { SupabaseService } from './services/supabase.service'
import { of } from 'rxjs'
import { Puzzle } from '../models/sudoku'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let supabaseService: SupabaseService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: SupabaseService,
          useValue: jasmine.createSpyObj('SupabaseService', ['getDailySudoku']),
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    supabaseService = TestBed.inject(SupabaseService)
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct title', () => {
    fixture.detectChanges()
    const titleElement = fixture.debugElement.query(By.css('h1'))
    expect(titleElement.nativeElement.textContent).toBe('Sudoku Daily')
  })

  it('should display the current date', () => {
    fixture.detectChanges()
    const dateElement = fixture.debugElement.query(By.css('.text-xl'))
    expect(dateElement.nativeElement.textContent).toContain(component.date)
  })

  it('should fetch daily sudoku on init', () => {
    const puzzle: Puzzle = [[{ current: 1, actual: 1, moddable: false }]]
    const response = { data: [{ puzzle }], error: null, status: 200 }

    ;(supabaseService.getDailySudoku as jasmine.Spy).and.returnValue(of(response))

    component.ngOnInit()

    expect(supabaseService.getDailySudoku).toHaveBeenCalled()
  })

  // it('should display the correct number of rows and cells', fakeAsync(() => {
  //   fixture.detectChanges()
  //   tick()
  //   fixture.detectChanges()

  //   const rowElements = fixture.debugElement.queryAll(By.css('.puzzle-row'))
  //   expect(rowElements.length).toBe(9)

  //   rowElements.forEach((rowElement, rowIndex) => {
  //     const cellElements = rowElement.queryAll(By.css('.puzzle-cell'))
  //     expect(cellElements.length).toBe(9)
  //   })
  // }))

  // it('should update the cell value when a new value is selected', () => {
  //   const testRowIndex = 0
  //   const testCellIndex = 0
  //   const testNewValue = 3

  //   const rowElement = fixture.debugElement.queryAll(By.css('.row'))[testRowIndex]
  //   const cellElement = rowElement.queryAll(By.css('.cell'))[testCellIndex]
  //   const selectElement = cellElement.query(By.css('select'))

  //   selectElement.triggerEventHandler('change', { target: { value: testNewValue.toString() } })
  //   fixture.detectChanges()

  //   expect(component.grid[testRowIndex][testCellIndex].current).toBe(testNewValue)
  // })

  // it('should correctly check if the solution is solved or not', () => {
  //   const checkSolutionSpy = spyOn(component, 'checkSolution').and.callThrough()
  //   const consoleLogSpy = spyOn(console, 'log')

  //   const buttonElement = fixture.debugElement.query(By.css('.btn-solve'))
  //   buttonElement.triggerEventHandler('click', null)
  //   fixture.detectChanges()

  //   expect(checkSolutionSpy).toHaveBeenCalled()
  //   expect(consoleLogSpy).toHaveBeenCalledWith('solved:', jasmine.any(Boolean))
  // })

  it('should handle error while fetching sudoku', async () => {
    ;(supabaseService.getDailySudoku as jasmine.Spy).and.returnValue(
      Promise.reject({ message: 'Error' }),
    )

    await component.ngOnInit()

    expect(component.status).toContain('Error')
  })

  it('should check if the solution is correct', () => {
    component.grid = [[{ current: 1, actual: 1, moddable: false }]]
    component.checkSolution()

    expect(component.solved).toBe(true)
    expect(component.status).toContain('You won')
  })

  it('should indicate if the solution is not correct', () => {
    component.grid = [[{ current: 1, actual: 2, moddable: true }]]
    component.checkSolution()

    expect(component.solved).toBe(false)
    expect(component.status).toContain('Not yet')
  })

  it('should update a cell', () => {
    component.grid = [[{ current: 0, actual: 1, moddable: true }]]
    component.updateCell(0, 0, { target: { value: '1' } } as any)

    expect(component.grid[0][0].current).toBe(1)
  })
})
