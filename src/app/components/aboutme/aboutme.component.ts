import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  /* This is the title, subtitle and email of the 
  about me page, which shows my name, job and email */
  public title: string;
  public subtitle: string;
  public email: string;

  constructor(){
    this.title = "Carlos Montes";
    this.subtitle = "Freelancer Frontend Developer";
    this.email = "test-email@test.com";
  }

  ngOnInit(): void {
  }
}
