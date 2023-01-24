import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-select',
  templateUrl: './dashboard-select.component.html',
  styleUrls: ['./dashboard-select.component.scss'],
})
export class DashboardSelectComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() selectedItem = '';
  @Input() keys: string[] = [];

  @Output() selectEvent = new EventEmitter<any>();

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

  openSelectDropDown(isOpen: boolean) {
    this.isDropDownOpen = isOpen;
  }

  selectItem<T>(data: T) {
    this.selectEvent.emit(data);
    this.openSelectDropDown(false);
  }
}
