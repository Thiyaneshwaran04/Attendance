import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AttendanceComponent } from './attendance/attendance.component';
// import {AngulatFirestoreModule} from '@angular/fire'
import{DatePipe} from '@angular/common'
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,ReactiveFormsModule,NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { } 
