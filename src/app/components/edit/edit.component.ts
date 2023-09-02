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

  // When the submit button of the form is pressed, the updateProject method is called, 
  // to make a request by post to the api and update a project
  onSubmit(form: any){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project){
          
          // Upload the image, image was chosen in the select file button
          if(this.filesToUpload.length >= 1){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              
              // Save the project object in the save_project variable, to have the information available to display on the edit project page
              this.save_project = result.project;

              this.status = 'success'; // Project updated
            });
          }else{ // No image was chosen in the select file button
            this.save_project = response.project;
            this.status = 'success';
          }
        }else{
          this.status = 'failed'; // Project not updated
        }
      },
      error => {
        console.log(<any>error); // Error message, project not updated
      }
    );
  }

  // Event (change) to grab all the data from the files, when there is a change in an input  
  // File {name: 'image-name.jpg', lastModified, lastModifiedDate, size: 121453, etc}
  fileChangeEvent(fileInput: any){
    
    // All the files we select with the input
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
