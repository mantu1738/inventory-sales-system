import { Injectable } from '@angular/core';
import { FormFieldProperties } from '../../app/components/form-builder/form-builder.component';
import { v4 as uuidv4 } from 'uuid';
import { RoleDropDown } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})


export class AddEditUserForm{

  getAddEditUserForm():FormFieldProperties[]{
    return [
      {
          idName: 'id',
          label: 'Id',
          maxLength: 50,
          minLength: 2,
          regex: '',
          inputtype: 'STRING',
          required: 'Y',
          placeHolder: 'Enter User Id',
          paramOrder: 'id',
          visible: true,
          paramValue:uuidv4(),
      },
      {
          idName: 'name',
          label: 'User Name',
          maxLength: 50,
          minLength: 2,
          regex: '',
          inputtype: 'STRING',
          required: 'Y',
          placeHolder: 'Enter User Name',
          paramOrder: 'username',
          visible: true,
      },
      {
        idName: 'password',
        label: 'User Password',
        maxLength: 50,
        minLength: 2,
        regex: '',
        inputtype: 'STRING',
        required: 'Y',
        placeHolder: 'Enter User Password',
        paramOrder: 'password',
        visible: true,
      },
      {
        idName: 'fullName',
        label: 'User Full Name',
        maxLength: 50,
        minLength: 2,
        regex: '',
        inputtype: 'STRING',
        required: 'Y',
        placeHolder: 'Enter User Full Name',
        paramOrder: 'fullName',
        visible: true,
      },
      {
        idName: 'email',
        label: 'User Email',
        maxLength: 50,
        minLength: 2,
        regex: '',
        inputtype: 'STRING',
        required: 'Y',
        placeHolder: 'Enter User Email',
        paramOrder: 'email',
        visible: true,
    },
    {
      idName: 'role',
      label: 'User Role',
      maxLength: null,
      minLength: null,
      regex: '',
      inputtype: 'DROPDOWN',
      required: 'Y',
      placeHolder: 'Select User Role',
      paramOrder:'roleId',
      visible:true,
      options:RoleDropDown
    }
    ];
  }


}
