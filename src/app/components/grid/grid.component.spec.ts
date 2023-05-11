import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { GridComponent } from './grid.component'

describe('GridComponent', () => {
  let component: GridComponent
  let fixture: ComponentFixture<GridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the correct number of rows and cells', () => {
    component.grid = Array(9).fill(Array(9).fill({ moddable: false, actual: 1 }))
    fixture.detectChanges()
    const rowElements = fixture.debugElement.queryAll(By.css('.puzzle-row'))
    expect(rowElements.length).toBe(9)

    rowElements.forEach(row => {
      const cellElements = row.queryAll(By.css('.puzzle-cell'))
      expect(cellElements.length).toBe(9)
    })
  })

  it('should display the correct cell values', () => {
    component.grid = Array(9).fill(Array(9).fill({ moddable: false, actual: 1 }))
    fixture.detectChanges()
    const cellElements = fixture.debugElement.queryAll(By.css('.puzzle-cell'))
    cellElements.forEach(cell => {
      expect(cell.nativeElement.textContent.trim()).toBe('1')
    })
  })

  it('should emit an updateCell event when a cell is changed', () => {
    spyOn(component.updateCell, 'emit')
    component.grid = Array(9).fill(Array(9).fill({ moddable: true, actual: 1 }))
    fixture.detectChanges()
    const selectElement = fixture.debugElement.query(By.css('select'))
    selectElement.triggerEventHandler('change', null)
    expect(component.updateCell.emit).toHaveBeenCalled()
  })

  it('should disable select if disabled is true', () => {
    component.grid = Array(9).fill(Array(9).fill({ moddable: true, actual: 1 }))
    component.disabled = true
    fixture.detectChanges()
    const selectElement = fixture.debugElement.query(By.css('select'))
    expect(selectElement.properties['disabled']).toBeTrue()
  })
})
