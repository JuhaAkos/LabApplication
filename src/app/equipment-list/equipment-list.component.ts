import { Component} from '@angular/core';
import { ChemicalDTO, DeviceDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from 'models';
import { TransferService } from '../services/transfer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlassContainerService } from '../services/glasscontainer.service';
import { MetalToolService } from '../services/metaltool.service';
import { ChemicalService} from '../services/chemical.service';
import { DeviceService} from '../services/device.service';
import { OtherItemService} from '../services/otheritem.service';
import { WoodenToolService} from '../services/woodentool.service';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent {
  chemicals: ChemicalDTO[] = [];
  devices: DeviceDTO[] = [];
  glasscontainers: GlassContainerDTO[] = [];
  metaltools: MetalToolDTO[] = [];
  woodentools: WoodenToolDTO[] = [];
  otheritems: OtherItemDTO[] = [];

  constructor(
    private ChemicalService: ChemicalService,
    private OtherItemService: OtherItemService,
    private DeviceService: DeviceService,
    private GlassContainerService: GlassContainerService,
    private WoodenToolService: WoodenToolService,
    private MetalToolService: MetalToolService,
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
    this.DeviceService.getAll().subscribe({
      next: (devices) => {
        this.devices = devices;
      }
    });
    this.GlassContainerService.getAll().subscribe({
      next: (glasscontainers) => {
        this.glasscontainers = glasscontainers;
      }
    });
    this.MetalToolService.getAll().subscribe({
      next: (metaltools) => {
        this.metaltools = metaltools;
      }
    });
    this.OtherItemService.getAll().subscribe({
      next: (otheritems) => {
        this.otheritems = otheritems;
        console.log(otheritems.length);
      }
    });
    this.WoodenToolService.getAll().subscribe({
      next: (woodentools) => {
        this.woodentools = woodentools;
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
