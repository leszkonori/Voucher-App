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