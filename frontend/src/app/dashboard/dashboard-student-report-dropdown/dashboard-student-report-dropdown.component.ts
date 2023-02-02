import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IStudentName } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard-student-report-dropdown',
  templateUrl: './dashboard-student-report-dropdown.component.html',
  styleUrls: ['./dashboard-student-report-dropdown.component.scss'],
})
export class DashboardStudentReportDropdownComponent implements OnInit {
  @Input() isSelectDropDownOpen = false;
  @Input() studentNames: IStudentName[] = [];

  @Output() closeDropDownEvent = new EventEmitter<boolean>();
  @Output() selectStudentNameEvent = new EventEmitter<IStudentName>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event.target'])
  public onPageClick() {
    event?.stopPropagation();
    const clickedInside = this.elementRef.nativeElement.contains(event?.target);
    if (!clickedInside) {
      this.closeDropDownEvent.emit(false);
    }
  }

  selectStudentName(studentName: IStudentName) {
    this.selectStudentNameEvent.emit(studentName);
  }
}
