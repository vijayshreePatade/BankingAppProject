import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  id: number = 0;
  account: Account = new Account();
  deposit: number = 0;
  maxAmount: number = 100000000;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
    });
  }

 



  onSubmit(): void {
    if (this.deposit <= 0) {
      alert('Deposit amount must be greater than zero.');
      return;
    }

    if (this.deposit > this.maxAmount) {
      alert(`Deposit greater than ₹${this.maxAmount.toLocaleString()} is not allowed.`);
      return;
    }

    this.accountService.deposit(this.id, this.deposit).subscribe(
      (data) => {
        this.account = data;
        alert(`Successfully deposited ₹${this.deposit.toLocaleString()}!`);
        this.router.navigate(['/accounts']);
      },
      (error) => {
        console.error('Error during deposit:', error);
        
        if (error.status === 400 && error.error?.message?.toLowerCase().includes('exceeds limit')) {
          alert(`Deposit greater than ₹${this.maxAmount.toLocaleString()} is not allowed.`);
        } else {
          alert('Deposit failed. Please try again.');
        }
      }
    );
  }

}
