import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule,RequestOptions, XHRBackend} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, DefaultUrlSerializer, UrlTree} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule,MdInputModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';


import { AppComponent } from './app.component';
import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { FooterComponent } from './Theme/footer/footer.component';
import { LoginComponent } from './components/login/login.component';


//Angular 2 ui notification
import {ToastyModule} from 'ng2-toasty';

//Services
import {HttpService} from './auth-providers/http.service';
import {AuthService} from './auth-providers/auth.service';
import {AuthGuard} from './auth-providers/auth-guard.service';
import { RoutineComponent } from './components/routine/routine.component';
import {RoutineService} from './data-services/routine.service'

//Routing
const appRoutes: Routes=[
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'routine', component:RoutineComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/login' }
]

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
      return super.parse(url.toLowerCase());
  }
}

//Config Http with Headers
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpService(backend, defaultOptions);
  }

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RoutineComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    ReactiveFormsModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    ToastyModule.forRoot()
  ],
  providers: [AuthService,AuthGuard,RoutineService,{
    provide:DefaultUrlSerializer,
    useClass:LowerCaseUrlSerializer
  },
  {
    provide: HttpService,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions]
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
