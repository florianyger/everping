import { Route, Routes } from 'react-router-dom';

import ThemeProvider from './store/ThemeProvider';

import Layout from './views/Layout';
import ComputerFleet from './views/computerFleet/ComputerFleet';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ComputerFleet clientId="Ullrich" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
