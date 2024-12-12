import { useState, useContext } from 'react';
import { VoucherContext } from '../contexts/VoucherContext';

export default function RedeemVoucher({ messageSetter }) {
    const [inputCode, setInputCode] = useState('');

    const { redeemVoucher } = useContext(VoucherContext);

    function handleCodeInput(event) {
        setInputCode(event.target.value);
    }
    function handleRedeem(event) {
        event.preventDefault();
        const message = redeemVoucher(inputCode);
        messageSetter(message);
        setInputCode('');
    }

    return (
        <form className="flex flex-col items-center">
            <div className="mb-3">
                <label>
                    Your code:
                    <input
                        className="p-1 ml-2 text-base border-solid border-gray-300 border-2 rounded-md"
                        type="text" value={inputCode} onChange={handleCodeInput} />
                </label>
            </div>
            <button
                className="border-black border-solid border-2 rounded-lg p-2 text-base font-bold shadow-md shadow-black
                active:shadow-none"
                onClick={handleRedeem}>Redeem</button>
        </form>

    );
}