import './App.css';
import VoucherManagement from './VoucherManagement';
import VoucherRedemption from './VoucherRedemption';
import VoucherProvider from './VoucherContext';

function App() {
  return (
    <VoucherProvider>
      <div className="App">
        <VoucherManagement />
        <VoucherRedemption />
      </div>
    </VoucherProvider>

  );
}

export default App;
