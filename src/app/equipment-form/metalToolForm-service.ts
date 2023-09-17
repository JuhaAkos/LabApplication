import { MetalToolDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MetalToolService } from '../services/metaltool.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MetalToolFormService {
  constructor(
    private formBuilder: FormBuilder,
    private metalToolService: MetalToolService,
    private toastrService: ToastrService,
  ) { }

  createMetalToolForm() {
    let metalToolForm = this.formBuilder.group({
      id: 0,
      name: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return metalToolForm;
  }

  setMetalTool(metalToolInput: MetalToolDTO, metalToolForm: FormGroup) {
    metalToolInput.name = metalToolForm.controls['name'].value!;
    metalToolInput.amount = Number(metalToolForm.controls['amount'].value!);
    metalToolInput.description = metalToolForm.controls['description'].value!;

    return metalToolInput;
  }

  setMetalToolForm(metalToolInput: MetalToolDTO, metalToolForm: FormGroup) {
    metalToolForm.controls['name'].setValue(metalToolInput.name);
    metalToolForm.controls['amount'].setValue(metalToolInput.amount.toString());
    metalToolForm.controls['description'].setValue(metalToolInput.description);
  }

  checkIfMetalToolIsNotNull(metalToolInput: MetalToolDTO) {
    if (!metalToolInput.name || !metalToolInput.amount) {
      //description can be null
      return false;
    } else return true;
  }

  modifyMetalTool(metalToolForm : FormGroup, metaltool : MetalToolDTO, id : number){
    this.metalToolService.getOne(id).subscribe({
      next: (metaltool1) => {
        metaltool = metaltool1;

        this.setMetalTool(metaltool, metalToolForm);

        this.metalToolService.update(metaltool).subscribe({
          next: (metaltool2) => {
            this.toastrService.success('Tétel módosítva, id:' + metaltool1.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewMetalTool(metalToolForm : FormGroup, metaltool : MetalToolDTO){
    this.setMetalTool(metaltool, metalToolForm);

      this.metalToolService.create(metaltool).subscribe({
        next: (metaltool2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
