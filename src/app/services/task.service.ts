import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  Subscription,  map, tap } from 'rxjs';
import { Task } from '../Task';
import { AuthService } from './auth.service';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  tasks: Task[] = []
  private userSub:Subscription = new Subscription;
  apiUrl:string="";
  

  constructor(private http:HttpClient,
    private authService:AuthService) {

    }
  ngOnInit(): void {
  }
  

   getTasks() {
    this.authService.user.subscribe(user=>{
      const newEmail=user.email.slice(0,(user.email.length-4))
      this.apiUrl="https://tasktracker-26918-default-rtdb.firebaseio.com/"+newEmail
    })
    // const tasks=of(TASKS) 
    // since TASKS is not an observable we use "of" to make it an observable
    //  we donot have to do it in case of http client 
    //  because it automatically passes an observable
    //  and we handle that by subscribing to the observable like we did in this case
      return  this.http.get<Task[]>(this.apiUrl+'.json'
        ).pipe(
        map(responseData=>{
          console.log(responseData)
          const postArray=[];
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postArray.push({ ...responseData[key], id :key });
            }
          }
          console.log(postArray)
          return postArray
        }),tap(tasks=>{this.tasks=tasks})
    )
    
  }

  deleteTask(task:Task):Observable<Task>{
    const url= this.apiUrl+'/'+task.id+'.json';
    return this.http.delete<Task>(url);
  }


  updateTask(newTask:Task,oldTask:Task):Observable<Task>{
    console.log(oldTask.id)
    const url= this.apiUrl+'/'+oldTask.id+'.json';
        return this.http.put<Task>(url,newTask,httpOptions)
  }
  addTask(task:Task):Observable<Task>{
 
     return this.http.post<Task>(this.apiUrl+'.json',task) 
  }

}


