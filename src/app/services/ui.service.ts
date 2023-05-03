import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask:boolean=false;
  private showUpdateTask:boolean=false;
  private subject =new Subject<any>
  private subjectUpdate =new Subject<any>


  constructor() { }

  toggleAddTask():void{
    this.showAddTask=!this.showAddTask;
    this.subject.next(this.showAddTask)
  }
  toggleUpdateTask():void{
    this.showUpdateTask=!this.showUpdateTask;
    this.subjectUpdate.next(this.showUpdateTask)
  }
  onToggleAdd():Observable<any>{
    return this.subject.asObservable();
  }
  onToggleUpdate():Observable<any>{
    return this.subjectUpdate.asObservable();
  }
}
