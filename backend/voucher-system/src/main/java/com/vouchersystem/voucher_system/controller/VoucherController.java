package com.vouchersystem.voucher_system.controller;

import java.util.HashMap;
//import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vouchersystem.voucher_system.model.Voucher;
import com.vouchersystem.voucher_system.service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
@CrossOrigin(origins = "http://localhost:3000")
public class VoucherController {
	
	@Autowired
    private VoucherService voucherService;
	
    @PostMapping
    public Voucher createVoucher(@RequestBody Voucher voucher) {
        return voucherService.createVoucher(voucher);
    }
    
    @GetMapping
    public List<Voucher> getAllVouchers() {
        return voucherService.getVoucherRepository().findAll();
    }
    
    @PostMapping("/redeem/{code}")
    public ResponseEntity<Map<String, String>> redeemVoucher(@PathVariable String code) {
        String message = voucherService.redeemVoucher(code);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", message);

        return ResponseEntity.ok(response);
    }
}
