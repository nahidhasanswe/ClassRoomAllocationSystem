import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../data-services/admin.service';
import { DatePipe } from '@angular/common';
import { MdDialog} from '@angular/material';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../../../dialog-components/confirm-dialog/confirm-dialog.component';
import { AddTeacherComponent } from '../../../dialog-components/admin/add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from '../../../dialog-components/admin/update-teacher/update-teacher.component';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  public teacherList:any;
  constructor(private service: AdminService, private dialog: MdDialog,  private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig, private route:Router) {
      this.toastyConfig.theme='material';
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.service.getTeacherList().subscribe(result => {
        this.teacherList = result;
    });
  }

  AddTeacher(){
    let dialogRef = this.dialog.open(AddTeacherComponent,{
      width: '400px'
    })
  }

}
