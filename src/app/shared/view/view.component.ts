import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public title: String = "sample";
  public status: String;
  public reporter: String;
  public description: String;
  public comments: String;

  constructor() { }

  ngOnInit() {
  }
  editform = () => {
    let editedValue = {
      title: this.title,
      status: this.status,
      reporter: this.reporter,
      description: this.description,
      comments: this.comments
    }
  }
}
