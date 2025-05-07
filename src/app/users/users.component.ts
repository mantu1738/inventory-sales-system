import { Component } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
})

export class UsersComponent {
  constructor() {}
  ngOnInit() {
    console.log("Users component initialized");
  }
}
