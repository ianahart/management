import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard-class-select',
  templateUrl: './dashboard-class-select.component.html',
  styleUrls: ['./dashboard-class-select.component.scss'],
})
export class DashboardClassSelectComponent implements OnInit {
  @Input() page = 0;
  @Input() totalPages = 0;
  @Input() label = '';
  @Input() items: any[] = [];
  @Input() selectedItem = '';

  @Output() selectEvent = new EventEmitter<any>();
  @Output() loadEvent = new EventEmitter<string>();

  faChevronDown = faChevronDown;
  isDropDownOpen = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event.target'])
  public onPageClick() {
    event?.stopPropagation();
    const trigger = (event?.target as HTMLElement).id;
    const clickedInside =
      this.elementRef.nativeElement.contains(event?.target) ||
      trigger === 'select';
    if (!clickedInside) {
      this.openSelectDropDown(false);
    }
  }

  onLoadMore() {
    this.loadEvent.emit(this.label.toLowerCase());
  }

  openSelectDropDown(isOpen: boolean) {
    this.isDropDownOpen = isOpen;
  }

  selectItem<T>(data: T) {
    this.selectEvent.emit(data);
    this.openSelectDropDown(false);
  }
}
