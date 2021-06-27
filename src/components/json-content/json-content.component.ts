import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { ContextService } from '../../services/context/context.service';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-json-content',
  templateUrl: './json-content.component.html',
  styleUrls: ['./json-content.component.css']
})
export class JsonContentComponent implements OnInit {

  stringfyObject: any;

  constructor(private toasterService: ToasterService, private contextService: ContextService){}

  ngOnInit(): void {
    this.contextService.xmlContent$
    .subscribe(message => {
      if (message.localeCompare("Attach XML file or paste XML in textarea to convert") == 0) {
        this.toasterService.showErrorToastr();
      } else {
        this.toasterService.showSuccessConversionToastr();
      }
      this.stringfyObject = message;
    });
  }

  async copyToClipboard(jsonTextString: string) {
    await navigator.clipboard.writeText(jsonTextString);
    this.toasterService.showInfoToastr();
  }
}
