import { Injectable } from '@angular/core';
import { FormFieldProperties } from '../../app/components/form-builder/form-builder.component';
import { CategoryDropDown } from '../models/item.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})



export class AddEditItemForm{

  getAddEditItemForm():FormFieldProperties[]{
    return [
      {
          idName: 'id',
          label: 'Id',
          maxLength: 50,
          minLength: 2,
          regex: '',
          inputtype: 'STRING',
          required: 'Y',
          placeHolder: 'Enter Item Id',
          paramOrder: 'itemId',
          visible: true,
          paramValue:uuidv4(),
      },
      {
          idName: 'name',
          label: 'Item Name',
          maxLength: 50,
          minLength: 2,
          regex: '',
          inputtype: 'STRING',
          required: 'Y',
          placeHolder: 'Enter Item Name',
          paramOrder: 'itemName',
          visible: true,
      },
      {
        idName: 'description',
        label: 'Item Description',
        maxLength: 50,
        minLength: 2,
        regex: '',
        inputtype: 'STRING',
        required: 'Y',
        placeHolder: 'Enter Item Description',
        paramOrder: 'itemDescription',
        visible: true,
    },
      {
          idName: 'category',
          label: 'Item Category',
          maxLength: null,
          minLength: null,
          regex: '',
          inputtype: 'DROPDOWN',
          required: 'Y',
          placeHolder: 'Choose Category',
          paramOrder: 'itemCategory',
          visible: true,
          options: CategoryDropDown,
      },
      {
          idName: 'price',
          label: 'item Price',
          maxLength: null,
          minLength: null,
          regex: '', // Fix: Use the string representation of the regular expression pattern
          inputtype: 'NUMERIC',
          required: 'Y',
          placeHolder: 'Enter Item Price',
          paramOrder: 'itemPrice',
          visible: true,
      },
      {
          idName: 'stockQuantity',
          label: 'Item Stock Quantity',
          maxLength: null,
          minLength: null,
          regex: '', // Fix: Use the string representation of the regular expression pattern
          inputtype: 'NUMERIC',
          required: 'Y',
          placeHolder: 'Enter Item Stock Quantity',
          paramOrder: 'itemStockQuantity',
          visible: true,
      },

  //     {
  //       idName: 'dateAdded',
  //       label: 'Created Date',
  //       maxLength: null,
  //       minLength: null,
  //       regex:'', // Fix: Use the string representation of the regular expression pattern
  //       inputtype: 'DATE',
  //       required: 'Y',
  //       placeHolder: 'Enter Created Date',
  //       paramOrder: 'itemDateAdded',
  //       visible: true,
  //   },
  //   {
  //     idName: 'lastUpdated',
  //     label: 'Updated Date',
  //     maxLength: null,
  //     minLength: null,
  //     regex:'', // Fix: Use the string representation of the regular expression pattern
  //     inputtype: 'DATE',
  //     required: 'Y',
  //     placeHolder: 'Enter Update Date',
  //     paramOrder: 'itemLastUpdated',
  //     visible: true,
  // },
  {
    idName: 'reorderLevel',
    label: 'Reorder Level',
    maxLength: null,
    minLength: null,
    regex:'', // Fix: Use the string representation of the regular expression pattern
    inputtype: 'NUMERIC',
    required: 'Y',
    placeHolder: 'Enter Reorder Level',
    paramOrder: 'itemReorderLevel',
    visible: true,
},

  ];
  }

}
