import { IvyParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//crypto
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/internal/operators';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  delete(){
    localStorage.removeItem('current')
  }
}


