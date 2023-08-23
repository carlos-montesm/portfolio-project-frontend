import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Use ajax requests
import { FormsModule } from '@angular/forms'; // Use two-way data binding

// The route module (routing) and the route service (appRoutingProviders) are imported
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing, // Routes configuration file is loaded
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders // The routes service is loaded for use in other components
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
