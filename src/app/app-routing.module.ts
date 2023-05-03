import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { AboutComponent } from './components/about/about.component';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes:Routes=[
  {
    path:'' ,component:TasksComponent
  },
  
  {
    path:'about' , component:AboutComponent
  },
  {
    path:'auth',component:AuthComponent
  }
  
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
