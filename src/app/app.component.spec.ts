import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'

import { AppComponent } from './app.component'
import { SupabaseService } from './services/supabase.service'
import { HeaderComponent } from './components/header/header.component'
import { GridComponent } from './components/grid/grid.component'
import { ControlsComponent } from './components/controls/controls.component'
import { ButtonComponent } from './components/button/button.component'

class MockSupabaseService {
  getDailySudoku() {
    return of({
      data: [],
      error: null,
      status: 200,
    })
  }
}

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let supabaseService: SupabaseService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        GridComponent,
        ControlsComponent,
        ButtonComponent,
      ],
      providers: [{ provide: SupabaseService, useClass: MockSupabaseService }],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    supabaseService = TestBed.inject(SupabaseService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with the correct default values', () => {
    expect(component.solved).toBeFalse()
    expect(component.status).toBe('')
    expect(component.grid).toEqual([])
    expect(component.downloading).toBeFalse()
  })

  it('should call getDailySudoku on ngOnInit', () => {
    spyOn(component, 'getDailySudoku')
    component.ngOnInit()
    expect(component.getDailySudoku).toHaveBeenCalled()
  })

  it('should update cell value when updateCell method is called', () => {
    component.grid = [
      [
        { actual: 1, current: 0, moddable: true },
        { actual: 2, current: 0, moddable: true },
      ],
    ]
    const event = { target: { value: '1' } } as unknown as Event
    component.updateCell(0, 0, event)
    expect(component.grid[0][0].current).toBe(1)
  })

  it('should call supabase service method when getDailySudoku method is called', () => {
    spyOn(supabaseService, 'getDailySudoku').and.callThrough()
    component.getDailySudoku()
    expect(supabaseService.getDailySudoku).toHaveBeenCalled()
  })
})
