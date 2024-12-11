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
        const today = new Date();

        let isValid = false;
        let expired = false;

        const updatedVouchers = vouchers.map((voucher) => {
            //Code exists
            if (voucher.code === code) {
                const dueDate = new Date(voucher.validUntil);
                //After expiry date
                if (dueDate < today) {
                    expired = true;
                    return voucher;
                }
                //Overused
                if (voucher.redemptionLimit.limited && voucher.redemptionLimit.limitNumber === 0) {
                    expired = true;
                    return voucher;
                }
                if (voucher.redemptionLimit.limited) {
                    voucher.redemptionLimit.limitNumber--;
                    if(voucher.redemptionLimit.limitNumber === 0) {
                        voucher.redeemed = true;
                    }
                }
                isValid = true;
            }
            return voucher;
        });

        if (isValid && !expired) {
            setVouchers(updatedVouchers);
            return "Voucher redeemed successfully!"
        } else if (expired) {
            return "This voucher has expired."
        } else {
            return "Invalid voucher code."
        }
    }

    return (
        <VoucherContext.Provider value={{ vouchers, addVoucher, redeemVoucher }}>
            {children}
        </VoucherContext.Provider>
    )
}