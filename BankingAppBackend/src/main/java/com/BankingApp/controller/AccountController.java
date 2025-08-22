package com.BankingApp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.BankingApp.dto.AccountDto;
import com.BankingApp.service.AccountService;









@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:49215"})





@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto) {
        return new ResponseEntity<>(accountService.createAccount(accountDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id) { // Changed "getAccountByID" to camelCase
        AccountDto accountDto = accountService.getAccountByID(id);
        if (accountDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(accountDto);
    }

    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id, @RequestBody Map<String, Double> request) {
        Double amount = request.get("amount");

        AccountDto accountDto=accountService.deposit(id, amount);

        return ResponseEntity.ok(accountDto);
    }
    
    
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id, @RequestBody Map<String, Double> request) {
        double amount = request.get("amount");

        if (amount <= 0) {
            return ResponseEntity.badRequest().build(); // Invalid amount
        }

        AccountDto updatedAccount = accountService.withdraw(id, amount);
        return ResponseEntity.ok(updatedAccount);
    }
    @GetMapping
    public ResponseEntity<List<AccountDto>> getAllAccounts() {
        List<AccountDto> accountDtoList = accountService.getAllAccounts();
        return ResponseEntity.ok(accountDtoList);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAccount(@PathVariable Long id) {
        boolean isDeleted = accountService.deleteAccount(id);
        
        Map<String, String> response = new HashMap<>();
        if (isDeleted) {
            response.put("message", "Account deleted successfully!");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Account not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }



    
}
