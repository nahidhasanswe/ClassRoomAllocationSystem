import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {RoutineService} from '../../data-services/routine.service';
import {RoutineModify} from '../../buisness-logic/routine-modify';
import { Router } from '@angular/router';


import { DateForCancellationComponent } from '../../dialog-components/date-for-cancellation/date-for-cancellation.component';
import { ApplyRoomCancelComponent } from '../../dialog-components/apply-room-cancel/apply-room-cancel.component';


@Component({
  selector: 'app-my-routine',
  templateUrl: './my-routine.component.html',
  styleUrls: ['./my-routine.component.css'],
  providers:[RoutineModify]
})
export class MyRoutineComponent implements OnInit {

    public ModifyRoutine:any;
  
    constructor(private routine:RoutineService,private _routineModify:RoutineModify, private route:Router, private dialog:MdDialog) {
      routine.getIndividualRoutine().subscribe(result=>{
        this.ModifyRoutine=_routineModify.CreateRoutine(result);
      })
    }
  
    ngOnInit() {
    }

    CancelClass(roomNo,timeSlot,dayName,coourseCode) {
      const dialogRef=this.dialog.open(DateForCancellationComponent,{
          width : '400px',
          data : {RoomNo: roomNo, TimeSlot: timeSlot, Date: null, DayName : dayName, CourseCode : coourseCode}
      });

      dialogRef.afterClosed().subscribe(result => {
          if(result !=null){
            let dialogRef=this.dialog.open(ApplyRoomCancelComponent,{
              width:'400px',
              data:result
            })
          }
      });
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
