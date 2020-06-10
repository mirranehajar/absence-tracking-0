import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-etu',
  templateUrl: './asideEtu.component.html',
  styleUrls: ['./asideEtu.component.scss'],
})
export class AsideEtuComponent implements OnInit {
  display: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  Show() {
    this.display = true;
}
}
