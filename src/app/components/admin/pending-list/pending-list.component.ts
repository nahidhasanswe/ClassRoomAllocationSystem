import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../data-services/admin.service';
import { DatePipe } from '@angular/common';
import { MdDialog} from '@angular/material';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import { Router } from '@angular/router';

import { ViewAllocationComponent } from '../../../dialog-components/admin/view-allocation/view-allocation.component';

import { ConfirmDialogComponent } from '../../../dialog-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {

  public pendingList:any;

  constructor(private service: AdminService, private dialog: MdDialog,  private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig, private route:Router) {
      this.toastyConfig.theme='material';
  }


  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.service.getPendingList().subscribe(result => {
        this.pendingList = result;
    });
  }

  ViewAllocationDetails(data){
    let daialogRef = this.dialog.open(ViewAllocationComponent,{
      data: data,
      width: '500px'
    });

    daialogRef.afterClosed().subscribe(result => {
      if(result)
        this.loadData();
    });
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
          this.loadData();
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
          this.loadData();
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
