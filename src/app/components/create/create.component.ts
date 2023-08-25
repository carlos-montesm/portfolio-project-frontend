import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;

  constructor(
    private _projectService: ProjectService
  ){
    this.title = "Create project";
    this.project = new Project('','','','',0,'','');
  }

  ngOnInit(): void {
  }

  // When the submit button of the form is pressed, the saveProject method is called, 
  // to make a request by post to the api and save a project
  onSubmit(form: any){
    console.log(this.project);
    
    // saveProject method
    this._projectService.saveProject(this.project).subscribe(
      response => {
        console.log(response); // Response successful
      },
      error => {
        console.log(<any>error); // Error
      }
    );
  }

}
