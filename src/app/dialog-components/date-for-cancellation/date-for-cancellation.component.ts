import { Component, OnInit ,Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import {RoomCancellationService} from '../../data-services/room-cancellation.service';
import * as moment from "moment";

@Component({
  selector: 'app-date-for-cancellation',
  templateUrl: './date-for-cancellation.component.html',
  styleUrls: ['./date-for-cancellation.component.css']
})
export class DateForCancellationComponent implements OnInit {

  public cancellationDate: Date;
  public room:roomCancellation;

  constructor(private dialogRef:MdDialogRef<DateForCancellationComponent>,@Inject(MD_DIALOG_DATA) public data:roomCancellation,
  private toastyService:ToastyService, private toastyConfig: ToastyConfig,private service:RoomCancellationService) {
    this.toastyConfig.theme='material';
   }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }


  checkAvailability(){
    if(this.cancellationDate==null){
      this.toastyService.error({
        title: "Warning!",
        msg: "Date can not be empty or must be valid",
        showClose: true,
        timeout: 3000,
        theme: "default"
    });
    }else if(this.GetDay(this.cancellationDate.getDay())!=this.data.DayName.toLowerCase()){
      this.toastyService.error({
        title: "Warning!",
        msg: "Day is not match with Date. Please try again",
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    }else if(moment().isAfter(this.cancellationDate,'day')){
      this.toastyService.error({
        title: "Warning!",
        msg: "Date must be today or next days",
        showClose: true,
        timeout: 3000,
        theme: "default"
      });
    }
    else{
      this.service.checkAvailabilty({roomNo:this.data.RoomNo,timeSlot:this.data.TimeSlot,date:this.cancellationDate}).subscribe(result=>{
        this.dialogRef.close({roomNo:this.data.RoomNo,timeSlot:this.data.TimeSlot,date:this.cancellationDate,courseCode: this.data.CourseCode});
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

export class roomCancellation{
  TimeSlot:string;
  DayName:string;
  Date:Date;
  RoomNo:string;
  CourseCode: string;
}
