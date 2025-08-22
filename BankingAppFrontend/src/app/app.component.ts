import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Fixed property name
})
export class AppComponent {
  title = 'Banking App';
  account = {
    accountHolderName: '',
    balance: null
  };

  onSubmit() {
    console.log("Form submitted:", this.account);
  }
}
