import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service'; // Service to save projects in the database
import { UploadService } from 'src/app/services/upload.service'; // Service to save/upload images on the server
import { Global } from 'src/app/services/global'; // Global configuration file, api url

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ){
    this.title = "Create project";
    this.project = new Project('','','','',0,'','');
    this.status = "";
    this.filesToUpload = [];
    this.url = Global.url;
  }

  ngOnInit() {
  }

  // When the submit button of the form is pressed, the saveProject method is called, 
  // to make a request by post to the api and save a project
  onSubmit(form: any){
    //console.log(this.project);
    
    // saveProject method
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          
          // Upload the image
          if(this.filesToUpload.length >= 1){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              
              //console.log(result);
              // Save the project object in the save_project variable, to have the information available to display on the project details page
              this.save_project = result.project;

              this.status = 'success'; // Project created
              form.reset(); // Empty all form fields
            });
          }else{
            this.save_project = response.project;
            this.status = 'success';
            form.reset();
          }
        }else{
          this.status = 'failed'; // Project not created
        }
      },
      error => {
        console.log(<any>error); // Error
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
