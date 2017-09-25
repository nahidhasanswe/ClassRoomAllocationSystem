import { Component, OnInit } from '@angular/core';
import {AdminService } from '../../../data-services/admin.service';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  public formdata;
  public Admin:string='Admin';
  public Teacher:string='Teacher';
  
  constructor(private service: AdminService, private dialogRef:MdDialogRef<AddTeacherComponent>,
    private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
      toastyConfig.theme='material';

   }

  ngOnInit() {
    this.formdata=new FormGroup({
      TeachersInitial: new FormControl('',Validators.required),
      TeacherFullName:new FormControl('',Validators.required),
      Email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')]),
      Role:new FormControl('',Validators.required)
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
