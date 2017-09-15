import * as alasql from 'alasql';

export class RoutineModify {
    public ModifyRoutine:ModifyRoutine[];
    public GroupByTime:GroupTime;
    public GroupTimeClass:Classes[];
    public DistinctTimeSlot:DistinctTimeSlot[];
    public singleDayRoutine:ModifyRoutine;

    CreateRoutine(Data:Routine[]){
      var ModifyRoutine=[];
      Data.forEach(value=>{
          var singleDayRoutine={DayName:'',Id:'',Classes:[]};
          singleDayRoutine.DayName=value.DayName;
          singleDayRoutine.Id=value.Id;
          var DistinctTimeSlot=[];
          DistinctTimeSlot=this.GetDistinctTimeSlot(value.Classes);
          
          DistinctTimeSlot.forEach(val=>{
            var GroupByTime={TimeSlot:'',ClassGroup:null};
            GroupByTime.TimeSlot=val.TimeSlot;
            GroupByTime.ClassGroup=this.GetGroupedClass(value.Classes,val.TimeSlot);
            singleDayRoutine.Classes.push(GroupByTime);
            
          })
  
          ModifyRoutine.push(singleDayRoutine);
          
      });

        return ModifyRoutine;
    }

    GetGroupedClass(data:TimeSlotClass[],timeSlot:string){
      var GroupTimeClass=alasql("SELECT RoomNo,CourseCode,isNoClass,TeachersInitial  FROM ? WHERE TimeSlot LIKE '"+timeSlot+"'",[data]);
      return GroupTimeClass;
    
    }
    
    GetDistinctTimeSlot(classes:TimeSlotClass[]){
      var result=alasql("SELECT TimeSlot FROM ? GROUP BY TimeSlot",[classes]);
       return result;
    }
}



export class Routine{
    Id:string;
    DayName:string;
    Classes:TimeSlotClass[];
  
  }
  export class TimeSlotClass{
    TimeSlot:string;
    RoomNo:string;
    CourseCode:string;
    isNoClass:Boolean;
    TeachersInitial:string;
  }
  
  export class DistinctTimeSlot{
    TimeSlot:string;
  }
  
  export class ModifyRoutine{
    Id:string;
    DayName:string;
    Classes:GroupTime[];
  }
  
  export class GroupTime{
    TimeSlot:string;
    ClassGroup:Classes[];
  }
  
  export class Classes{
    RoomNo:string;
    CourseCode:string;
    isNoClass:Boolean;
    TeachersInitial:string;
  }
  
