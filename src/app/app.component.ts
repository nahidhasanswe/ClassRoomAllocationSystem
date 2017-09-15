import { Component } from '@angular/core';
import {AuthService} from './auth-providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged:boolean;
  
    constructor(private auth:AuthService){
      this.isLogged=this.auth.checkLogged();
    }
}
