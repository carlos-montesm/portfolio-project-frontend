import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project'; // Database project model
import { ProjectService } from 'src/app/services/project.service'; // Service to get all projects from the database
import { Global } from 'src/app/services/global'; // Global configuration file

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[]; // All the projects from the database
  public url: string; // api url

  constructor(
    private _projectService: ProjectService // Project service to make a request to the API
  ){
    this.projects = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    // Before the component is displayed on the view, 
    // this method is called to fetch all the projects from the database
    this.getProjects();
  }

  // Method is called to fetch all the projects from the database
  getProjects(){
    // We call the getProjects() method of the service to fetch all the projects from the database
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){ // If we get the projects from the database
          this.projects = response.projects;
        }
      },
      error => {
        console.log(<any>error); // Error message
      }
    );
  }

}
