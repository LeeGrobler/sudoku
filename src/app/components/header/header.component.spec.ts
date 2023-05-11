import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { HeaderComponent } from './header.component'

describe('AppComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
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
})
