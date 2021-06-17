import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
var fastXmlParser = require('fast-xml-parser');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastr: ToastrService){}

  title = 'XmlToJson';
  jsonObject!: object;
  selectedFile: any;
  stringfyObject: any;
  xmlData: any;
  fileName: string = "file.xml";
  xmlText: any;

  selectExcelFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.showSuccessOnUploadToastr();
  }

  excelToJsonConverter(xmlTextString: string) {
    // check if selectedFile is available
    if (this.selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);
      fileReader.onload = (event: Event) => {
        this.xmlData = fileReader.result;
        this.jsonObject = fastXmlParser.parse(this.xmlData, {
          ignoreAttributes: false,
          attributeNamePrefix: "",
        });
        console.log("xmlToJson", this.jsonObject);
        this.stringfyObject = JSON.stringify(this.jsonObject, null, 2);
        this.postDataToAWSAPIGateway(this.stringfyObject);
        this.showSuccessConversionToastr();
      };
    }
    // check if text area is available
    else if (xmlTextString) {
      this.xmlData = xmlTextString;
      this.jsonObject = fastXmlParser.parse(this.xmlData, {
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      console.log("xmlToJson", this.jsonObject);
      this.stringfyObject = JSON.stringify(this.jsonObject, null, 2);
      this.postDataToAWSAPIGateway(this.stringfyObject);
      this.showSuccessConversionToastr();
    }
    else{
      this.stringfyObject =
      "Add the XML text either via file or in textfield!";
      this.showErrorToastr();
    }
  }

  async copyToClipboard(jsonTextString: string) {
    await navigator.clipboard.writeText(jsonTextString);
    this.showInfoToastr();
  }

  postDataToAWSAPIGateway(jsonTextString: string) {
    const data = { JsonData: jsonTextString };

    fetch("https://0bwkyz0kha.execute-api.ap-south-1.amazonaws.com/default/XmlToJsonAPI", {
      method: "POST", // or 'PUT'
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {console.log("Success:", data);})
      .catch((error) => {console.error("Error:", error);});
  }

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
