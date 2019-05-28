import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public title: String;
  public status: String;
  public reporter: String;
  public description: String;
  // public comments: String;

  constructor() { }

  ngOnInit() {
  }

  createUser = () => {
    let createIssue = {
      title: this.title,
      status: this.status,
      reporter: this.reporter,
      description: this.description,
      // comments: this.comments
    }
  }
}
