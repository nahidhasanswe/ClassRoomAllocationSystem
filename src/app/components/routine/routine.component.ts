import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoutineService} from '../../data-services/routine.service';
import {RoutineModify} from '../../buisness-logic/routine-modify';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry,MdDialog} from '@angular/material';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import * as moment from "moment";


//Import Dialog Modal
import {ApplyRoomComponent} from '../../dialog-components/apply-room/apply-room.component';
import {ClassRoomSearchComponent} from '../../dialog-components/class-room-search/class-room-search.component';
import {RoomAllocationComponent} from '../../dialog-components/room-allocation/room-allocation.component';


@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
  providers:[RoutineModify]
})
export class RoutineComponent implements OnInit {
  
  public ModifyRoutine:Array<any>=[];
  public allocationDate:Date;
  public room:RoomAllocation;


  constructor(private _routine:RoutineService,private _routtineModify:RoutineModify, 
    private iocnRegister:MdIconRegistry, private sanitizer:DomSanitizer, private dialog:MdDialog, 
    private toastyService:ToastyService, private toastyConfig: ToastyConfig, private route:Router) {

    this.toastyConfig.theme='material';
    this.iocnRegister.addSvgIcon(
      'correct-svg',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/correct.svg'));
   }

  ngOnInit() {
    this._routine.getRoutine().subscribe((result)=>{
      this.ModifyRoutine=this._routtineModify.CreateRoutine(result);
    });
  }

  applyRoom(dayName,timeSlot,roomNO){
    let dialogRef=this.dialog.open(ApplyRoomComponent,{
      width:'400px',
      data: {dayName:dayName,timeSlot:timeSlot,date:null,roomNo:roomNO}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=null){
        this.OpenRoomAllocationModal(result);
      }
    })
  }

  OpenRoomAllocationModal(data){
    let dialogRef=this.dialog.open(RoomAllocationComponent,{
      width:'400px',
      data:data
    })
  }


  viewAvailableRoom(){
    if(this.allocationDate==null){
      this.toastyService.error({
            title: "Warning!",
            msg: "Date can not be empty or must be valid",
            showClose: true,
            timeout: 3000,
            theme: "default"
        });
    }else if(moment().isAfter(this.allocationDate,'day')){
      this.toastyService.error({
        title: "Warning!",
        msg: "Date must be today or next days",
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    }else if(moment(this.allocationDate).day()==5){
      this.toastyService.error({
        title: "Warning!",
        msg: "Friday is not allow",
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    }
    else{
      this._routine.getEmptyClassRoom({Date:this.allocationDate}).subscribe((result)=>{
        let dialogRef=this.dialog.open(ClassRoomSearchComponent,{
          position: {right:'10px'},
          data: {Date:this.allocationDate,Routine:this._routtineModify.CreateEmptyClassRoutineByDate(result)}
        })
      },error=>{
        this.toastyService.error({
          title: "Warning!",
          msg: JSON.parse(error._body).Message,
          showClose: true,
          timeout: 3000,
          theme: "default"
        });
      });
    }
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


export class RoomAllocation{
  public roomNo:string;
  public timeSlot:string;
  public date:string;
}

