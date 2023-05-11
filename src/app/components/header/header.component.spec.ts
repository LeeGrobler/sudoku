import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'))
    expect(titleElement.nativeElement.textContent.trim()).toBe('Sudoku Daily')
  })

  it('should display the correct author link', () => {
    const authorElement = fixture.debugElement.query(By.css('a'))
    expect(authorElement.nativeElement.textContent.trim()).toBe('Lee Grobler')
    expect(authorElement.nativeElement.getAttribute('href')).toBe('https://lee-grobler.com/')
  })

  it('should display the correct date', () => {
    const dateElement = fixture.debugElement.query(By.css('p'))
    expect(dateElement.nativeElement.textContent.trim()).toBe(component.date)
  })

  it('should display the correct status', () => {
    component.status = 'Testing Status'
    fixture.detectChanges()
    const statusElement = fixture.debugElement.queryAll(By.css('p'))[1]
    expect(statusElement.nativeElement.textContent.trim()).toBe('Testing Status')
  })
})
