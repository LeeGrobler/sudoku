import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the correct text', () => {
    component.text = 'Test Button'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('button'))
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Test Button')
  })

  it('should apply the correct color class for blue color', () => {
    component.color = 'blue'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('button'))
    expect(buttonElement.nativeElement.className).toContain('bg-blue-500')
  })

  it('should apply the correct color class for default color', () => {
    component.color = 'default'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('button'))
    expect(buttonElement.nativeElement.className).toContain('bg-gray-500')
  })

  it('should call onClick method and emit event when clicked and not disabled', () => {
    spyOn(component.btnClick, 'emit')
    component.disabled = false
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('button'))
    buttonElement.triggerEventHandler('click', null)
    expect(component.btnClick.emit).toHaveBeenCalled()
  })

  it('should not call onClick method and not emit event when clicked and disabled', () => {
    spyOn(component.btnClick, 'emit')
    component.disabled = true
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('button'))
    buttonElement.triggerEventHandler('click', null)
    expect(component.btnClick.emit).not.toHaveBeenCalled()
  })
})
