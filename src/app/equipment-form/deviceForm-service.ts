import { DeviceDTO } from 'models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DeviceFormService {
  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private toastrService: ToastrService,
  ) { }

  createDeviceForm() {
    let deviceForm = this.formBuilder.group({
      id: 0,
      name: this.formBuilder.control(''),
      amount: this.formBuilder.control(''),
      fieldofuse: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
    return deviceForm;
  }

  setDevice(deviceInput: DeviceDTO, deviceForm: FormGroup) {
    deviceInput.name = deviceForm.controls['name'].value!;
    deviceInput.amount = Number(deviceForm.controls['amount'].value!);
    deviceInput.fieldofuse = deviceForm.controls['fieldofuse'].value!;
    deviceInput.description = deviceForm.controls['description'].value!;

    return deviceInput;
  }

  setDeviceForm(deviceInput: DeviceDTO, deviceForm: FormGroup) {
    deviceForm.controls['name'].setValue(deviceInput.name);
    deviceForm.controls['amount'].setValue(deviceInput.amount.toString());
    deviceForm.controls['fieldofuse'].setValue(deviceInput.fieldofuse);
    deviceForm.controls['description'].setValue(deviceInput.description);
  }

  checkIfDeviceIsNotNull(deviceInput: DeviceDTO) {
    if (!deviceInput.name || !deviceInput.amount) {
      //description can be null
      return false;
    } else return true;
  }

  modifyDevice(deviceForm : FormGroup, device : DeviceDTO, id : number){
    this.deviceService.getOne(id).subscribe({
      next: (device1) => {
        device = device1;

        this.setDevice(device, deviceForm);

        this.deviceService.update(device).subscribe({
          next: (device2) => {
            this.toastrService.success('Tétel módosítva, id:' + device1.id, 'Siker');
          },
          error: (err) => {
            this.toastrService.error('Tétel módosítása sikertelen');
          }
        });
      }
    });
  }

  saveNewDevice(deviceForm : FormGroup, device : DeviceDTO){
    this.setDevice(device, deviceForm);

      this.deviceService.create(device).subscribe({
        next: (device2) => {
          this.toastrService.success('Tétel felvéve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Tétel felvétele sikertelen');
        }
      });
  }
}
