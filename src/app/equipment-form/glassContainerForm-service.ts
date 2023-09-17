import { GlassContainerDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { GlassContainerService } from '../services/glasscontainer.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlassContainerFormService {
  constructor(
    private formBuilder: FormBuilder,
    private glassContainerService: GlassContainerService,
    private toastrService: ToastrService,
  ) { }

  createGlassContainerForm() {
    let glassContainerForm = this.formBuilder.group({
      id: 0,
      name: this.formBuilder.control(''),      
      capacity: this.formBuilder.control(''),
      unit: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return glassContainerForm;
  }

  setGlassContainer(glassContainerInput: GlassContainerDTO, glassContainerForm: FormGroup) {
    glassContainerInput.name = glassContainerForm.controls['name'].value!;    
    glassContainerInput.capacity = Number(glassContainerForm.controls['capacity'].value!);
    glassContainerInput.unit = glassContainerForm.controls['unit'].value!;
    glassContainerInput.amount = Number(glassContainerForm.controls['amount'].value!);
    glassContainerInput.description = glassContainerForm.controls['description'].value!;

    return glassContainerInput;
  }

  setGlassContainerForm(glassContainerInput: GlassContainerDTO, glassContainerForm: FormGroup) {
    glassContainerForm.controls['name'].setValue(glassContainerInput.name);    
    glassContainerForm.controls['capacity'].setValue(glassContainerInput.capacity.toString());
    glassContainerForm.controls['unit'].setValue(glassContainerInput.unit);
    glassContainerForm.controls['amount'].setValue(glassContainerInput.amount.toString());
    glassContainerForm.controls['description'].setValue(glassContainerInput.description);
  }

  checkIfGlassContainerIsNotNull(glassContainerInput: GlassContainerDTO) {
    if (!glassContainerInput.name || !glassContainerInput.amount) {
      //description can be null
      return false;
    } else return true;
  }

  modifyGlassContainer(glassContainerForm : FormGroup, glassContainer : GlassContainerDTO, id : number){
    this.glassContainerService.getOne(id).subscribe({
      next: (glassContainer1) => {
        glassContainer = glassContainer1;

        this.setGlassContainer(glassContainer, glassContainerForm);

        this.glassContainerService.update(glassContainer).subscribe({
          next: (glassContainer2) => {
            this.toastrService.success('Tétel módosítva, id:' + glassContainer1.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewGlassContainer(glassContainerForm : FormGroup, glassContainer : GlassContainerDTO){
    this.setGlassContainer(glassContainer, glassContainerForm);

      this.glassContainerService.create(glassContainer).subscribe({
        next: (glassContainer2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
