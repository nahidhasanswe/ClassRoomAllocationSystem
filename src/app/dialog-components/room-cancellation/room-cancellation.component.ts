import { Component, OnInit } from '@angular/core';
import {ClassRoomManagermentService} from '../../data-services/class-room-managerment.service';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-room-cancellation',
  templateUrl: './room-cancellation.component.html',
  styleUrls: ['./room-cancellation.component.css']
})
export class RoomCancellationComponent implements OnInit {

  public CancellationList:any;

  constructor(private _service:ClassRoomManagermentService,private dialogRef:MdDialogRef<RoomCancellationComponent>) { 
    _service.getRoomCancellationList().subscribe(result=>{
      this.CancellationList=result;
    })
  }

  ngOnInit() {
  }



}
