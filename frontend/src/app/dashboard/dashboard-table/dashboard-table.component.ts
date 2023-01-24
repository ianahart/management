import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';

interface paginateBtn {
  direction: string;
  page: number;
}

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
})
export class DashboardTableComponent implements OnInit {
  @Input() page = 0;
  @Input() direction = 'next';
  @Input() totalPages = 0;
  @Input() items: any[] = [];
  @Input() keys: string[] = [];

  @Output() prevEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPrev() {
    this.prevEvent.emit();
  }

  onNext() {
    this.nextEvent.emit();
  }
}
