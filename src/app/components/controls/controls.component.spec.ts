import { ComponentFixture, TestBed } from '@angular/core/testing'

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

  it('should create component', () => {
    expect(component).toBeTruthy()
  })
})
