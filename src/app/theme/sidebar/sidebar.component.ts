import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth-providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private OAuth:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.OAuth.logout();
    location.reload();
  }

}
