import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperimentService } from '../services/experiment.service';
import { ToastrService } from 'ngx-toastr';
import { ChemicalDTO, DeviceDTO, ExperimentDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from 'models';
import { ChemicalService } from '../services/chemical.service';
import { DeviceService } from '../services/device.service';
import { GlassContainerService } from '../services/glasscontainer.service';
import { MetalToolService } from '../services/metaltool.service';
import { OtherItemService } from '../services/otheritem.service';
import { WoodenToolService } from '../services/woodentool.service';

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent {
  

  constructor( 
    private ChemicalService: ChemicalService,
    private OtherItemService: OtherItemService,
    private DeviceService: DeviceService,
    private GlassContainerService: GlassContainerService,
    private WoodenToolService: WoodenToolService,
    private MetalToolService: MetalToolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private experimentService: ExperimentService,
    private toastrService: ToastrService,
  ) { }

  public isModify = true;
  showRole = "teacher";  

  neededchemicals: ChemicalDTO[] = [];
  neededwoodentools: WoodenToolDTO[] = [];
  neededmetaltools: MetalToolDTO[] = [];
  neededglasscontainers?: GlassContainerDTO[] = [];
  neededdevices: DeviceDTO[] = [];
  neededotheritems: OtherItemDTO[] = [];

  ngOnInit(): void {  

    this.getStorageItems();

    if (this.router.url != "/experiment/form") {
      this.isModify = true;
      this.fillUpForm();
    } else {
      this.isModify = false;
      this.setDefaultExperiment();
    }
  }

  currentExperiment?: ExperimentDTO;
  setDefaultExperiment(){
    this.currentExperiment = this.experimentForm.value as ExperimentDTO;
    this.currentExperiment.neededchemicals = <ChemicalDTO[]>[];
    this.currentExperiment.neededdevices = <DeviceDTO[]>[];
    this.currentExperiment.neededglasscontainers = <GlassContainerDTO[]>[];
    this.currentExperiment.neededmetaltools = <MetalToolDTO[]>[];
    this.currentExperiment.neededwoodentools = <WoodenToolDTO[]>[];
    this.currentExperiment.neededotheritems = <OtherItemDTO[]>[];
  }
  

  getStorageItems() {    
    this.ChemicalService.getAll().subscribe({
      next: (chemicals: ChemicalDTO[]) => {
        this.neededchemicals = chemicals;
      }
    });
    this.DeviceService.getAll().subscribe({
      next: (devices: DeviceDTO[]) => {
        this.neededdevices = devices;
      }
    });
    this.GlassContainerService.getAll().subscribe({
      next: (glasscontainers: GlassContainerDTO[]) => {
        this.neededglasscontainers = glasscontainers;
      }
    });
    this.MetalToolService.getAll().subscribe({
      next: (metaltools: MetalToolDTO[]) => {
        this.neededmetaltools = metaltools;
      }
    });
    this.OtherItemService.getAll().subscribe({
      next: (otheritems: OtherItemDTO[]) => {
        this.neededotheritems = otheritems;
      }
    });
    this.WoodenToolService.getAll().subscribe({
      next: (woodentools: WoodenToolDTO[]) => {
        this.neededwoodentools = woodentools;
      }
    });
  } 

  public selectedType?: String;

  isSelectedType(type : String) {
    if (type == this.selectedType){
      return true;
    }
    else return false;    
  }

  experimentForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
  });  

  fillUpForm() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.experimentService.getOne(id).subscribe({
      next: (currentExperiment) => {
        this.currentExperiment=currentExperiment;    
        
        this.experimentForm.controls['id'].setValue(this.currentExperiment.id);
        this.experimentForm.controls['name'].setValue(this.currentExperiment.name);
        this.experimentForm.controls['description'].setValue(this.currentExperiment.description);
      }
    })
  }  

  saveExperiment(){
    var saveData = this.currentExperiment as ExperimentDTO;
    var saveData2 = this.experimentForm.value as ExperimentDTO; 
    saveData.name = saveData2.name;
    saveData.description = saveData2.description;
    saveData.id = saveData2.id;

    if (this.isModify){
      this.experimentService.update(saveData).subscribe({
        next: (saveData) => {
          this.toastrService.success('Kísérlet módosítva, id:' + saveData.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('Kísérlet módosítása sikertelen');
        }
      });
    } else {
      this.experimentService.create(saveData).subscribe({
        next: (saveData) => {
          this.toastrService.success('Kísérlet hozzáadva, id:' + saveData.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('Kísérlet hozzáadása sikertelen');
        }
      });
    }
  }

  //chemical
  addChemical(chemical: ChemicalDTO){
    this.currentExperiment!.neededchemicals.push(chemical);
  }
  
  removeChemical(chemical: ChemicalDTO) {
    var counter = this.checkForChemical(chemical);
    if (counter>-1){
      this.currentExperiment!.neededchemicals.splice(counter, 1);
    }
  }

  checkForChemical(chemical: ChemicalDTO){
    if (this.currentExperiment!.neededchemicals.length >0) {      
      for ( var counter in this.currentExperiment!.neededchemicals){
        if (chemical.id == this.currentExperiment!.neededchemicals[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }

  //device
  addDevice(device: DeviceDTO){
    this.currentExperiment!.neededdevices.push(device);
  }
  
  removeDevice(device: DeviceDTO) {
    var counter = this.checkForDevice(device);
    if (counter>-1){
      this.currentExperiment!.neededdevices.splice(counter, 1);
    }
  }

  checkForDevice(device: DeviceDTO){
    if (this.currentExperiment!.neededdevices.length >0) {      
      for ( var counter in this.currentExperiment!.neededdevices){
        if (device.id == this.currentExperiment!.neededdevices[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }

  //woodentool
  addWoodentool(woodentool: WoodenToolDTO){
    this.currentExperiment!.neededwoodentools.push(woodentool);
  }
  
  removeWoodentool(woodentool: WoodenToolDTO) {
    var counter = this.checkForWoodentool(woodentool);
    if (counter>-1){
      this.currentExperiment!.neededwoodentools.splice(counter, 1);
    }
  }

  checkForWoodentool(woodentool: WoodenToolDTO){
    if (this.currentExperiment!.neededwoodentools.length >0) {      
      for ( var counter in this.currentExperiment!.neededwoodentools){
        if (woodentool.id == this.currentExperiment!.neededwoodentools[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }

  //metaltool
  addMetaltool(metaltool: MetalToolDTO){
    this.currentExperiment!.neededmetaltools.push(metaltool);
  }
  
  removeMetaltool(metaltool: MetalToolDTO) {
    var counter = this.checkForMetaltool(metaltool);
    if (counter>-1){
      this.currentExperiment!.neededmetaltools.splice(counter, 1);
    }
  }

  checkForMetaltool(metaltool: MetalToolDTO){
    if (this.currentExperiment!.neededmetaltools.length >0) {      
      for ( var counter in this.currentExperiment!.neededmetaltools){
        if (metaltool.id == this.currentExperiment!.neededmetaltools[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }



  //otheritem
  addOtheritem(otheritem: OtherItemDTO){
    this.currentExperiment!.neededotheritems.push(otheritem);
  }
  
  removeOtheritem(otheritem: OtherItemDTO) {
    var counter = this.checkForOtheritem(otheritem);
    if (counter>-1){
      this.currentExperiment!.neededotheritems.splice(counter, 1);
    }
  }

  checkForOtheritem(otheritem: OtherItemDTO){
    if (this.currentExperiment!.neededotheritems.length >0) {      
      for ( var counter in this.currentExperiment!.neededotheritems){
        if (otheritem.id == this.currentExperiment!.neededotheritems[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }
  

  //glasscontainer
  addGlasscontainer(glasscontainer: GlassContainerDTO){
    this.currentExperiment!.neededglasscontainers.push(glasscontainer);
  }
  
  removeGlasscontainer(glasscontainer: GlassContainerDTO) {
    var counter = this.checkForGlasscontainer(glasscontainer);
    if (counter>-1){
      this.currentExperiment!.neededglasscontainers.splice(counter, 1);
    }
  }

  checkForGlasscontainer(glasscontainer: GlassContainerDTO){
    if (this.currentExperiment!.neededglasscontainers.length >0) {      
      for ( var counter in this.currentExperiment!.neededglasscontainers){
        if (glasscontainer.id == this.currentExperiment!.neededglasscontainers[counter].id){
          return Number(counter);        
        }
      }
    }
    return -1;
  }
}