import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './views/Dashboard';

function App() {
  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <Sidebar />

      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <TopNav />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;