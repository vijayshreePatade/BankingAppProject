package com.BankingApp.service;

import java.util.List;

import com.BankingApp.dto.AccountDto;

public interface AccountService {
    AccountDto createAccount(AccountDto accountDto);
    AccountDto getAccountByID(Long  id); 


    
    
    AccountDto deposit(Long id,double amount);
    
    AccountDto withdraw(Long id, double amount);
    
    List <AccountDto>getAllAccounts();
    boolean deleteAccount(Long id);
    
    
}
