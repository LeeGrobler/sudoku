import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'))
    expect(titleElement.nativeElement.textContent).toBe('Sudoku Daily')
  })

  it('should display the current date', () => {
    const dateElement = fixture.debugElement.query(By.css('.text-xl'))
    expect(dateElement.nativeElement.textContent).toBe(component.date)
  })

  it('should display the correct number of rows and cells', () => {
    const rowElements = fixture.debugElement.queryAll(By.css('.row'))
    expect(rowElements.length).toBe(9)

    rowElements.forEach((rowElement, rowIndex) => {
      const cellElements = rowElement.queryAll(By.css('.cell'))
      expect(cellElements.length).toBe(9)
    })
  })

  it('should update the cell value when a new value is selected', () => {
    const testRowIndex = 0
    const testCellIndex = 0
    const testNewValue = 3

    const rowElement = fixture.debugElement.queryAll(By.css('.row'))[testRowIndex]
    const cellElement = rowElement.queryAll(By.css('.cell'))[testCellIndex]
    const selectElement = cellElement.query(By.css('select'))

    selectElement.triggerEventHandler('change', { target: { value: testNewValue.toString() } })
    fixture.detectChanges()

    expect(component.grid[testRowIndex][testCellIndex].current).toBe(testNewValue)
  })

  it('should correctly check if the solution is solved or not', () => {
    const checkSolutionSpy = spyOn(component, 'checkSolution').and.callThrough()
    const consoleLogSpy = spyOn(console, 'log')

    const buttonElement = fixture.debugElement.query(By.css('.btn-solve'))
    buttonElement.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(checkSolutionSpy).toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalledWith('solved:', jasmine.any(Boolean))
  })
})
