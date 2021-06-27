import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsGatewayService {

  constructor() { }
  private API_URL = environment.API_URL;

  postDataToAWSAPIGateway = async (jsonTextString: string) => {
    const configuration: object = {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonTextString),
    }
    const response = await fetch(this.API_URL, configuration);
    try {
      const data = await response.json();
      console.log("Success:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
}
