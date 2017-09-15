import { Component, OnInit } from '@angular/core';
import {RoutineService} from '../../data-services/routine.service';
import * as alasql from 'alasql';
import {RoutineModify} from '../../buisness-logic/routine-modify';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
  providers:[RoutineModify]
})
export class RoutineComponent implements OnInit {
  
  public ModifyRoutine:any;

  constructor(private _routine:RoutineService,private _routtineModify:RoutineModify) { }

  ngOnInit() {
    this._routine.getRoutine().subscribe((result)=>{
      this.ModifyRoutine=this._routtineModify.CreateRoutine(result);
    });
  }
}


