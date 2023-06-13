import { Component } from '@angular/core';
import { ChemicalDTO, WoodenToolDTO } from 'models';
import { ChemicalService } from '../services/chemical.service';

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
    ) { }
   

  ngOnInit(): void {
    this.ChemicalService.getAll().subscribe({
      next: (chemicals) => {
        this.chemicals = chemicals;
        console.log(this.chemicals);
      }
    });
  } 

}
