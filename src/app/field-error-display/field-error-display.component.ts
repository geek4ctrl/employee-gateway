import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent implements OnInit {

  @Input() errorMessage: string = '';
  @Input() displayError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
