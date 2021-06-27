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
}
