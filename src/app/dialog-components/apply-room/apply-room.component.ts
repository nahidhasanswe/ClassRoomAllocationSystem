import { Component, OnInit ,Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import {RoomAllocationService} from '../../data-services/room-allocation.service';
import * as moment from "moment";

@Component({
  selector: 'app-apply-room',
  templateUrl: './apply-room.component.html',
  styleUrls: ['./apply-room.component.css']
})
export class ApplyRoomComponent implements OnInit {

  public allocationDate:Date;
  public room:roomAllocation;

  constructor(private dialogRef:MdDialogRef<ApplyRoomComponent>,@Inject(MD_DIALOG_DATA) public data:roomAllocation,
  private toastyService:ToastyService, private toastyConfig: ToastyConfig,private service:RoomAllocationService) {
    this.toastyConfig.theme='material';
   }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(null);
  }

  checkAvailability(){
    if(this.allocationDate==null){
      this.toastyService.error({
        title: "Warning!",
        msg: "Date can not be empty or must be valid",
        showClose: true,
        timeout: 3000,
        theme: "default"
    });
    }else if(this.GetDay(this.allocationDate.getDay())!=this.data.dayName.toLowerCase()){
      this.toastyService.error({
        title: "Warning!",
        msg: "Day is not match with Date. Please try again",
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
    }
    else{
      this.service.checkAvailabilty({roomNo:this.data.roomNo,timeSlot:this.data.timeSlot,date:this.allocationDate}).subscribe(result=>{
        this.dialogRef.close({roomNo:this.data.roomNo,timeSlot:this.data.timeSlot,date:this.allocationDate});
      },errorResult=>{
        this.toastyService.warning({
          title: "Warning!",
          msg: JSON.parse(errorResult._body).Message,
          showClose: true,
          timeout: 3000,
          theme: "default"
        });
      });
    }
  }

  GetDay(dayNumber:number){
    if(dayNumber==0)
        return "sunday";
    else if(dayNumber==1)
        return "monday";
    else if(dayNumber==2)
    return "tuesday";
    else if(dayNumber==3)
    return "wednesday";
    else if(dayNumber==4)
    return "thusday";
    else if(dayNumber==5)
    return "friday";
    else if(dayNumber==6)
        return "saturday";
  }

}

export class roomAllocation{
  timeSlot:string;
  dayName:string;
  date:Date;
  roomNo:string;
}
