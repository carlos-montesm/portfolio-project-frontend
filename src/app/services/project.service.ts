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
}