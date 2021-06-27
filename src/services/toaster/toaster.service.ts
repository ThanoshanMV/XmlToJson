import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService){}

  showSuccessConversionToastr(){
    this.toastr.success('JSON converted successfully', 'Success!');
  }

  showSuccessOnUploadToastr(){
    this.toastr.success('File is uploaded');
  }

  showErrorToastr(){
    this.toastr.error('Check XML input', 'Error');
  }

  showInfoToastr(){
    this.toastr.info('Copied to clipboard', 'Copied!');
  }
}
