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
    }
  }

  getStorageItems() {    
    this.ChemicalService.getAll().subscribe({
      next: (chemicals: ChemicalDTO[]) => {
        this.neededchemicals = chemicals;
        console.log(this.neededchemicals.length);
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
    id: 0,
    name: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
  });

  currentExperiment?: ExperimentDTO;

  fillUpForm() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.experimentService.getOne(id).subscribe({
      next: (currentExperiment) => {
        this.currentExperiment=currentExperiment;       
        
        this.experimentForm.controls['name'].setValue(this.currentExperiment!.name);
        this.experimentForm.controls['description'].setValue(this.currentExperiment!.description);
      }
    })
  } 

  createExperiment() {
    var experimentData = this.experimentForm.value as ExperimentDTO;    
    
    this.experimentService.create(experimentData).subscribe({
      next: (response) => {
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  } 

  modifyExperiment() {
    /*
    var userData = this.userForm.value as UserDTO;
    userData.role=this.currentUser!.role;
    userData.id=this.activatedRoute.snapshot.params['id'];

    if (userData.password!='aaaaaa') {
      this.userService.update(userData).subscribe({
      
        next: (userData1) => {
          this.toastrService.success('Fiók módosítva, id:' + userData1.id, 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Fiók módosítása sikertelen');
        }
      });
    } else {
      this.toastrService.error('Jelszó nem maradhat üresen!');
    }
    */    
  }

  addChemical(chemical: ChemicalDTO){
    this.neededchemicals?.push(chemical);
  }
  
  removeChemical(chemical: ChemicalDTO) {
    var counter = this.checkForChemical(chemical);
    if (counter>-1){
      this.currentExperiment!.neededchemicals.splice(counter, 1);
    }
  }

  checkForChemical(chemical: ChemicalDTO){
    for ( var counter in this.currentExperiment!.neededchemicals){
      if (chemical.id == this.currentExperiment!.neededchemicals[counter].id){
        return Number(counter);
      }
    }
    return -1;
  }
}