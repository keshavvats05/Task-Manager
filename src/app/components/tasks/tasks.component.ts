import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []
  changeDayTasks: Task = {
    text: '',
    day: '',
    reminder: false
  }
  newTask!: Task;
  currentTask!:Task;
  isUpdate:boolean=false
  constructor(private taskService:TaskService,
    private uiService:UiService){
    this.subscription=this.uiService.onToggleUpdate().subscribe(
      value=>{
        this.isUpdate=value;
      }
    )
  }
  subscription: Subscription = new Subscription;
  // subscription2: Subscription = new Subscription;
  // subscription3: Subscription = new Subscription;



  ngOnInit(): void {
   this.taskService.getTasks().subscribe(
    value=>{
      this.tasks=value;
      console.log(value)
      // console.log(this.tasks)
      // Date object
      const date = new Date();

      let currentDay= String(date.getDate()).padStart(2, '0');
      let currentMonth = String(date.getMonth()+1).padStart(2,"0");
      let currentYear = date.getFullYear();
      let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
      for (const currentTask of this.tasks){
        // console.log(task.day)
        if (currentTask.day == currentDate){
          // console.log(currentTask.id)
          this.changeDayTasks.day="Today";
          this.changeDayTasks.id=currentTask.id;
          this.changeDayTasks.reminder=currentTask.reminder;
          this.changeDayTasks.text=currentTask.text;
          this.taskService.updateTask(this.changeDayTasks,currentTask).subscribe(task=>{
            this.taskService.getTasks().subscribe(
              (tasks=>{
                this.tasks=tasks
              })
            )
          })

        }
       
      }
    
    }
   
  )
 
  }
  onDeleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe(()=>(
      this.tasks=this.tasks.filter((t)=> t.id !== task.id)
    )

    )
  }

  onToggle(task:Task){
  task.reminder=!task.reminder;
  console.log(task)
  this.taskService.updateTask(task,task).subscribe()
  }

  onAddTask(task:Task){
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    if (currentDate == task.day){
      task.day="Today";
    }
    // CODE FOR UPDATING TASK
    this.newTask=task;
    console.log(task)
    // console.log(this.newTask)
    if(this.isUpdate){


      this.taskService.updateTask(this.newTask,this.currentTask).subscribe(task=>{
        this.taskService.getTasks().subscribe(
          tasks=>{
            this.tasks=tasks
          }
        )
    })
    }
    // CODE FOR ADDING TASK
    if (!this.isUpdate){
     

      if (currentDate == task.day){
        task.day="Today";
      }
      // console.log(task)
 
      this.taskService.addTask(task).subscribe(()=>{
        this.taskService.getTasks().subscribe(
        value=>{
          this.tasks=value
          // console.log(this.tasks)
        }
        )
       
      })
    }
    
  } 
  onUpdateTask(task:Task){
    this.currentTask=task
  }
  

}
