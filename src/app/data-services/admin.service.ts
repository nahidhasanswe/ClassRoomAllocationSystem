import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from '../auth-providers/http.service';
import {ServerBasePath} from './../auth-providers/server-base-path';

@Injectable()
export class AdminService {
    private serverPath=ServerBasePath.serverPath;

    constructor(public http:Http, private myHttp:HttpService) { 
    }

    getPendingList(){
      return this.myHttp.get(this.serverPath + '/api/Admin/Activity/GetPendingList').
      map(result=>result.json());
    }

    getTeacherList(){
      return this.myHttp.get(this.serverPath + '/api/Admin/Activity/GetTeacher').
      map(result=>result.json());
    }

    

    acceptRoomAllocation(data){
      return this.myHttp.post(this.serverPath + '/api/Admin/Operation/AcceptAllocation',data).
      map(result => result.json());
    }

    rejectRoomAllocation(id){
      return this.myHttp.get(this.serverPath + '/api/Admin/Operation/RejectAllocation/'+id).
      map(result => result.json());
    }
    
}
