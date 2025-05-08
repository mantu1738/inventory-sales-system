import { Component } from "@angular/core";
import { ItemService } from "../../core/services/item.service";
import { Item } from "../../core/models/item.model";
import { CommonModule } from "@angular/common";
import { BsModalService } from "ngx-bootstrap/modal";
import { ItemActionComponent } from "./item-action/item-action.component";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";
import { AlertService } from "../components/alert/alert.service";

@Component({
  selector: "app-items",
  imports: [CommonModule, SpinnerLoaderComponent],
  templateUrl: "./items.component.html",
})

export class ItemsComponent {

  items: Item[] = [];
  isLoading =true;

  constructor(private itemService:ItemService,
    private modalService:BsModalService,
    private alertService:AlertService
  ) {}
  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.isLoading=true;
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.isLoading=false;
    });
  }

  onAdd() {
    this.modalService.show(ItemActionComponent, {
      class: 'modal-dialog modal-xl modal-dialog-centered',
    }).onHidden?.subscribe(() => {
      this.getItems();
    });
  }

  onEdit(item: Item) {
    this.modalService.show(ItemActionComponent, {
      class: 'modal-dialog modal-xl modal-dialog-centered',
      initialState: {
        isEditMode: true,
        item: item,
      },
    }).onHidden?.subscribe(() => {
      this.getItems();
    });;

  }

  onDelete(item: Item) {
    this.itemService.deleteItem(item.id).subscribe(() => {
      this.alertService.showWarning("Item deleted successfully");
      this.getItems();
    });

  }
}
