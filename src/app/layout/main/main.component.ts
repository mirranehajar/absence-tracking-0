import {Component, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';

import * as XLSX from 'xlsx';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
const { read, write, utils } = XLSX;



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
}


