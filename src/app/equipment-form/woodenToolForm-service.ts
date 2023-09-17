import { WoodenToolDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { WoodenToolService } from '../services/woodentool.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WoodenToolFormService {
  constructor(
    private formBuilder: FormBuilder,
    private woodenToolService: WoodenToolService,
    private toastrService: ToastrService,
  ) { }

  createWoodenToolForm() {
    let woodenToolForm = this.formBuilder.group({
      id: 0,
      name: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return woodenToolForm;
  }

  setWoodenTool(woodenToolInput: WoodenToolDTO, woodenToolForm: FormGroup) {
    woodenToolInput.name = woodenToolForm.controls['name'].value!;
    woodenToolInput.amount = Number(woodenToolForm.controls['amount'].value!);
    woodenToolInput.description = woodenToolForm.controls['description'].value!;

    return woodenToolInput;
  }

  setWoodenToolForm(woodenToolInput: WoodenToolDTO, woodenToolForm: FormGroup) {
    woodenToolForm.controls['name'].setValue(woodenToolInput.name);
    woodenToolForm.controls['amount'].setValue(woodenToolInput.amount.toString());
    woodenToolForm.controls['description'].setValue(woodenToolInput.description);
  }

  checkIfWoodenToolIsNotNull(woodenToolInput: WoodenToolDTO) {
    if (!woodenToolInput.name || !woodenToolInput.amount) {
      //description can be null
      return false;
    } else return true;
  }

  modifyWoodenTool(woodenToolForm : FormGroup, woodentool : WoodenToolDTO, id : number){
    this.woodenToolService.getOne(id).subscribe({
      next: (woodentool1) => {
        woodentool = woodentool1;

        this.setWoodenTool(woodentool, woodenToolForm);

        this.woodenToolService.update(woodentool).subscribe({
          next: (woodentool2) => {
            this.toastrService.success('Tétel módosítva, id:' + woodentool1.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewWoodenTool(woodenToolForm : FormGroup, woodentool : WoodenToolDTO){
    this.setWoodenTool(woodentool, woodenToolForm);

      this.woodenToolService.create(woodentool).subscribe({
        next: (woodentool2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
