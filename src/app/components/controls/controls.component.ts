import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Input() solved: boolean = false
  @Output() checkSolution = new EventEmitter<void>()
  @Output() download = new EventEmitter<void>()

  action(which: string) {
    if (which === 'checkSolution') this.checkSolution.emit()
    if (which === 'download') this.download.emit()
  }
}
