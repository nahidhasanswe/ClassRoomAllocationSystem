import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from '../auth-providers/http.service';
import {ServerBasePath} from './../auth-providers/server-base-path';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoomAllocationService {

  private serverPath=ServerBasePath.serverPath;
  
    constructor(public http:Http, private myHttp:HttpService) { }
  
    // getAllPosts(){
    //   return this.http.get('https://jsonplaceholder.typicode.com/posts').
    //   map(result => result.json());
    // }
  
   
  
    checkAvailabilty(data){
      return this.myHttp.post(this.serverPath + '/api/RoomAllocation/Activity/CheckAvailability',data).
      map(result=>result);
    }

    saveRoomAllocation(data){
      return this.myHttp.post(this.serverPath+'/api/RoomAllocation/Add',data).
      map(result=>result);
    }
    
}
