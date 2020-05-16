import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss']
})


export class TryComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective;
  elements: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];
  searchText = '';
  previous: string;
  constructor() { }
  @HostListener('input') oninput() { this.searchItems(); }
  ngOnInit() { for (let i = 1; i <= 10; i++) {
    this.elements.push({ id: i.toString(),
      first: 'Wpis' + (Math.floor(Math.random() * i * 10)).toString(),
      last: 'Last' + (Math.floor(Math.random() * i * 10)).toString(),
      handle: 'Handle' + (Math.floor(Math.random() * i * 10)).toString() }); }
               this.mdbTable.setDataSource(this.elements);
               this.previous = this.mdbTable.getDataSource(); }
      searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
    this.mdbTable.setDataSource(this.previous);
    this.elements = this.mdbTable.getDataSource(); }
    if (this.searchText) { this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['first', 'last']);
                           this.mdbTable.setDataSource(prev); } }
}
