import './App.css';
import VoucherManagement from './components/VoucherManagement';
import VoucherRedemption from './components/VoucherRedemption';
import VoucherProvider from './contexts/VoucherContext';

function App() {

  return (
    <VoucherProvider>
      <div className="flex flex-col gap-12 md:items-center md:justify-evenly md:flex-row md:h-screen text-lg font-serif">
        <VoucherManagement />
        <VoucherRedemption />
      </div>
    </VoucherProvider>
  );
}

export default App;
