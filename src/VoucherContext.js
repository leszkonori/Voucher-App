import { createContext, useState } from "react";

export const VoucherContext = createContext({
    vouchers: [],
    addVoucher: () => { },
});

export default function VoucherProvider({ children }) {
    const [vouchers, setVouchers] = useState([]);

    function addVoucher(voucher) {
        setVouchers((prevVouchers) => [...prevVouchers, voucher]);
    }

    function redeemVoucher(code) {
        const updatedVouchers = vouchers.map((v) => {
            if (v.code === code) {
                v.redeemed = true;
            }
            return v;
        });
        setVouchers(updatedVouchers);
    }

    return (
        <VoucherContext.Provider value={{ vouchers, addVoucher, redeemVoucher }}>
            {children}
        </VoucherContext.Provider>
    )
}