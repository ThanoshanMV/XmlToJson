import { Component } from '@angular/core';

declare var require: any;
var fastXmlParser = require('fast-xml-parser');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
        return;
      };
    }
    // check if text area is available
    if (xmlTextString) {
      this.xmlData = xmlTextString;
      this.jsonObject = fastXmlParser.parse(this.xmlData, {
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      console.log("xmlToJson", this.jsonObject);
      this.stringfyObject = JSON.stringify(this.jsonObject, null, 2);
      this.postDataToAWSAPIGateway(this.stringfyObject);
      return;
    }
    return (this.stringfyObject =
      "Please add the XML text either via file or in textfield!");
  }

  async copyToClipboard(jsonTextString: string) {
    await navigator.clipboard.writeText(jsonTextString);
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
}
