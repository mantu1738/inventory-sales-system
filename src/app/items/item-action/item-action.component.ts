import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormBuilderComponent, FormFieldProperties } from "../../components/form-builder/form-builder.component";
import { FormBuilderService } from "../../components/form-builder/form-builder.service";
import { AddEditItemForm } from "../../../core/forms/add-item.form";
import { Item } from "../../../core/models/item.model";
import { ItemService } from "../../../core/services/item.service";
import {  BsModalService } from "ngx-bootstrap/modal";
import { SpinnerLoaderComponent } from "../../components/spinner-loader/spinner-loader.component";

@Component({
  selector: "app-item-action",
  templateUrl: "./item-action.component.html",
  imports:[CommonModule,ReactiveFormsModule,FormBuilderComponent,SpinnerLoaderComponent],
  providers:[FormBuilderService]
})

export class ItemActionComponent {
  itemForm!:FormGroup;
  addEditItemFormFields!:FormFieldProperties[];
  @Input() isEditMode: boolean = false;
  @Input() item?:Item;
  isLoading: boolean = false;

  constructor(private addItemForm:AddEditItemForm,
     private formBuilder:FormBuilderService,
     private fb: FormBuilder,
     private itemService:ItemService,
     private modalService:BsModalService
    )
    {
    this.addEditItemFormFields = this.addItemForm.getAddEditItemForm();
    this.itemForm = this.fb.group({});
    this.formBuilder.updateForm(this.addEditItemFormFields, this.itemForm);

  }
  ngOnInit() {
    if(this.isEditMode && this.item){
      this.itemForm.patchValue({
        itemId: this.item.id,
        itemName: this.item.name,
        itemDescription: this.item.description,
        itemCategory: this.item.category,
        itemPrice: this.item.price,
        itemStockQuantity: this.item.stockQuantity,
        itemReorderLevel: this.item.reorderLevel,
      });

      console.log(this.itemForm.value);
    }
  }

  onSubmit(){
    if(this.itemForm.invalid){
      this.itemForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload:Item = {
        id: this.itemForm.get('itemId')?.value,
        name: this.itemForm.get('itemName')?.value,
        description: this.itemForm.get('itemDescription')?.value,
        category: this.itemForm.get('itemCategory')?.value,
        price:  this.itemForm.get('itemPrice')?.value,
        stockQuantity:   this.itemForm.get('itemStockQuantity')?.value,
        reorderLevel: this.itemForm.get('itemReorderLevel')?.value,
    }

    console.log (payload);

    if(this.isEditMode && this.item){
      this.itemService.updateItem(this.item.id, payload).subscribe(() => {
        // this.alertService.show('Item Updated Sucessfully', 'success');
        this.modalService.hide();
        this.isLoading=false;
      });
      return;
    }

    this.itemService.createItem(payload).subscribe(() => {
      // this.alertService.show('Item Added Sucessfully', 'success');
      this.modalService.hide();
      this.isLoading=false;
    });

  }
}
