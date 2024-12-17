import { createContext, useState, useEffect } from "react";

export const VoucherContext = createContext({
    vouchers: [],
    errorMessage: String,
    redeemInputMessage: String,
    inputMessage: String,
    createVoucher: () => { },
    redeemVoucher: () => { },
});

export default function VoucherProvider({ children }) {
    const [vouchers, setVouchers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [redeemInputMessage, setRedeemInputMessage] = useState('');

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vouchers');
                if (!response.ok) {
                    throw new Error('Failed to fetch vouchers');
                }
                const data = await response.json();
                setVouchers(data);
            } catch (error) {
                setErrorMessage(error.data || 'Failed to fetch vouchers');
            }
        };
        fetchVouchers();
        setErrorMessage('');
    }, []);

    const createVoucher = async (voucher) => {
        setInputMessage('');
        setRedeemInputMessage('');
        if (!voucher.code || !voucher.validUntil) {
            setInputMessage('Voucher code and expiration date are required!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/vouchers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: voucher.code,
                    limited: voucher.limited,
                    limitNumber: voucher.limitNumber,
                    validUntil: voucher.validUntil
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create voucher');
            }

            setErrorMessage('');
            const responseData = await response.json();
            setInputMessage(responseData.message || 'Voucher created successfully!');
            // Frissítjük a vouchereket
            const data = await response.json();
            setVouchers((prevVouchers) => [...prevVouchers, data]);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to create voucher');
        }
    };

    const redeemVoucher = async (code) => {
        setRedeemInputMessage('');
        setInputMessage('');
        if (!code) {
            setRedeemInputMessage('Voucher code is required!');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/vouchers/redeem/${code}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to redeem voucher');
            }
            const responseData = await response.json();
            setErrorMessage('');
            setRedeemInputMessage(responseData.message || 'Voucher redeemed successfully!');
        } catch (error) {
            setErrorMessage(error.message || 'Voucher redemption failed');
        }
    };

    return (
        <VoucherContext.Provider value={{ vouchers, errorMessage, inputMessage, redeemInputMessage, setRedeemInputMessage, createVoucher, redeemVoucher }}>
            {children}
        </VoucherContext.Provider>
    )
}