import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-less',
  templateUrl: './more-less.component.html',
  styleUrls: ['./more-less.component.css']
})
export class MoreLessComponent implements OnInit {
  @Input() text: string = '';
  @Input() wordLimit: number = 0;
  @Input() customClass: string = '';
  showMore: boolean;

  constructor() {
    this.showMore = false;
  }

  ngOnInit(): void {
  }

}
