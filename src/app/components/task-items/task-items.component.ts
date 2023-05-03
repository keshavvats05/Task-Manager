import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-task-items',
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.css']
})
export class TaskItemsComponent {
  @Input() task:Task={
    text: '',
    day: '',
    reminder: false
  }
  constructor(private uiService:UiService){}
  @Output() deleteTask = new EventEmitter()
  @Output() updateTask = new EventEmitter()
  @Output() toggleReminder=new EventEmitter()

  faTimes=faTimes;
  faPenToSquare=faPenToSquare

  onDelete(task:Task){
    this.deleteTask.emit(task)
  }
  
  onToggle(task:Task){
    this.toggleReminder.emit(task)
  }
  onUpdate(task:Task){
    this.uiService.toggleUpdateTask();
    this.updateTask.emit(task)
    // console.log(task)
  }
  

}
