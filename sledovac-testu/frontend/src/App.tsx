import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './views/Dashboard';
import { Tests } from './views/Tests';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-brand-bg text-brand-text">
        <Sidebar />

        <main className="flex-1 px-10 py-8 overflow-y-auto">
          <TopNav />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/testy" element={<Tests />} />
          </Routes>
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;