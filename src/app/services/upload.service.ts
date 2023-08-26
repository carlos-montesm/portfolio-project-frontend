// Service that uploads images, which interacts with an external server 
// or rest service, for project images

import { Injectable } from "@angular/core";
import { Global } from "./global"; // Global configuration file, api url

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    // Makes an AJAX request to upload a file to the server
    // url: string => api url,  params: Array<string> => the data that is sent to the server
    // files: Array<File> => the file to send,  name: string => the file name
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        
        // We return a promise to wait for the result of the ajax request
        return new Promise(function(resolve, reject){
            
            var formData: any = new FormData(); // create a form on an object
            var xhr = new XMLHttpRequest(); // AJAX, asynchronous request object

            // We add to the formData all the files that we have attached, for later shipment
            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            // Check the status of the ajax request
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){

                        // If the result is positive, we will return the positive response
                        resolve(JSON.parse(xhr.response));
                    }else{
                        // Otherwise, it returns the error
                        reject(xhr.response);
                    }
                }
            }
            // We make the request by post to the url indicated
            xhr.open('POST', url, true);
            
            // We execute the ajax request
            xhr.send(formData);
        });
    }
    
}