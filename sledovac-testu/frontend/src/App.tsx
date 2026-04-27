import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './views/Dashboard';
import { Tests } from './views/Tests';
import { Groups } from './views/Groups';
import { CalendarView } from './views/Calendar';
import { TestsDetail } from './views/TestsDetail';
import { Subjects } from './views/Subjects';
import { SignIn } from './views/SignIn';

const AppContent = () => {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/signin';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text">
      <Sidebar />
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <TopNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testy" element={<Tests />} />
          <Route path="/testy/:id" element={<TestsDetail />} />
          <Route path="/skupiny" element={<Groups />} />
          <Route path="/kalendar" element={<CalendarView />} />
          <Route path="/predmety" element={<Subjects />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;