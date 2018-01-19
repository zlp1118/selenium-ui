import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { TestTreeComponent } from './test-tree/test-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TestTreeComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
