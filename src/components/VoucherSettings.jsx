import { useContext, useState, useEffect } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';

const VoucherSettings = () => {
    const { createVoucher } = useContext(VoucherContext);

    const [voucherLimit, setVoucherLimit] = useState(false);
    const [limitNumber, setLimitNumber] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [validUntil, setValidUntil] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setValidUntil(today);
    }, []);

    function handleCodeInput(event) {
        setVoucherCode(event.target.value);
    }

    const handleVoucherLimitChange = (e) => {
        setVoucherLimit(e.target.value === 'true');

        if (e.target.value === 'false') {
            setLimitNumber('');
        }
    };

    const handleLimitNumberChange = (e) => {
        if(e.target.value === '' || /^[1-9]\d*$/.test(e.target.value))
            setLimitNumber(e.target.value);
    };

    function handleDateInput(event) {
        setValidUntil(event.target.value);
    }

    function handleCreate(event) {
        event.preventDefault();

        const newVoucher = {
            code: voucherCode,
            limited: voucherLimit,
            limitNumber: limitNumber,
            validUntil: validUntil,
            redeemed: false,
        };
        createVoucher(newVoucher);
        setVoucherLimit(false);
        setLimitNumber('');
        setVoucherCode('');
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
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="mr-6">
                    <input
                        className="mr-1"
                        type="radio"
                        value='false'
                        name="voucher-limit"
                        checked={voucherLimit === false}
                        onChange={handleVoucherLimitChange}
                    />
                    Unlimited redemption
                </label>
                <label>
                    <input
                        className="mr-1"
                        type="radio"
                        value='true'
                        name="voucher-limit"
                        checked={voucherLimit === true}
                        onChange={handleVoucherLimitChange}
                    />
                    Limited redemption
                </label>
            </div>
            {voucherLimit &&
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