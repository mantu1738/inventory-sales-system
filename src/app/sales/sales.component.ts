import { Component } from "@angular/core";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
})

export class SalesComponent {
  constructor() {}
  ngOnInit() {
    console.log("Sales component initialized");
  }
}
