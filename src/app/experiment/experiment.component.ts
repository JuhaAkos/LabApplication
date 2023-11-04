import { Component } from '@angular/core';
import { ChemicalDTO, DeviceDTO, ExperimentDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from 'models';
import { ExperimentService} from '../services/experiment.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent {
  experiments: ExperimentDTO[] = [];  

  constructor(
    private ExperimentService: ExperimentService,
    private authenticationService: AuthenticationService, 
    private toastrService: ToastrService, 
    private router: Router,  
    ) { }

  ngOnInit(): void {
    this.ExperimentService.getAll().subscribe({
      next: (experiments) => {
        this.experiments = experiments;        
      }
    });    
  }

  currentNeededItems?: Array< ChemicalDTO | WoodenToolDTO | MetalToolDTO | GlassContainerDTO | DeviceDTO | OtherItemDTO> = [];

  getNeededItemsInList(experiment: ExperimentDTO) {
    this.currentNeededItems?.splice(0,this.currentNeededItems?.length);
    
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededchemicals);
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededwoodentools);
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededmetaltools);
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededglasscontainers);
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededdevices);
    this.currentNeededItems?.push.apply(this.currentNeededItems, experiment.neededotheritems);    
  }

  selectedExperiment?: ExperimentDTO;

  getSelectedExperiment(experiment: ExperimentDTO){    
    this.selectedExperiment! = experiment;
    this.getNeededItemsInList(experiment);
  }
  

  ifItemEmpty(item: ChemicalDTO | WoodenToolDTO | MetalToolDTO | GlassContainerDTO | DeviceDTO | OtherItemDTO) : boolean {
    if (item.amount == 0 || item.amount == null || item.amount == undefined) {
      return true;
    }
    return false;
  }

  isAdmin(){    
    if ("admin"==this.authenticationService.getRole()){
      return true;
    }
    else return false;
  }

  navigateToModify(experiment: ExperimentDTO){
    this.router.navigate(['/experiment/form', experiment.id]);
  }
  
  deleteExperiment(experiment: ExperimentDTO) {
    if(this.isAdmin()){
      this.ExperimentService.delete(experiment.id).subscribe({
        next: () => { 
          this.toastrService.success('Kísérlet törölve');
          const index = this.experiments.indexOf(experiment);
          if (index > -1) {
            this.experiments.splice(index, 1);
          }     
        },
        error: (err) => {        
          this.toastrService.error('Hiba a kísérlet törlésekor.', 'Hiba');
        }
      })
    }
  }
  
}
