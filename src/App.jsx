import './App.css';
import VoucherManagement from './components/VoucherManagement';
import VoucherRedemption from './components/VoucherRedemption';
import VoucherProvider from './contexts/VoucherContext';

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
