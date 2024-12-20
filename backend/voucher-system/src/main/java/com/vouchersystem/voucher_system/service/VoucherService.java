package com.vouchersystem.voucher_system.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vouchersystem.voucher_system.model.Voucher;
import com.vouchersystem.voucher_system.repository.VoucherRepository;

import jakarta.transaction.Transactional;

@Service
public class VoucherService {

	@Autowired
    private VoucherRepository voucherRepository;
	
	public Voucher createVoucher(Voucher voucher) {
		voucher.setRedeemed(false);
		return getVoucherRepository().save(voucher);
    }
	
	public Optional<Voucher> getVoucherByCode(String code) {
        return getVoucherRepository().findByCode(code);
    }
	
	@Transactional
    public String redeemVoucher(String code) {
        Optional<Voucher> optionalVoucher = getVoucherRepository().findByCode(code);

        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            
            if (voucher.getValidUntil().isBefore(LocalDate.now())) {
                return "Voucher is expired";
            }

            if (voucher.isLimited() && voucher.getLimitNumber() == 0) {
                voucher.setRedeemed(true);
            	return "Voucher redemption limit reached";
            }

            voucher.setLimitNumber(voucher.getLimitNumber() - 1);
            getVoucherRepository().save(voucher);

            return "Voucher redeemed successfully!";
        } else {
            return "Voucher not found";
        }
	}

	public VoucherRepository getVoucherRepository() {
		return voucherRepository;
	}

	public void setVoucherRepository(VoucherRepository voucherRepository) {
		this.voucherRepository = voucherRepository;
	}
}
