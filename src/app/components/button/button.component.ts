import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = ''
  @Input() disabled: boolean = false
  @Input() color: string = 'button'

  @Output() btnClick = new EventEmitter<void>()

  colorClass() {
    switch (this.color) {
      case 'blue':
        return `bg-blue-500 ${this.disabled ? 'opacity-50 cursor-default' : 'hover:bg-blue-700'}`
      default:
        return `bg-gray-500 ${this.disabled ? 'opacity-50 cursor-default' : 'hover:bg-gray-700'}`
    }
  }

  onClick() {
    this.btnClick.emit()
  }
}
