import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // ✅ Import Router
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private accountService: AccountService, private router: Router) {}  // ✅ Inject Router

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  deleteAccount(id: number): void {
    this.accountService.deleteAccount(id).subscribe(
      (response) => {
        console.log('Account deleted:', response); // Debugging ke liye
        alert(response.message);
          // ✅ Yeh sahi string show karega
          this.getAccounts();
      },
      (error) => {
        console.error('Delete failed:', error);
        alert(error.error.message || 'Failed to delete account');  // ✅ Proper error message
      }
    );
  }
  
 
  viewAccount(id: number): void {
    this.router.navigate(['/account-details', id]);
  }

  deposit(id: number): void {
    this.router.navigate(['/deposit', id]);  // ✅ Now it works properly
  }
  withdraw(id: number): void {
    this.router.navigate(['/withdraw', id]);  // ✅ Now it works properly
  }
}
