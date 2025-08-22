package com.BankingApp.service.impl;



import org.springframework.stereotype.Service;
import com.BankingApp.dto.AccountDto;
import com.BankingApp.entity.Account;
import com.BankingApp.mapper.AccountMapper;
import com.BankingApp.repository.AccountRepository;
import com.BankingApp.service.AccountService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountByID(Long id) { // Ensure method name and parameter type match exactly
        Account account = accountRepository.findById(id).orElse(null);
        return (account != null) ? AccountMapper.mapToAccountDto(account) : null;
    }
    @Override
    public AccountDto deposit(Long id,double amount){
    	 Account account = accountRepository.findById(id).orElse(null);
    	double totalBalance= account.getBalance()+amount;
    	account.setBalance(totalBalance);
    	Account SavedAccount=accountRepository.save(account);
		return AccountMapper.mapToAccountDto(SavedAccount);
				
    	
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(account.getBalance() - amount);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

	

	 

	public List<AccountDto> getAllAccounts() {
		
		 return accountRepository.findAll()
	                .stream()
	                .map(AccountMapper::mapToAccountDto)
	                .collect(Collectors.toList());
		
	}


	@Override
	public boolean deleteAccount(Long id) {
	    Optional<Account> account = accountRepository.findById(id);
	    if (account.isPresent()) {
	        accountRepository.delete(account.get());
	        return true;  // ✅ Deletion successful
	    } else {
	        return false; // ✅ Account not found
	    }
	}


    
    
}
