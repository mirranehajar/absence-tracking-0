import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
    classes = {
    topnav: true,
    responsive: false,
  };

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
      },
      {separator: true},
      {
        label: 'Profil',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Sectors',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'SIR',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'IRISI',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'SDAD',
            icon: 'pi pi-fw pi-desktop',
          }
        ]
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
      },
      {
        label: 'Professors',
        icon: 'pi pi-fw pi-star'
      }
    ];
  }

  setClasses() {
    return this.classes;
  }

  onNavClick() {
    this.classes.responsive = !this.classes.responsive;
  }
}
