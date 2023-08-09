import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChemicalService } from '../services/chemical.service';
import { TransferService } from '../services/transfer.service';
import { ChemicalDTO } from 'models';
import { ActivatedRoute, Router } from '@angular/router';
import { ChemicalFormService } from './chemicalForm-service';


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent {

  constructor(    
    private chemicalFormService: ChemicalFormService,
    private ChemicalService: ChemicalService,
    private TransferService: TransferService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  public isModify = true;

  ngOnInit(): void {

    if (this.router.url != "/equipment/form") {
      this.isModify = true;

      this.fillUpForm(this.TransferService.getData());
    } else {
      this.isModify = false;
    }
  }

  public selectedValue = this.TransferService.getData();

  isSelectedType(type: String) {
    if (type == this.selectedValue) {
      return true;
    }
    else return false;
  }

  chemicalForm = this.chemicalFormService.createChemicalForm();

  fillUpForm(type: String) {
    const id = this.activatedRoute.snapshot.params['id'];

    if (type == "chemical") {
      this.ChemicalService.getOne(id).subscribe({
        next: (currentItem) => {
          this.chemicalFormService.setChemicalForm(currentItem, this.chemicalForm);
        }
      })
    }
  }

  saveChemicalData() {
    let chemical = {} as ChemicalDTO;

    if (this.isModify) {  

      this.chemicalFormService.modifyChemical(
        this.chemicalForm,
        chemical,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.chemicalFormService.saveNewChemical(this.chemicalForm, chemical);
    }
  }

}
