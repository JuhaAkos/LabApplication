import { Component } from '@angular/core';
import { ChemicalDTO, DeviceDTO, ExperimentDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from 'models';
import { ExperimentService} from '../services/experiment.service';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent {
  experiments: ExperimentDTO[] = [];  

  constructor(
    private ExperimentService: ExperimentService,    
    ) { }

  ngOnInit(): void {
    this.ExperimentService.getAll().subscribe({
      next: (experiments) => {
        this.experiments = experiments;
        //console.log(experiments.length)
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
  
}
