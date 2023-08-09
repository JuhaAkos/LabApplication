import { ChemicalDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ChemicalService } from '../services/chemical.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ChemicalFormService {
  constructor(
    private formBuilder: FormBuilder,
    private ChemicalService: ChemicalService,
    private toastrService: ToastrService,
  ) { }

  createChemicalForm() {
    let chemicalForm = this.formBuilder.group({
      id: 0,
      officialname: this.formBuilder.control(''),
      commonname: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      unit: this.formBuilder.control(''),
      poisonouseffect: this.formBuilder.control(''),
      storage: this.formBuilder.control(''),
      year: this.formBuilder.control(''),
      month: this.formBuilder.control(''),
      day: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return chemicalForm;
  }

  setChemical(chemicalInput: ChemicalDTO, chemicalForm: FormGroup) {
    chemicalInput.officialname = chemicalForm.controls['officialname'].value!;
    chemicalInput.commonname = chemicalForm.controls['commonname'].value!;
    chemicalInput.amount = Number(chemicalForm.controls['amount'].value!);
    chemicalInput.unit = chemicalForm.controls['unit'].value!;
    chemicalInput.poisonouseffect = chemicalForm.controls['poisonouseffect'].value!;
    chemicalInput.storage = chemicalForm.controls['storage'].value!;
    chemicalInput.expiration = new Date(
      Number(chemicalForm.controls['year'].value!),
      Number(chemicalForm.controls['month'].value!),
      Number(chemicalForm.controls['day'].value!));
    chemicalInput.description = chemicalForm.controls['description'].value!;

    return chemicalInput;
  }

  setChemicalForm(chemicalInput: ChemicalDTO, chemicalForm: FormGroup) {
    chemicalForm.controls['officialname'].setValue(chemicalInput.officialname);
    chemicalForm.controls['commonname'].setValue(chemicalInput.commonname);
    chemicalForm.controls['amount'].setValue(chemicalInput.amount.toString());
    chemicalForm.controls['unit'].setValue(chemicalInput.unit);
    chemicalForm.controls['poisonouseffect'].setValue(chemicalInput.poisonouseffect);
    chemicalForm.controls['storage'].setValue(chemicalInput.storage);
    chemicalForm.controls['year'].setValue(chemicalInput.expiration.toString().substring(0, 4));
    chemicalForm.controls['month'].setValue(chemicalInput.expiration.toString().substring(5, 7));
    chemicalForm.controls['day'].setValue(chemicalInput.expiration.toString().substring(8, 10));
    chemicalForm.controls['description'].setValue(chemicalInput.description);
  }

  checkIfChemicalIsNotNull(chemicalInput: ChemicalDTO) {
    if (!chemicalInput.officialname || !chemicalInput.commonname || !chemicalInput.amount || !chemicalInput.unit || !chemicalInput.storage || !chemicalInput.expiration) {
      //poisionous effect and description can be null
      return false;
    } else return true;
  }

  modifyChemical(chemicalForm : FormGroup, chemical : ChemicalDTO, id : number){
    this.ChemicalService.getOne(id).subscribe({
      next: (chemical1) => {
        chemical = chemical1;

        this.setChemical(chemical, chemicalForm);

        this.ChemicalService.update(chemical).subscribe({
          next: (chemical2) => {
            this.toastrService.success('Tétel módosítva, id:' + chemical2.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewChemical(chemicalForm : FormGroup, chemical : ChemicalDTO){
    this.setChemical(chemical, chemicalForm);

      this.ChemicalService.create(chemical).subscribe({
        next: (chemical2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
