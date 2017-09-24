import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from '../auth-providers/http.service';
import {ServerBasePath} from './../auth-providers/server-base-path';


@Injectable()
export class ClassRoomManagermentService {

  private serverPath=ServerBasePath.serverPath;
  
    constructor(public http:Http, private myHttp:HttpService) { 
    }

    getRoomAllocationList(){
      return this.myHttp.get(this.serverPath + '/api/RoomAllocation/Activity/GetByIndividual').
      map(result=>result.json());
    }

    getRoomCancellationList(){
      return this.myHttp.get(this.serverPath + '/api/RoomCancellation/Activity/GetByIndividual').
      map(result=>result.json());
    }

    removeRoomAllocation(id){
      return this.myHttp.get(this.serverPath + '/api/RoomAllocation/Remove/'+id).
      map(result=>result.json());
    }

    removeRoomCancellation(data){
      return this.myHttp.post(this.serverPath + '/api/RoomCancellation/Remove',data).
      map(result=>result.json());
    }

}
