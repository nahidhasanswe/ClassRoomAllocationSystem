import { Component, OnInit } from '@angular/core';
import {ClassRoomManagermentService} from '../../data-services/class-room-managerment.service';
import { MdDialog} from '@angular/material';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {ConfirmDialogComponent} from '../../dialog-components/confirm-dialog/confirm-dialog.component';
import {ToastyService, ToastyConfig} from 'ng2-toasty';



@Component({
  selector: 'app-room-allocation-list',
  templateUrl: './room-allocation-list.component.html',
  styleUrls: ['./room-allocation-list.component.css']
})
export class RoomAllocationListComponent implements OnInit {

  public AllocationList:any;

  constructor(private _service:ClassRoomManagermentService, private _dialog:MdDialog,
    private toastyService:ToastyService,private toastyConfig:ToastyConfig , private route: Router) { 
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
        cancel:'No'
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
