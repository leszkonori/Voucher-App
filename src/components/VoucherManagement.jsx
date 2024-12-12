import VoucherSettings from './VoucherSettings';
import { VoucherContext } from '../contexts/VoucherContext';
import { useContext } from 'react';

export default function VoucherManagement() {
    const { vouchers } = useContext(VoucherContext);

    return (
        <div className="">
            <h2 className="text-3xl mb-5 font-bold text-center mt-4">Voucher Management</h2>
            <VoucherSettings />
            <ul>
                {vouchers.map((voucher) => (
                    <li key={voucher.code}>
                        <p>Code: {voucher.code} Limit: {voucher.redemptionLimit.limitNumber}</p>
                        <p>Redeemed: {voucher.redeemed? "yes" : "no"}</p>
                        <p>Valid until: {voucher.validUntil}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}