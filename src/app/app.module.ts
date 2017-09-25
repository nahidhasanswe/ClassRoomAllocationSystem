import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule,RequestOptions, XHRBackend} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, DefaultUrlSerializer, UrlTree} from '@angular/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import { NgxPaginationModule } from 'ngx-pagination';



//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule,MdInputModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import {MdDialogModule,MdDatepickerModule, MdNativeDateModule, MdTooltipModule, MdChipsModule, MdSelectModule} from '@angular/material';


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
import { RoomCancellationService } from './data-services/room-cancellation.service';
import { AdminService } from './data-services/admin.service';

//Custom Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './theme/sidebar/sidebar.component';
import { FooterComponent } from './Theme/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ApplyRoomComponent } from './dialog-components/apply-room/apply-room.component';
import { ClassRoomSearchComponent } from './dialog-components/class-room-search/class-room-search.component';
import { RoomAllocationComponent } from './dialog-components/room-allocation/room-allocation.component';
import { MyRoutineComponent } from './components/my-routine/my-routine.component';
import { RoomAllocationListComponent } from './components/room-allocation-list/room-allocation-list.component';
import { RoomCancellationListComponent } from './components/room-cancellation-list/room-cancellation-list.component';
import { RoomCancellationComponent } from './dialog-components/room-cancellation/room-cancellation.component';
import { ConfirmDialogComponent } from './dialog-components/confirm-dialog/confirm-dialog.component';
import { AvailableRoomListComponent } from './components/available-room-list/available-room-list.component';
import { DateForCancellationComponent } from './dialog-components/date-for-cancellation/date-for-cancellation.component';
import { ApplyRoomCancelComponent } from './dialog-components/apply-room-cancel/apply-room-cancel.component';
import { PendingListComponent } from './components/admin/pending-list/pending-list.component';
import { TeachersListComponent } from './components/admin/teachers-list/teachers-list.component';
import { ViewAllocationComponent } from './dialog-components/admin/view-allocation/view-allocation.component';
import { AddTeacherComponent } from './dialog-components/admin/add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './dialog-components/admin/update-teacher/update-teacher.component'

//Routing
const appRoutes: Routes=[
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'routine', component:RoutineComponent,canActivate:[AuthGuard]},
  {path:'RoomCancellationList', component:RoomCancellationListComponent,canActivate:[AuthGuard]},
  {path:'RoomAllocationList', component:RoomAllocationListComponent,canActivate:[AuthGuard]},
  {path:'MyRoutine', component:MyRoutineComponent,canActivate:[AuthGuard]},
  {path:'AvailableRoom', component : AvailableRoomListComponent, canActivate: [AuthGuard]},
  {path:'PendingList', component : PendingListComponent, canActivate: [AuthGuard]},
  {path:'TeacherList', component : TeachersListComponent, canActivate: [AuthGuard]},
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
    RoomCancellationComponent,
    RoomCancellationListComponent,
    RoomAllocationListComponent,
    MyRoutineComponent,
    ConfirmDialogComponent,
    AvailableRoomListComponent,
    DateForCancellationComponent,
    ApplyRoomCancelComponent,
    PendingListComponent,
    TeachersListComponent,
    ViewAllocationComponent,
    AddTeacherComponent,
    UpdateTeacherComponent
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
    MdChipsModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    CommonModule,
    FlexLayoutModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes,{useHash :true}),
    ToastyModule.forRoot()
  ],
  entryComponents:[
    ApplyRoomComponent,
    ClassRoomSearchComponent,
    RoomAllocationComponent,
    MyRoutineComponent,
    RoomCancellationComponent,
    ConfirmDialogComponent,
    DateForCancellationComponent,
    ApplyRoomCancelComponent,
    ViewAllocationComponent,
    AddTeacherComponent, 
    UpdateTeacherComponent,
  ],
  providers: [AuthService,AuthGuard,RoutineService,RoomAllocationService,MdNativeDateModule,
    ClassRoomManagermentService, RoomCancellationService,AdminService,{
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
