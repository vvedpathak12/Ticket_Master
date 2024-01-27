import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() isShowCardHeader: boolean = true;
  @Input() headerClass: string = '';
  @Input() cardBodyClass: string = '';
  @Input() iconClass: string = '';
  @Input() cardHeight: string = '';
  @Input() cardDesign: string = '';
  @Input() headerStyle: string = '';
  @Input() headerTxtClass: string = '';
  @Input() headerTxt: string = '';
  @Input() btnTxt: string = '';
  @Input() showAddBtn: boolean = false;
  @Input() showActionBtn: boolean = false;
  @Output() btnClick = new EventEmitter<any>();
  @Output() editBtnClick = new EventEmitter<any>();
  @Output() deleteBtnClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClick() {
    this.btnClick.emit()
  }

  onEditClick() {
    this.editBtnClick.emit()
  }

  onDeleteClick() {
    this.deleteBtnClick.emit()
  }
}
