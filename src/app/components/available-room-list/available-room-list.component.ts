import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import {RoomAllocationComponent} from '../../dialog-components/room-allocation/room-allocation.component';
import { MdIconRegistry, MdDialog } from '@angular/material';
import {RoutineModify} from '../../buisness-logic/routine-modify';
import {DomSanitizer} from '@angular/platform-browser';
import { RoutineService } from '../../data-services/routine.service';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

@Component({
  selector: 'app-available-room-list',
  templateUrl: './available-room-list.component.html',
  styleUrls: ['./available-room-list.component.css'],
  providers :[RoutineModify]
})
export class AvailableRoomListComponent implements OnInit {

  public ModifyRoutine:any;

  private date: any;

  constructor(private route: Router, private dialog: MdDialog, private _service : RoutineService,  private iocnRegister:MdIconRegistry ,
    private routinModify: RoutineModify, private activeRoute: ActivatedRoute, private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig, private sanitizer:DomSanitizer) {

      this.iocnRegister.addSvgIcon(
        'correct-svg',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/correct.svg'));
     

      activeRoute.queryParams.subscribe(params => {
          this.date= params["date"];
          console.log(this.date);
      }, error => {
        route.navigate(['/routine']);
      });
     
   }

  ngOnInit() {
    this._service.getEmptyClassRoom({date:this.date}).subscribe(result => {
      this.ModifyRoutine = this.routinModify.CreateEmptyClassRoutineByDate(result);
      console.log(this.ModifyRoutine);
    }, error => {
      this.toastyService.error({
        title: "Warning!",
        msg: JSON.parse(error._body).Message,
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    });
  }

  applyRoom(dayName,timeSlot,roomNO){
    let dialogRef=this.dialog.open(RoomAllocationComponent,{
      width:'400px',
      data: {dayName:dayName,timeSlot:timeSlot,date:this.date,roomNo:roomNO}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=null){
       
      }
    })
  }

  ViewRoutine() {
    this.route.navigate(['/route']);
  }

  ViewRoomCancellationList(){
    this.route.navigate(['/RoomCancellationList']);
  }

  ViewRoomAllocationList(){
    this.route.navigate(['/RoomAllocationList']);
  }

  ViewMyRoutine(){
    this.route.navigate(['/MyRoutine']);
  }

}
