import { OtherItemDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { OtherItemService } from '../services/otheritem.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OtherItemFormService {
  constructor(
    private formBuilder: FormBuilder,
    private otherItemService: OtherItemService,
    private toastrService: ToastrService,
  ) { }

  createOtherItemForm() {
    let otherItemForm = this.formBuilder.group({
      id: 0,
      name: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return otherItemForm;
  }

  setOtherItem(otherItemInput: OtherItemDTO, otherItemForm: FormGroup) {
    otherItemInput.name = otherItemForm.controls['name'].value!;
    otherItemInput.amount = Number(otherItemForm.controls['amount'].value!);
    otherItemInput.description = otherItemForm.controls['description'].value!;

    return otherItemInput;
  }

  setOtherItemForm(otherItemInput: OtherItemDTO, otherItemForm: FormGroup) {
    otherItemForm.controls['name'].setValue(otherItemInput.name);
    otherItemForm.controls['amount'].setValue(otherItemInput.amount.toString());
    otherItemForm.controls['description'].setValue(otherItemInput.description);
  }

  checkIfOtherItemIsNotNull(otherItemInput: OtherItemDTO) {
    if (!otherItemInput.name || !otherItemInput.amount) {
      //description can be null
      return false;
    } else return true;
  }

  modifyOtherItem(otherItemForm : FormGroup, otherItem : OtherItemDTO, id : number){
    this.otherItemService.getOne(id).subscribe({
      next: (otherItem1) => {
        otherItem = otherItem1;

        this.setOtherItem(otherItem, otherItemForm);

        this.otherItemService.update(otherItem).subscribe({
          next: (otherItem2) => {
            this.toastrService.success('Tétel módosítva, id:' + otherItem1.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewOtherItem(otherItemForm : FormGroup, otherItem : OtherItemDTO){
    this.setOtherItem(otherItem, otherItemForm);

      this.otherItemService.create(otherItem).subscribe({
        next: (otherItem2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
