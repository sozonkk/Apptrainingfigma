import { useState } from 'react';
import { User, Settings, Award, TrendingUp, Calendar, Heart, LogOut, ChevronRight, Edit } from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [view, setView] = useState<'profile' | 'settings'>('profile');

  const userStats = {
    name: 'Kacper',
    joinDate: 'Styczeń 2024',
    totalWorkouts: 142,
    totalHours: 118,
    currentStreak: 14,
    longestStreak: 28,
    level: 12,
    nextLevelProgress: 65,
  };

  const badges = [
    { id: 1, name: '30 dni z rzędu', icon: '🔥', unlocked: true },
    { id: 2, name: '100 treningów', icon: '💯', unlocked: true },
    { id: 3, name: 'Przysiad 100kg', icon: '💪', unlocked: true },
    { id: 4, name: '50h aktywności', icon: '⏱️', unlocked: true },
    { id: 5, name: 'Rannie ptaszki', icon: '🌅', unlocked: false },
    { id: 6, name: '200 treningów', icon: '🏆', unlocked: false },
  ];

  const personalRecords = [
    { exercise: 'Przysiad', weight: 120, date: 'Listopad 2024' },
    { exercise: 'Wyciskanie', weight: 85, date: 'Listopad 2024' },
    { exercise: 'Martwy ciąg', weight: 140, date: 'Październik 2024' },
    { exercise: 'Wyciskanie stojąc', weight: 60, date: 'Listopad 2024' },
  ];

  if (view === 'settings') {
    return <SettingsView onBack={() => setView('profile')} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Avatar */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-4xl">
            💪
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#0a0a0a]">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl mb-1">{userStats.name}</h1>
          <p className="text-gray-400 text-sm">Trenuję od {userStats.joinDate}</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-2xl p-5 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">Twój poziom</p>
            <p className="text-3xl">Poziom {userStats.level}</p>
          </div>
          <Award className="w-12 h-12 text-emerald-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Postęp do poziomu {userStats.level + 1}</span>
            <span>{userStats.nextLevelProgress}%</span>
          </div>
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              style={{ width: `${userStats.nextLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
          <p className="text-2xl mb-1">{userStats.totalWorkouts}</p>
          <p className="text-sm text-gray-400">Treningów</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <Calendar className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-2xl mb-1">{userStats.totalHours}h</p>
          <p className="text-sm text-gray-400">Łączny czas</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <Heart className="w-6 h-6 text-red-400 mb-2" />
          <p className="text-2xl mb-1">{userStats.currentStreak}</p>
          <p className="text-sm text-gray-400">Obecna passa</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <Award className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-2xl mb-1">{userStats.longestStreak}</p>
          <p className="text-sm text-gray-400">Najdłuższa passa</p>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-3">
        <h2 className="text-lg">Odznaki</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-xl p-4 border text-center ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-500/20'
                  : 'bg-gray-800/30 border-gray-800 opacity-40'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Records */}
      <div className="space-y-3">
        <h2 className="text-lg">Rekordy osobiste</h2>
        <div className="space-y-2">
          {personalRecords.map((record, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex items-center justify-between"
            >
              <div>
                <p className="mb-1">{record.exercise}</p>
                <p className="text-xs text-gray-400">{record.date}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-emerald-400">{record.weight}</p>
                <p className="text-xs text-gray-400">kg</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Options */}
      <div className="space-y-2">
        <button
          onClick={() => setView('settings')}
          className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex items-center justify-between hover:border-emerald-500/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>Ustawienia</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-400" />
            <span>Osiągnięcia</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-gray-400" />
            <span>Zdrowie i fitness</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <button className="w-full bg-red-500/10 rounded-xl p-4 border border-red-500/20 flex items-center justify-between hover:bg-red-500/20 transition-colors">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Wyloguj się</span>
          </div>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 pb-4">
        <p>FitTrack Pro v1.0.0</p>
        <p className="mt-1">© 2024 Wszystkie prawa zastrzeżone</p>
      </div>
    </div>
  );
}

// Settings View Component
function SettingsView({ onBack }: { onBack: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Powrót
        </button>
        <h1 className="text-xl">Ustawienia</h1>
        <div className="w-10" />
      </div>

      {/* Account Settings */}
      <div className="space-y-3">
        <h2 className="text-lg">Konto</h2>
        <div className="space-y-2">
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Edytuj profil</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Zmień hasło</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Preferencje treningu</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <h2 className="text-lg">Powiadomienia</h2>
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span>Powiadomienia push</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-emerald-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>Efekty dźwiękowe</span>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEffects ? 'bg-emerald-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Units */}
      <div className="space-y-3">
        <h2 className="text-lg">Jednostki</h2>
        <div className="space-y-2">
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Waga</span>
            <span className="text-emerald-400">Kilogramy (kg)</span>
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Odległość</span>
            <span className="text-emerald-400">Kilometry (km)</span>
          </button>
        </div>
      </div>

      {/* Data */}
      <div className="space-y-3">
        <h2 className="text-lg">Dane</h2>
        <div className="space-y-2">
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Eksportuj dane</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Backup danych</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-red-500/10 rounded-xl p-4 border border-red-500/20 text-left">
            <span className="text-red-400">Usuń wszystkie dane</span>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="space-y-3">
        <h2 className="text-lg">O aplikacji</h2>
        <div className="space-y-2">
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Pomoc i wsparcie</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Polityka prywatności</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-left flex items-center justify-between">
            <span>Warunki użytkowania</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
