import { Component, OnInit, Inject } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import {AdminService} from '../../../data-services/admin.service';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from '../../../dialog-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-allocation',
  templateUrl: './view-allocation.component.html',
  styleUrls: ['./view-allocation.component.css']
})
export class ViewAllocationComponent implements OnInit {

  public allocationDetails: any;

  constructor(private dialogRef:MdDialogRef<ViewAllocationComponent>,@Inject(MD_DIALOG_DATA) public data:any, public service:AdminService,
  private toastyService:ToastyService, private toastyConfig: ToastyConfig, private dialog: MdDialog) { 
      toastyConfig.theme='material';
      this.allocationDetails= data;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  confirmAccept(data){
    let dialogREF = this.dialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Are you sure?',
        text: 'Are you sure to accept the request?',
        confirm: 'OK',
        cancel: 'NO'
      }
    });

    dialogREF.afterClosed().subscribe( result =>{
      if(result){
        var UpdateData={
          Id : data.Id,
          RoomNo : data.RoomNo,
          TimeSlot : data.TimeSlot,
          Reason : data.Reason,
          Date : data.Date,
          Submitted_Date : data.Submited_Date,
          TeachersInitial: data.TeachersInitital,
          CourseCode : data.CourseCode
        };
        this.service.acceptRoomAllocation(UpdateData).subscribe(result=>{
          this.toastyService.success({
            title: "Successful",
            msg: result,
            showClose: true,
            timeout: 5000,
            theme: "default"
          });
          this.dialogRef.close(true);
        }, error => {
          this.toastyService.error({
            title: "Error",
            msg: JSON.parse(error._body).Message,
            showClose: true,
            timeout: 5000,
            theme: "default"
          });
        });
      }
    });
  }

  confirmReject(id){
    let dialogREF = this.dialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Are you sure?',
        text: 'Are you sure to reject the request?',
        confirm: 'OK',
        cancel: 'NO'
      }
    });

    dialogREF.afterClosed().subscribe( result =>{
      if(result){
        this.service.rejectRoomAllocation(id).subscribe(result=>{
          this.toastyService.success({
            title: "Successful",
            msg: result,
            showClose: true,
            timeout: 5000,
            theme: "default"
          });
          this.dialogRef.close(true);
        }, error => {
          this.toastyService.error({
            title: "Error",
            msg: JSON.parse(error._body).Message,
            showClose: true,
            timeout: 5000,
            theme: "default"
          });
        });
      }
    });
  }
}
