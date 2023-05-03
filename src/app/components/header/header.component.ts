import { Component,OnDestroy,OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import {Subscription} from 'rxjs'
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  currentRoute:string="";
  title :string= 'Task Tracker';
  showAddTask:boolean=false;
  showUpdateTask:boolean=false;
  isAuthenticated:boolean=false;


  subscription: Subscription = new Subscription;
  private userSub:Subscription = new Subscription;

  constructor(private router:Router,
    private uiService:UiService,
    private taskService:TaskService,
    private authService:AuthService){
    this.subscription=this.uiService.onToggleAdd().subscribe(
      value=>{
        this.showAddTask=value;
      }
    )
    this.subscription=this.uiService.onToggleUpdate().subscribe(
      value=>{
        this.showUpdateTask=value;
        // console.log("up"+this.showUpdateTask)
      }
    )
  }
  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(
      user=>{
          // console.log(user)
          if (user._token == ""){
            this.isAuthenticated=false
            this.router.navigate(['/auth'])
          }
          else{
            this.isAuthenticated=true
            this.router.navigate(['/'])
          }
          // this.isAuthenticated=user? true : false;
          //aslo we can write !!user , it means the same 
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  toggleAddTask(){
    this.uiService.toggleAddTask()
    // this.uiService.toggleUpdateTask()

  
  }

  hasRoute(router:string){
    // console.log(this.router.url)
    return this.router.url===router;
    
  }
  toggleUpdateTask(){
      this.uiService.toggleUpdateTask()


  }
  onFetchTasks(){
    this.taskService.getTasks()
  }

logout(){
  this.authService.logout();
}

}
