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
import {MdDialogModule,MdDatepickerModule, MdNativeDateModule} from '@angular/material';


//Angular 2 ui notification
import {ToastyModule} from 'ng2-toasty';

//Services
import {HttpService} from './auth-providers/http.service';
import {AuthService} from './auth-providers/auth.service';
import {AuthGuard} from './auth-providers/auth-guard.service';
import { RoutineComponent } from './components/routine/routine.component';
import {RoutineService} from './data-services/routine.service';
import {RoomAllocationService} from './data-services/room-allocation.service';
import {ClassRoomManagermentService} from './data-services/class-room-managerment.service';

//Custom Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { FooterComponent } from './Theme/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ApplyRoomComponent } from './dialog-components/apply-room/apply-room.component';
import { ClassRoomSearchComponent } from './dialog-components/class-room-search/class-room-search.component';
import { RoomAllocationComponent } from './dialog-components/room-allocation/room-allocation.component';
import { MyRoutineComponent } from './dialog-components/my-routine/my-routine.component';
import { RoomAllocationListComponent } from './dialog-components/room-allocation-list/room-allocation-list.component';
import { RoomCancellationListComponent } from './dialog-components/room-cancellation-list/room-cancellation-list.component';
import { RoomCancellationComponent } from './dialog-components/room-cancellation/room-cancellation.component';
import { ConfirmDialogComponent } from './dialog-components/confirm-dialog/confirm-dialog.component'

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
    RoutineComponent,
    ApplyRoomComponent,
    ClassRoomSearchComponent,
    RoomAllocationComponent,
    MyRoutineComponent,
    RoomAllocationListComponent,
    RoomCancellationListComponent,
    RoomCancellationComponent,
    ConfirmDialogComponent
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
    MdDialogModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    ToastyModule.forRoot()
  ],
  entryComponents:[
    ApplyRoomComponent,
    ClassRoomSearchComponent,
    RoomAllocationComponent,
    MyRoutineComponent,
    RoomAllocationListComponent,
    RoomCancellationListComponent,
    RoomCancellationComponent,
    ConfirmDialogComponent
  ],
  providers: [AuthService,AuthGuard,RoutineService,RoomAllocationService,MdNativeDateModule,ClassRoomManagermentService,{
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
