import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      // Handle the form submission here.
      form.reset();  // Optionally reset the form
    } else {
      console.log('Form is invalid');
    }
  }

  onSearch(form: NgForm) {
    if (form.valid) {
      console.log('Search:', form.value.search);
      // Handle the search submission here.
    } else {
      console.log('Search form is invalid');
    }
  }

}
