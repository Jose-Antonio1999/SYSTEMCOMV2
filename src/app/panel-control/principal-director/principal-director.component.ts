import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-director',
  templateUrl: './principal-director.component.html',
  styleUrls: ['./principal-director.component.css']
})
export class PrincipalDirectorComponent implements OnInit {

  constructor(private auth:AngularFireAuth, private ruta:Router) { }

  ngOnInit(): void {
  }


}
