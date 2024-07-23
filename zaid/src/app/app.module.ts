import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
=======

>>>>>>> bc991c456bc464477fcdb1886ef97f22c985eba7
import { ReactiveFormsModule,FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD

=======
    ContactUsComponent
>>>>>>> bc991c456bc464477fcdb1886ef97f22c985eba7
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
  

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
