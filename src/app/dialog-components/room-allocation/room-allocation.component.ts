import { Component, OnInit,Inject } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {RoomAllocationService} from '../../data-services/room-allocation.service';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import * as moment from "moment";

@Component({
  selector: 'app-room-allocation',
  templateUrl: './room-allocation.component.html',
  styleUrls: ['./room-allocation.component.css']
})
export class RoomAllocationComponent implements OnInit {

  public roomInfo:any;
  public formdata;

  constructor(private dialogRef:MdDialogRef<RoomAllocationComponent>,@Inject(MD_DIALOG_DATA) public data:any, public service:RoomAllocationService,
  private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.roomInfo=data;
  }
  
  ngOnInit() {
    this.formdata=new FormGroup({
      RoomNo: new FormControl({value:this.roomInfo.roomNo,disabled:true},Validators.required),
      Date:new FormControl({value:moment(this.roomInfo.date).format('DD-MM-YYYY'),disabled:true},Validators.required),
      TimeSlot: new FormControl({value:this.roomInfo.timeSlot,disabled:true},Validators.required),
      Reason:new FormControl(""),
      CourseCode: new FormControl("",Validators.required),
      TeachersInitial:new FormControl(""),
      isAccept:new FormControl(false)
    })
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  saveRoomAllocation(data,valid){
    data.Date=this.roomInfo.date;
    data.RoomNo=this.roomInfo.roomNo
    data.TimeSlot=this.roomInfo.timeSlot

    if(valid){
      this.service.saveRoomAllocation(data).subscribe(response=>{
        this.toastyService.success({
          title: "Successful",
          msg: "Request is successfully submitted",
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
