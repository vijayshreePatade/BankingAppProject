package com.BankingApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.BankingApp.entity") // Scanning for JPA entities
@EnableJpaRepositories("com.BankingApp.repository") // Scanning for repositories
public class BankingAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankingAppApplication.class, args);
    }
}
