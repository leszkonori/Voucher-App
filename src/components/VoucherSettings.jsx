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

    const handleLimitNumberChange = (e) => {
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
        <form className="flex flex-col items-center">
            <div className="mb-3">
                <label>
                    Voucher Code:
                    <input
                        className="p-1 ml-2 text-base border-solid border-gray-300 border-2 rounded-md"
                        type="text"
                        value={voucherCode}
                        onChange={handleCodeInput}
                        required
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="mr-6">
                    <input
                        className="mr-1"
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
                        className="mr-1"
                        type="radio"
                        value="limited"
                        name="voucher-limit"
                        checked={voucherLimit === 'limited'}
                        onChange={handleVoucherLimitChange}
                    />
                    Limited redemption
                </label>
            </div>
            {voucherLimit === 'limited' &&
                <div className="mb-3">
                    <label>
                        Redemption limit:
                        <input
                            className="ml-2 border-2 border-solid border-gray-300 rounded-md p-1 w-14"
                            type="number"
                            value={limitNumber}
                            onChange={handleLimitNumberChange}
                            min="1"
                        />
                    </label>
                </div>}
            <div className="mb-3">
                <label>
                    Valid until:
                    <input
                        className="ml-2 border-2 border-solid border-gray-300 rounded-md"
                        type="date"
                        value={validUntil}
                        onChange={handleDateInput}
                    />
                </label>
            </div>
            <button
                className="border-black border-solid border-2 rounded-lg p-2 text-base font-bold shadow-md shadow-black
                active:shadow-none"
                type="submit" onClick={handleCreate}>Create voucher</button>
        </form>
    );
};

export default VoucherSettings;