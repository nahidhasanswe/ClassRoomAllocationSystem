import { Component, OnInit ,Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA,MdDialog} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public model:model;

  constructor(private _dialogRef:MdDialogRef<ConfirmDialogComponent>, @Inject(MD_DIALOG_DATA)private data:any) {
      this.model=data;
   }

  ngOnInit() {
  }

  confirm(){
    this._dialogRef.close(true);
  }

  close(){
    this._dialogRef.close(false);
  }

}

interface model{
  title:string;
  text:string;
  cancel:string;
  confirm:string;
}
