import { Component, OnInit,Inject } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {RoomCancellationService} from '../../data-services/room-cancellation.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import * as moment from "moment";

@Component({
  selector: 'app-apply-room-cancel',
  templateUrl: './apply-room-cancel.component.html',
  styleUrls: ['./apply-room-cancel.component.css']
})
export class ApplyRoomCancelComponent implements OnInit {

  public roomInfo:any;
  public formdata;

  constructor(private dialogRef:MdDialogRef<ApplyRoomCancelComponent>,@Inject(MD_DIALOG_DATA) public data:any, public service:RoomCancellationService,
  private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    toastyConfig.theme='material';
    this.roomInfo=data;
  }
  
  ngOnInit() {
    this.formdata=new FormGroup({
      RoomNo: new FormControl({value:this.roomInfo.roomNo,disabled:true},Validators.required),
      Date:new FormControl({value:moment(this.roomInfo.date).format('DD-MM-YYYY'),disabled:true},Validators.required),
      TimeSlot: new FormControl({value:this.roomInfo.timeSlot,disabled:true},Validators.required),
      Reason:new FormControl(""),
      CourseCode: new FormControl({value:this.roomInfo.courseCode,disabled:true},Validators.required),
      TeachersInitial:new FormControl("")
    })
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  saveRoomCancellation(data,valid){
    data.Date=this.roomInfo.date;
    data.RoomNo=this.roomInfo.roomNo;
    data.TimeSlot=this.roomInfo.timeSlot;
    data.CourseCode = this.roomInfo.courseCode;

    if(valid){
      this.service.saveRoomCancellation(data).subscribe(response=>{
        this.toastyService.success({
          title: "Successful",
          msg: "Successufully room is canceled",
          showClose: true,
          timeout: 5000,
          theme: "default"
      });
      this.closeDialog();
    },error=>{
        this.toastyService.error({
          title: "Error",
          msg: JSON.parse(error._body).Message,
          showClose: true,
          timeout: 5000,
          theme: "default"
      });
    })
    }
  }


}
