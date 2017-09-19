import { Component, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA,MdDialog} from '@angular/material';
import {RoutineService} from '../../data-services/routine.service';
import {RoutineModify} from '../../buisness-logic/routine-modify';

@Component({
  selector: 'app-my-routine',
  templateUrl: './my-routine.component.html',
  styleUrls: ['./my-routine.component.css'],
  providers:[RoutineModify]
})
export class MyRoutineComponent implements OnInit {

  private ModifyRoutine:any;

  constructor(private dialogRef:MdDialogRef<MyRoutineComponent>,private routine:RoutineService,private _routineModify:RoutineModify) {
    routine.getIndividualRoutine().subscribe(result=>{
      this.ModifyRoutine=_routineModify.CreateRoutine(result);
    })
  }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
