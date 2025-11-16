import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { WorkoutPlanner } from './components/WorkoutPlanner';
import { ActiveWorkout } from './components/ActiveWorkout';
import { WorkoutHistory } from './components/WorkoutHistory';
import { Statistics } from './components/Statistics';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { GoalSetting } from './components/GoalSetting';
import { Profile } from './components/Profile';
import { Home, Calendar, Dumbbell, BarChart3, Library, Target, User } from 'lucide-react';

type Screen = 'dashboard' | 'planner' | 'active' | 'history' | 'statistics' | 'library' | 'goals' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [activeWorkoutData, setActiveWorkoutData] = useState<any>(null);

  const startWorkout = (workout: any) => {
    setActiveWorkoutData(workout);
    setCurrentScreen('active');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} onStartWorkout={startWorkout} />;
      case 'planner':
        return <WorkoutPlanner onNavigate={setCurrentScreen} onStartWorkout={startWorkout} />;
      case 'active':
        return <ActiveWorkout workoutData={activeWorkoutData} onNavigate={setCurrentScreen} />;
      case 'history':
        return <WorkoutHistory onNavigate={setCurrentScreen} />;
      case 'statistics':
        return <Statistics onNavigate={setCurrentScreen} />;
      case 'library':
        return <ExerciseLibrary onNavigate={setCurrentScreen} />;
      case 'goals':
        return <GoalSetting onNavigate={setCurrentScreen} />;
      case 'profile':
        return <Profile onNavigate={setCurrentScreen} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} onStartWorkout={startWorkout} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-20">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1a1a1a] border-t border-gray-800">
          <div className="flex justify-around items-center px-4 py-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'dashboard' ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen('planner')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'planner' ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Plan</span>
            </button>
            <button
              onClick={() => setCurrentScreen('library')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'library' ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <Library className="w-5 h-5" />
              <span className="text-xs">Ćwiczenia</span>
            </button>
            <button
              onClick={() => setCurrentScreen('statistics')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'statistics' ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Statystyki</span>
            </button>
            <button
              onClick={() => setCurrentScreen('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentScreen === 'profile' ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profil</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
