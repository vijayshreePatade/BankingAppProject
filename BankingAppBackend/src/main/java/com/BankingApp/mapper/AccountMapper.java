package com.BankingApp.mapper;

import com.BankingApp.dto.AccountDto;
import com.BankingApp.entity.Account;

public class AccountMapper {
	
	public static Account mapToAccount(AccountDto accountDto) {
		return new Account(
				accountDto.getAccountHolderName(),
				accountDto.getBalance()
		);
	}
	
	public static AccountDto mapToAccountDto(Account account) {
		return new AccountDto(
				account.getId(),
				account.getAccountHolderName(),
				account.getBalance()
		);
	}
}

