import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { ControlsComponent } from './components/controls/controls.component'
import { ButtonComponent } from './components/button/button.component'
import { GridComponent } from './components/grid/grid.component'

@NgModule({
  declarations: [AppComponent, HeaderComponent, ControlsComponent, ButtonComponent, GridComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
