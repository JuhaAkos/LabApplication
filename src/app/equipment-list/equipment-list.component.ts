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

  deleteDevice(device: DeviceDTO) {
    this.DeviceService.delete(device.id).subscribe({
      next: () => {
        const index = this.devices.indexOf(device);
        if (index > -1) {
          this.devices.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  deleteWoodenTool(woodentool: WoodenToolDTO) {
    this.WoodenToolService.delete(woodentool.id).subscribe({
      next: () => {
        const index = this.woodentools.indexOf(woodentool);
        if (index > -1) {
          this.woodentools.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  deleteMetalTool(metaltool: MetalToolDTO) {
    this.MetalToolService.delete(metaltool.id).subscribe({
      next: () => {
        const index = this.metaltools.indexOf(metaltool);
        if (index > -1) {
          this.metaltools.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  deleteGlassContainer(glasscontainer: GlassContainerDTO) {
    this.GlassContainerService.delete(glasscontainer.id).subscribe({
      next: () => {
        const index = this.glasscontainers.indexOf((glasscontainer));
        if (index > -1) {
          this.glasscontainers.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  deleteOtherItem(otheritem: OtherItemDTO) {
    this.OtherItemService.delete(otheritem.id).subscribe({
      next: () => {
        const index = this.otheritems.indexOf(otheritem);
        if (index > -1) {
          this.otheritems.splice(index, 1);
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
