import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  id: number = 0;
  account: Account = new Account();
  withdrawAmount: number = 0;
  maxWithdrawLimit: number = 1000000; // 10 Lakh Limit

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
    });
  }

  onSubmit(): void {
    if (this.withdrawAmount <= 0) {
      alert('Withdrawal amount must be greater than zero.');
      return;
    }

    if (this.withdrawAmount > this.maxWithdrawLimit) {
      alert(`Withdrawal amount cannot exceed ₹${this.maxWithdrawLimit.toLocaleString()}.`);
      return;
    }

    if (this.withdrawAmount > this.account.balance) {
      alert('Insufficient balance.');
      return;
    }

    this.accountService.withdraw(this.id, this.withdrawAmount).subscribe(
      (data) => {
        this.account = data;
        alert(`Successfully withdrawn ₹${this.withdrawAmount}!`);
        this.router.navigate(['/accounts']);
      },
      (error) => {
        console.error('Error during withdrawal:', error);
        alert(error.error?.message || 'Withdrawal failed. Try again.');
      }
    );
  }
}
