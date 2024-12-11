import RedeemVoucher from './RedeemVoucher';
import {useContext} from 'react';
import { VoucherContext } from './VoucherContext';

export default function VoucherRedemption() {
    const {vouchers} = useContext(VoucherContext);
    
    return (
        <>
            <h2>Voucher Redemption</h2>
            <RedeemVoucher />
            <ul>
                {vouchers.map((voucher) => (voucher.redeemed &&
                    <li key={voucher.code}>
                        <p>Code: {voucher.code} Redeemed: {voucher.redeemed? "yes" : "no"}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}