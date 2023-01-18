import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  @Input() title = '';
  // @ts-ignore
  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitEvent.emit(this.formGroup);
  }
}
