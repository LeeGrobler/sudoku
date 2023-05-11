import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ControlsComponent } from './controls.component'
import { ButtonComponent } from '../button/button.component'

describe('ControlsComponent', () => {
  let component: ControlsComponent
  let fixture: ComponentFixture<ControlsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsComponent, ButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ControlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the correct text for solved state', () => {
    component.solved = true
    fixture.detectChanges()
    const buttonElements = fixture.debugElement.queryAll(By.css('app-button'))
    expect(buttonElements[0].nativeElement.textContent.trim()).toBe('Solved')
    expect(buttonElements[1].nativeElement.textContent.trim()).toBe('Solved')
  })

  it('should display the correct text for unsolved state', () => {
    component.solved = false
    fixture.detectChanges()
    const buttonElements = fixture.debugElement.queryAll(By.css('app-button'))
    expect(buttonElements[0].nativeElement.textContent.trim()).toBe('Check')
    expect(buttonElements[1].nativeElement.textContent.trim()).toBe('Download')
  })

  it('should emit checkSolution event when Check button is clicked', () => {
    spyOn(component.checkSolution, 'emit')
    component.solved = false
    fixture.detectChanges()
    const checkButton = fixture.debugElement.queryAll(By.css('app-button'))[0]
    checkButton.triggerEventHandler('btnClick', null)
    expect(component.checkSolution.emit).toHaveBeenCalled()
  })

  it('should emit download event when Download button is clicked', () => {
    spyOn(component.download, 'emit')
    component.solved = false
    fixture.detectChanges()
    const downloadButton = fixture.debugElement.queryAll(By.css('app-button'))[1]
    downloadButton.triggerEventHandler('btnClick', null)
    expect(component.download.emit).toHaveBeenCalled()
  })
})
