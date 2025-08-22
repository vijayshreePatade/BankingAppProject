import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']  
})
export class CreateAccountComponent {
 
  account: Account = new Account();
  accountCreate = false;
  errorMessage: string | null = null;  

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe(
      data => {
        console.log('Account created:', data);
        this.accountCreate = true;
        
        // Delay navigation
        setTimeout(() => {
          this.goToAccountList();
        }, 2000);
      },
      error => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to create account. Please try again!';
      }
    );
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }
}
