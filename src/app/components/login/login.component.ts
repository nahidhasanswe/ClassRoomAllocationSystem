import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {Router} from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {AuthService} from '../../auth-providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formdata;

  public options = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 100,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: false
};

  constructor(private auth:AuthService,private toastyService:ToastyService, private toastyConfig: ToastyConfig, private route:Router) { 
    this.toastyConfig.theme='material';
    if(this.auth.checkLogged()){
      this.route.navigate(['/routine']);
    }
  }

  ngOnInit() {
    this.formdata=new FormGroup({
      username: new FormControl("",Validators.required),
      password:new FormControl("",Validators.required)
    })
  }

  loginSystem(data,valid){
    if(valid){
        this.auth.login(data).subscribe(response=>{
          this.toastyService.success({
            title: "Login Successful",
            msg: "You are welcome",
            showClose: true,
            timeout: 2000,
            theme: "default"
        });
          location.reload();
        },error=>{
          this.toastyService.error({
            title: "Login Failed!",
            msg: error.json().error_description,
            showClose: true,
            timeout: 5000,
            theme: "default"
        });
      })
    }
}

logout(){
  this.auth.logout();
  location.reload();
}

}
