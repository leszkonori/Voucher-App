import { useState, useContext } from 'react';
import { VoucherContext } from './VoucherContext';

export default function RedeemVoucher() {
    const [inputCode, setInputCode] = useState('');

    const { vouchers, redeemVoucher } = useContext(VoucherContext);

    function handleCodeInput(event) {
        setInputCode(event.target.value);
    }
    function handleRedeem(event) {
        event.preventDefault();

        redeemVoucher(inputCode);
    }

    return (
        <form>
            <div>
                <label>
                    Your code:
                    <input type="text" value={inputCode} onChange={handleCodeInput} />
                </label>
            </div>
            <button onClick={handleRedeem}>Redeem</button>
        </form>

    );
}