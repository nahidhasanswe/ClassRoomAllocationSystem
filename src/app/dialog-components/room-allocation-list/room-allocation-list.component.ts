import { Component, OnInit } from '@angular/core';
import {ClassRoomManagermentService} from '../../data-services/class-room-managerment.service';
import {MdDialogRef, MdDialog} from '@angular/material';
import { DatePipe } from '@angular/common';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ToastyService, ToastyConfig} from 'ng2-toasty';



@Component({
  selector: 'app-room-allocation-list',
  templateUrl: './room-allocation-list.component.html',
  styleUrls: ['./room-allocation-list.component.css']
})
export class RoomAllocationListComponent implements OnInit {

  public AllocationList:any;

  constructor(private _service:ClassRoomManagermentService,private dialogRef:MdDialogRef<RoomAllocationListComponent>,private _dialog:MdDialog,
    private toastyService:ToastyService,private toastyConfig:ToastyConfig) { 
      toastyConfig.theme='material';
      _service.getRoomAllocationList().subscribe(result=>{
      this.AllocationList=result;
    })
  }

  ngOnInit() {
  }

  DeleteRoomAllocation(id){
    let _dialogRef=this._dialog.open(ConfirmDialogComponent,{
      width:'300px',
      data:{
        title:'Confirm',
        text:'Are you sure to remove Room Allocation?',
        confirm:'Yes',
        close:'No'
      },
      disableClose:true
    })

    _dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this._service.removeRoomAllocation(id).subscribe(res=>{
          this.toastyService.success({
            title: "Success",
            msg: "Successfully removed",
            showClose: true,
            timeout: 3000,
            theme: "default"
          });
          this._service.getRoomAllocationList().subscribe(result=>{
            this.AllocationList=result;
          })
        },error=>{
          this.toastyService.error({
            title: "Error!!",
            msg: "Internal Server Problem",
            showClose: true,
            timeout: 3000,
            theme: "default"
          });
        })
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
