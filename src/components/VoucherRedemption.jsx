import RedeemInput from './RedeemInput';
import { useContext, useState } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';
import ErrorMessage from './ErrorMessage';

export default function VoucherRedemption() {
    const { vouchers, redeemInputMessage, setRedeemInputMessage } = useContext(VoucherContext);

    return (
        <div className="text-center">
            <h2 className="text-3xl mb-5 font-bold text-center">Voucher Redemption</h2>
            <RedeemInput/>
            {redeemInputMessage && <ErrorMessage error={redeemInputMessage} setError={setRedeemInputMessage}/>}
            {/* <ul>
                {vouchers.map((voucher) => (
                    <li key={voucher.code}>
                        <p>Code: {voucher.code} {voucher.redeemed && <span>Redeemed: yes</span>}</p>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}