import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { ContextService } from '../../services/context/context.service';
import { AwsGatewayService } from '../../services/aws-gateway/aws-gateway.service';

@Component({
  selector: 'app-xml-content',
  templateUrl: './xml-content.component.html',
  styleUrls: ['./xml-content.component.css']
})
export class XmlContentComponent implements OnInit {

  selectedFile: any;
  fileName: string = "file.xml";
  xmlText: any;

  constructor(private toasterService: ToasterService, private parserService: ParserService
    , private contextService: ContextService, private awsGatewayService: AwsGatewayService){}

  ngOnInit(): void {}

  selectXmlFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(this.selectedFile);
    fileReader.onload = (event: Event) => {
      this.xmlText = fileReader.result;
    };
    this.toasterService.showSuccessOnUploadToastr();
  }

  parseXMLContent(xmlContent: string): void {
    let jsonData: string = this.parserService.xmlToJsonConverter(xmlContent);
    this.contextService.sendJsonData(jsonData);
    this.awsGatewayService.postDataToAWSAPIGateway(jsonData);
  }
}
