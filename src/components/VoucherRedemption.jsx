import RedeemVoucher from './RedeemVoucher';
import { useContext, useState } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';

export default function VoucherRedemption() {
    const { vouchers } = useContext(VoucherContext);
    const [message, setMessage] = useState('');

    return (
        <>
            <h2>Voucher Redemption</h2>
            <RedeemVoucher messageSetter={setMessage}/>
            <p>{message}</p>
            <ul>
                {vouchers.map((voucher) => (
                    <li key={voucher.code}>
                        <p>Code: {voucher.code} </p>
                        {voucher.redeemed && <p>Redeemed: yes</p>}
                    </li>
                ))}
            </ul>
        </>
    );
}