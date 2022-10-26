import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'compass-ui-styleguide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss']
})
export class StyleGuideComponent {
  pillExpand = false;
  progCardExpand = false;
  progCardExpand2 = false;
  basicDetailsGroup: FormGroup = this.fb.group({



  });
  constructor(private fb: FormBuilder,) {
  }

}
