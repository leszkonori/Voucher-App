package com.vouchersystem.voucher_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vouchersystem.voucher_system.model.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
	Optional<Voucher> findByCode(String code);
}
