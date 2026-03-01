import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <Sidebar />

      <main className="flex-1 p-8">
      </main>
    </div>
  );
}

export default App;