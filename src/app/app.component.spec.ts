import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { ControlsComponent } from './components/controls/controls.component'
import { ButtonComponent } from './components/button/button.component'

import { SupabaseService } from './services/supabase.service'
import { Puzzle } from '../models/sudoku'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let supabaseService: SupabaseService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, ControlsComponent, ButtonComponent],
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

  it('should fetch daily sudoku on init', () => {
    const puzzle: Puzzle = [[{ current: 1, actual: 1, moddable: false }]]
    const response = { data: [{ puzzle }], error: null, status: 200 }

    ;(supabaseService.getDailySudoku as jasmine.Spy).and.returnValue(of(response))

    component.ngOnInit()

    expect(supabaseService.getDailySudoku).toHaveBeenCalled()
  })

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
