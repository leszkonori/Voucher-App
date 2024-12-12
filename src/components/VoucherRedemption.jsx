import RedeemVoucher from './RedeemInput';
import { useContext, useState } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';

export default function VoucherRedemption() {
    const { vouchers } = useContext(VoucherContext);
    const [message, setMessage] = useState('');

    return (
        <div>
            <h2 className="text-3xl mb-5 font-bold text-center">Voucher Redemption</h2>
            <RedeemVoucher messageSetter={setMessage}/>
            <p>{message}</p>
            <ul>
                {vouchers.map((voucher) => (
                    <li key={voucher.code}>
                        <p>Code: {voucher.code} {voucher.redeemed && <span>Redeemed: yes</span>}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}