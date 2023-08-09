import { Component, EventEmitter, Output } from '@angular/core';
import { ChemicalDTO, WoodenToolDTO } from 'models';
import { ChemicalService } from '../services/chemical.service';
import { TransferService } from '../services/transfer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent {
  chemicals: ChemicalDTO[] = [];

  //a list for all the arrays in one list
  items: Array<ChemicalDTO | WoodenToolDTO> = [];

  constructor(
    private ChemicalService: ChemicalService,
    private TransferService: TransferService,
    private toastrService: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.ChemicalService.getAll().subscribe({
      next: (chemicals) => {
        this.chemicals = chemicals;
      }
    });
  } 

  public selectedValue?: String;

  isSelectedType(type : String) {
    if (type == this.selectedValue){
      return true;
    }
    else return false;    
  }

  deleteChemical(chemical: ChemicalDTO) {
    this.ChemicalService.delete(chemical.id).subscribe({
      next: () => {
        const index = this.chemicals.indexOf(chemical);
        if (index > -1) {
          this.chemicals.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  navigateToEquipmentForm(id : number, type : String) {
    this.TransferService.setData(type);
    this.router.navigate(['/equipment/form', id]);
  }

  
  


}
