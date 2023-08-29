// Its functionality is to interact directly with an external server or rest service

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Use ajax requests
import { Observable } from "rxjs";
import { Project } from '../models/project'; // Database project model
import { Global } from "./global"; // Global configuration file

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url; // api url
    }

    testService(){
        return 'Testing the Angular service';
    }

    // Method to save a project in the database
    saveProject(project: Project): Observable<any>{

        // The data from the project object, and it is converted to a JSON string so that the api can read it
        let params = JSON.stringify(project);
        
        // Headers: the information is sent as JSON format
        let headers = new HttpHeaders().set('Content-Type','application/json');

        // The post method is used, and the url of the api to save a project in the backend
        return this._http.post(this.url+'save-project', params, {headers: headers});
    }

    // Get all the projects from the database
    getProjects(): Observable<any>{
        
        // Headers: the information is sent as JSON format
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // The get method is used, to get all projects
        return this._http.get(this.url+'projects', {headers: headers});
    }

    // Returns a project from the database, specified by the id parameter, to display its information on the details page
    getProject(id:any): Observable<any>{

        // Headers: the information is sent as JSON format
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Returns a project from the database
        return this._http.get(this.url+'project/'+id, {headers: headers});
    }
}