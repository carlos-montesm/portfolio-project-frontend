import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service'; // Service to save projects in the database
import { UploadService } from 'src/app/services/upload.service'; // Service to save/upload images on the server
import { Global } from 'src/app/services/global'; // Global configuration file, api url
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html', // This reuses the create.component template for a project's edit template
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.title = "Edit project";
    this.project = new Project('','','','',0,'','');
    this.status = "";
    this.filesToUpload = [];
    this.url = Global.url;
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

  
}
