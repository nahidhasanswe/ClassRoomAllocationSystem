import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpService} from '../auth-providers/http.service';
import {ServerBasePath} from './../auth-providers/server-base-path';

@Injectable()
export class RoutineService {

  private serverPath=ServerBasePath.serverPath;
  
    constructor(public http:Http, private myHttp:HttpService) { }
  
    // getAllPosts(){
    //   return this.http.get('https://jsonplaceholder.typicode.com/posts').
    //   map(result => result.json());
    // }
  
    // getAllPhotos(){
    //   return this.http.get('https://jsonplaceholder.typicode.com/photos').
    //   map(result => result.json());
    // }
  
    // getEmployeeList(){
    //   return this.myHttp.get(this.serverPath + '/api/Activities/GetEmployeeList').
    //   map(result=>result.json());
    // }

    getRoutine(){
      return this.myHttp.get(this.serverPath + '/api/Routine/Activity/GetFullRoutine').
      map(result=>result.json());
    }

    getEmptyClassRoom(data){
      return this.myHttp.post(this.serverPath + '/api/Routine/Activity/GetEmptyClassroom',data).
      map(result=>result.json());
    }

    getIndividualRoutine(){
      return this.myHttp.get(this.serverPath+'/api/Routine/Activity/GetRoutineByTeacher').
      map(result=>result.json());
    }

}
