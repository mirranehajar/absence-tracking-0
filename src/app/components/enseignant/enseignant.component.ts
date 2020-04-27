import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService]
})
export class EnseignantComponent implements OnInit {
  msgs: Message[] = [];
  displayBasic: boolean;
  position: string;

  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
}
