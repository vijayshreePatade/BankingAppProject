import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private baseUrl = 'http://localhost:8080/api/accounts';

  constructor(private httpClient: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.baseUrl);
  }

  

  createAccount(account:Account):Observable<Account>{
    return this.httpClient.post<Account> (`${this.baseUrl}`,account)
  }
  getAccountById( id:number):Observable<Account>{
    return this.httpClient.get<Account>(`${this.baseUrl}/${id}`)
  }
  deleteAccount(id: number): Observable<{ message: string }> {  
    return this.httpClient.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
  
  
  
  deposit(accountId: number, amount: number): Observable<Account> {
    return this.httpClient.put<Account>(`${this.baseUrl}/${accountId}/deposit`, { amount });
  }

  withdraw(accountId: number, amount: number): Observable<Account> {
    return this.httpClient.put<Account>(`${this.baseUrl}/${accountId}/withdraw`, { amount });
  }
  
}
