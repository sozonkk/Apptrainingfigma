import { useState } from 'react';
import { Play, Trophy, Flame, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onStartWorkout: (workout: any) => void;
}

export function Dashboard({ onNavigate, onStartWorkout }: DashboardProps) {
  const todayWorkouts = [
    { id: 1, name: 'Trening Klatki i Tricepsów', exercises: 8, duration: '45 min', completed: false },
    { id: 2, name: 'Cardio HIIT', exercises: 5, duration: '25 min', completed: false },
  ];

  const weekStats = {
    workoutsCompleted: 4,
    totalMinutes: 235,
    caloriesBurned: 1850,
    currentStreak: 7,
  };

  const recentWorkouts = [
    { id: 1, name: 'Trening Pleców', date: '15 listopada', sets: 24, reps: 180 },
    { id: 2, name: 'Trening Nóg', date: '14 listopada', sets: 20, reps: 160 },
    { id: 3, name: 'Trening Ramion', date: '13 listopada', sets: 18, reps: 144 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Witaj ponownie! 👋</p>
            <h1 className="text-2xl mt-1">Twój postęp</h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center"
          >
            <span className="text-lg">💪</span>
          </button>
        </div>
      </div>

      {/* Weekly Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl">{weekStats.currentStreak}</p>
          <p className="text-gray-400 text-sm mt-1">dni z rzędu</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl">{weekStats.workoutsCompleted}</p>
          <p className="text-gray-400 text-sm mt-1">treningów w tym tygodniu</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <p className="text-gray-400 text-sm">Całkowity czas</p>
          <p className="text-2xl mt-2">{weekStats.totalMinutes}<span className="text-sm text-gray-400 ml-1">min</span></p>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <p className="text-gray-400 text-sm">Kalorie</p>
          <p className="text-2xl mt-2">{weekStats.caloriesBurned}<span className="text-sm text-gray-400 ml-1">kcal</span></p>
        </div>
      </div>

      {/* Today's Workouts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Dzisiejsze treningi</h2>
          <button
            onClick={() => onNavigate('planner')}
            className="text-emerald-400 text-sm flex items-center gap-1"
          >
            Zobacz wszystkie <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {todayWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="mb-2">{workout.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{workout.exercises} ćwiczeń</span>
                    <span>•</span>
                    <span>{workout.duration}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onStartWorkout(workout)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Rozpocznij trening
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Ostatnia aktywność</h2>
          <button
            onClick={() => onNavigate('history')}
            className="text-emerald-400 text-sm flex items-center gap-1"
          >
            Zobacz historię <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm">{workout.name}</p>
                  <p className="text-xs text-gray-400">{workout.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{workout.sets} serii</p>
                <p className="text-xs text-gray-400">{workout.reps} powtórzeń</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <button
          onClick={() => onNavigate('goals')}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/20 text-left"
        >
          <Calendar className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-sm">Ustaw cele</p>
        </button>
        <button
          onClick={() => onNavigate('library')}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-4 border border-orange-500/20 text-left"
        >
          <Trophy className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-sm">Biblioteka ćwiczeń</p>
        </button>
      </div>
    </div>
  );
}