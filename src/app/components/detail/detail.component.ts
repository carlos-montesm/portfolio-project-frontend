import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project'; // Database project model
import { ProjectService } from 'src/app/services/project.service'; // Service to get all projects from the database
import { Global } from 'src/app/services/global'; // Global configuration file
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string; // api url
  public project: Project;

  // True displays a confirmation message to delete a project, 
  // false removes it to delete nothing
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;
    this.project = new Project('','','','',0,'','');
    this.confirm = false;
  }

  ngOnInit() {
    // _route service that provides information about the route, from where the id is obtained, which is passed through the url
    this._route.params.subscribe(params => {
      
      // The id is obtained by the parameter of the url
      let id = params['id'];

      // Returns a project object with the specified id
      this.getProject(id);
    });
  }

  // Returns a project object with the specified id, to display its information in the detail view
  getProject(id:any){
    
    // Service that makes the http request for get, which returns the project
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project; // A project
      },
      error => {
        console.log(<any>error); // Error message
      });
  }

  // Confirm if you want to delete a project
  setConfirm(confirm:boolean){
    this.confirm = confirm;
  }

  // Calls the deleteProject method of the service (project.service.ts) that interacts with the api, to delete a project
  deleteProject(id:any){
    
    // Calls the deleteProject method of the service
    this._projectService.deleteProject(id).subscribe(
      response => {
        if(response.project){ // If the project exists
          this._router.navigate(['/projects']); // Redirects to projects page, deleted project
        }
      },
      error => {
        console.log(<any>error); // Error message
      }
    );
  }

}
