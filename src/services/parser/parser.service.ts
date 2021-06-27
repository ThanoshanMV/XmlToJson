import { Injectable } from '@angular/core';

declare var require: any;
var fastXmlParser = require('fast-xml-parser');

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  stringfyObject: string;
  jsonObject: object;

  constructor() {
    this.stringfyObject = "stringObject";
    this.jsonObject = {};
  }

  xmlToJsonConverter(xmlTextString: string): string {
    if (xmlTextString) {
      this.jsonObject = fastXmlParser.parse(xmlTextString, {
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      console.log("xmlToJson", this.jsonObject);
      this.stringfyObject = JSON.stringify(this.jsonObject, null, 2);
      return this.stringfyObject;
    }
    else{
      return "Attach XML file or paste XML in textarea to convert";
    }
  }
}
