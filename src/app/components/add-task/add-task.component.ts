import { Component ,Output,EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs'
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
@Output() newTask =new EventEmitter()
  text:string="";
  day:string="";
  reminder:boolean=false;
  showAddTask:boolean=false;
  showUpdateTask:boolean=false;

  subscription:Subscription=new Subscription;

  constructor(private uiService:UiService){
    this.uiService.onToggleAdd().subscribe(
      value=>{
        this.showAddTask=value;
        // console.log("add"+this.showAddTask)
      }
    )
    this.uiService.onToggleUpdate().subscribe(
      value=>{
        this.showUpdateTask=value;
        // console.log("up"+this.showUpdateTask)
      }
    )
  }
  onSubmitForm(){
  if (!this.text){
    alert('please add a task!');
    return;
  }
  if(!this.day){
    alert('Please enter day & time')
  }
  const newTask={
    text: this.text,
    day:this.day,
    reminder:this.reminder
  }
  this.newTask.emit(newTask)
  
  this.text="";
  this.day="";
  this.reminder=false;


  }
}
