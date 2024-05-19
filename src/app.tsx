import { Navbar } from './components';
import { AppProvider } from './providers';
const App = () => {
  return (
    <AppProvider>
      <Navbar />
    </AppProvider>
  );
};

export default App;
