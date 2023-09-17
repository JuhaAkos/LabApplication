import { Component } from '@angular/core';
import { ChemicalDTO, DeviceDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from 'models';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';

import { ChemicalFormService } from './chemicalForm-service';
import { WoodenToolFormService } from './woodenToolForm-service';
import { MetalToolFormService } from './metalToolForm-service';
import { DeviceFormService } from './deviceForm-service';
import { GlassContainerFormService } from './glassContainerForm-service';
import { OtherItemFormService } from './otherItemForm-service';

import { ChemicalService } from '../services/chemical.service';
import { WoodenToolService } from '../services/woodentool.service';
import { MetalToolService } from '../services/metaltool.service';
import { DeviceService } from '../services/device.service';
import { GlassContainerService } from '../services/glasscontainer.service';
import { OtherItemService } from '../services/otheritem.service';


@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent {

  constructor(    
    private chemicalFormService: ChemicalFormService,
    private ChemicalService: ChemicalService,
    private woodenToolFormService: WoodenToolFormService,
    private WoodenToolService: WoodenToolService,
    private metalToolFormService: MetalToolFormService,
    private MetalToolService: MetalToolService,
    private deviceFormService: DeviceFormService,
    private DeviceService: DeviceService,
    private glassContainerFormService: GlassContainerFormService,
    private GlassContainerService: GlassContainerService,
    private otherItemFormService: OtherItemFormService,
    private OtherItemService: OtherItemService,

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
  woodenToolForm = this.woodenToolFormService.createWoodenToolForm();
  metalToolForm = this.metalToolFormService.createMetalToolForm();
  deviceForm = this.deviceFormService.createDeviceForm();
  glassContainerForm = this.glassContainerFormService.createGlassContainerForm();
  otherItemForm = this.otherItemFormService.createOtherItemForm();

  fillUpForm(type: String) {
    const id = this.activatedRoute.snapshot.params['id'];

    if (type == "chemical") {
      this.ChemicalService.getOne(id).subscribe({
        next: (currentItem) => {
          this.chemicalFormService.setChemicalForm(currentItem, this.chemicalForm);
        }
      })
    }

    if (type == "woodentool") {
      this.WoodenToolService.getOne(id).subscribe({
        next: (currentItem) => {
          this.woodenToolFormService.setWoodenToolForm(currentItem, this.woodenToolForm);
        }
      })
    }

    if (type == "metaltool") {
      this.MetalToolService.getOne(id).subscribe({
        next: (currentItem) => {
          this.metalToolFormService.setMetalToolForm(currentItem, this.metalToolForm);
        }
      })
    }

    if (type == "device") {
      this.DeviceService.getOne(id).subscribe({
        next: (currentItem) => {
          this.deviceFormService.setDeviceForm(currentItem, this.deviceForm);
        }
      })
    }

    if (type == "glasscontainer") {
      this.GlassContainerService.getOne(id).subscribe({
        next: (currentItem) => {
          this.glassContainerFormService.setGlassContainerForm(currentItem, this.glassContainerForm);
        }
      })
    }

    if (type == "otheritem") {
      this.OtherItemService.getOne(id).subscribe({
        next: (currentItem) => {
          this.otherItemFormService.setOtherItemForm(currentItem, this.otherItemForm);
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

  saveWoodenToolData() {
    let woodentool = {} as WoodenToolDTO;

    if (this.isModify) {  

      this.woodenToolFormService.modifyWoodenTool(
        this.woodenToolForm,
        woodentool,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.woodenToolFormService.saveNewWoodenTool(this.woodenToolForm, woodentool);
    }
  }

  saveMetalToolData() {
    let metaltool = {} as MetalToolDTO;

    if (this.isModify) {  

      this.metalToolFormService.modifyMetalTool(
        this.metalToolForm,
        metaltool,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.metalToolFormService.saveNewMetalTool(this.metalToolForm, metaltool);
    }
  }

  saveGlassContainerData() {
    let glasscontainer = {} as GlassContainerDTO;

    if (this.isModify) {  

      this.glassContainerFormService.modifyGlassContainer(
        this.glassContainerForm,
        glasscontainer,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.glassContainerFormService.saveNewGlassContainer(this.glassContainerForm, glasscontainer);
    }
  }

  saveDeviceData() {
    let device = {} as DeviceDTO;

    if (this.isModify) {  

      this.deviceFormService.modifyDevice(
        this.deviceForm,
        device,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.deviceFormService.saveNewDevice(this.deviceForm, device);
    }
  }

  saveOtherItemData() {
    let otheritem = {} as OtherItemDTO;

    if (this.isModify) {  

      this.otherItemFormService.modifyOtherItem(
        this.otherItemForm,
        otheritem,
        this.activatedRoute.snapshot.params['id']);

    } else {    

      this.otherItemFormService.saveNewOtherItem(this.otherItemForm, otheritem);
    }
  }


}
