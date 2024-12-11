import { useContext, useState } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';

const VoucherSettings = () => {
    const { addVoucher } = useContext(VoucherContext);

    const [voucherLimit, setVoucherLimit] = useState('unlimited');
    const [limitNumber, setLimitNumber] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [validUntil, setValidUntil] = useState('');

    function handleCodeInput(event) {
        setVoucherCode(event.target.value);
    }

    const handleVoucherLimitChange = (e) => {
        setVoucherLimit(e.target.value);

        if (e.target.value === 'unlimited') {
            setLimitNumber('');
        }
    };

    const handleUsageLimitChange = (e) => {
        setLimitNumber(e.target.value);
    };

    function handleDateInput(event) {
        setValidUntil(event.target.value);
    }

    function handleCreate(event) {
        event.preventDefault();
        
        const newVoucher = {
            code: voucherCode,
            redemptionLimit: {
                limited: voucherLimit === 'limited',
                limitNumber: limitNumber
            },
            validUntil: validUntil,
            redeemed: false,
        };
        addVoucher(newVoucher);
        setVoucherLimit('unlimited');
        setLimitNumber('');
        setVoucherCode('');
        setValidUntil('');
    }

    return (
        <form>
            <div>
                <label>
                    Voucher Code:
                    <input
                        type="text"
                        value={voucherCode}
                        onChange={handleCodeInput}
                    />
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="unlimited"
                        name="voucher-limit"
                        checked={voucherLimit === 'unlimited'}
                        onChange={handleVoucherLimitChange}
                    />
                    Unlimited redemption
                </label>
                <label>
                    <input
                        type="radio"
                        value="limited"
                        name="voucher-limit"
                        checked={voucherLimit === 'limited'}
                        onChange={handleVoucherLimitChange}
                    />
                    Limited redemption
                </label>
            </div>
            <div>
                <label>
                    Redemption limit:
                    <input
                        type="number"
                        value={limitNumber}
                        onChange={handleUsageLimitChange}
                        min="1"
                        placeholder="Number of usage"
                        disabled={voucherLimit === 'unlimited'}
                    />
                </label>
            </div>
            <div>
                <label>
                    Valid until:
                    <input
                        type="date"
                        value={validUntil}
                        onChange={handleDateInput}
                    />
                </label>
            </div>
            <button onClick={handleCreate}>Create voucher</button>
        </form>
    );
};

export default VoucherSettings;