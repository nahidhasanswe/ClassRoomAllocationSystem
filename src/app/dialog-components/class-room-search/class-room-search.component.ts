import { Component, OnInit ,Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA,MdDialog} from '@angular/material';
import {RoomAllocationComponent} from '../../dialog-components/room-allocation/room-allocation.component';

@Component({
  selector: 'app-class-room-search',
  templateUrl: './class-room-search.component.html',
  styleUrls: ['./class-room-search.component.css']
})
export class ClassRoomSearchComponent implements OnInit {

  public ModifyRoutine:any;

  constructor(private dialogRef:MdDialogRef<ClassRoomSearchComponent>,@Inject(MD_DIALOG_DATA) public data:any,private dialog:MdDialog) { 
    this.ModifyRoutine=data.Routine;
  }
  
    ngOnInit() {
    }
  
    closeDialog(){
      this.dialogRef.close();
    }

    applyRoom(dayName,timeSlot,roomNO){
      let dialogRef=this.dialog.open(RoomAllocationComponent,{
        width:'400px',
        data: {dayName:dayName,timeSlot:timeSlot,date:this.data.Date,roomNo:roomNO}
      })
  
      dialogRef.afterClosed().subscribe(result=>{
        if(result!=null){
         
        }
      })
    }


}
