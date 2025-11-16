import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Dumbbell, Clock, Flame } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface StatisticsProps {
  onNavigate: (screen: string) => void;
}

export function Statistics({ onNavigate }: StatisticsProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const weeklyData = [
    { day: 'Pon', workouts: 2, duration: 90 },
    { day: 'Wt', workouts: 1, duration: 45 },
    { day: 'Śr', workouts: 2, duration: 95 },
    { day: 'Czw', workouts: 1, duration: 50 },
    { day: 'Pt', workouts: 2, duration: 88 },
    { day: 'Sob', workouts: 1, duration: 60 },
    { day: 'Ndz', workouts: 0, duration: 0 },
  ];

  const volumeData = [
    { week: 'T1', volume: 4200 },
    { week: 'T2', volume: 4650 },
    { week: 'T3', volume: 5100 },
    { week: 'T4', volume: 5450 },
  ];

  const muscleGroupData = [
    { name: 'Klatka', value: 24, color: '#10b981' },
    { name: 'Plecy', value: 22, color: '#3b82f6' },
    { name: 'Nogi', value: 20, color: '#f59e0b' },
    { name: 'Ramiona', value: 18, color: '#8b5cf6' },
    { name: 'Cardio', value: 16, color: '#ef4444' },
  ];

  const progressData = [
    { exercise: 'Przysiad', weight: [80, 85, 90, 95, 100], weeks: ['T1', 'T2', 'T3', 'T4', 'T5'] },
    { exercise: 'Wyciskanie', weight: [70, 72, 75, 77, 80], weeks: ['T1', 'T2', 'T3', 'T4', 'T5'] },
    { exercise: 'Martwy ciąg', weight: [100, 105, 110, 115, 120], weeks: ['T1', 'T2', 'T3', 'T4', 'T5'] },
  ];

  const stats = {
    totalWorkouts: 58,
    totalDuration: 2840, // minutes
    avgDuration: 49,
    totalVolume: 142500, // kg
    currentStreak: 14,
    longestStreak: 21,
    totalCalories: 18250,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-1">Statystyki</h1>
        <p className="text-gray-400 text-sm">Analiza twoich postępów</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {[
          { id: 'week', label: 'Tydzień' },
          { id: 'month', label: 'Miesiąc' },
          { id: 'year', label: 'Rok' },
        ].map((range) => (
          <button
            key={range.id}
            onClick={() => setTimeRange(range.id as any)}
            className={`px-4 py-2 rounded-xl transition-colors ${
              timeRange === range.id
                ? 'bg-emerald-500 text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-gray-800'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-2">
            <Dumbbell className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <p className="text-3xl mb-1">{stats.totalWorkouts}</p>
          <p className="text-sm text-gray-400">Treningów w miesiącu</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {stats.currentStreak}
            </span>
          </div>
          <p className="text-3xl mb-1">{stats.longestStreak}</p>
          <p className="text-sm text-gray-400">Najdłuższa passa</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <Clock className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-3xl mb-1">{Math.floor(stats.totalDuration / 60)}h</p>
          <p className="text-sm text-gray-400">Całkowity czas</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <TrendingUp className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-3xl mb-1">{(stats.totalVolume / 1000).toFixed(1)}t</p>
          <p className="text-sm text-gray-400">Objętość ogółem</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Aktywność tygodniowa</h2>
          <span className="text-sm text-gray-400">{stats.avgDuration} min średnio</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <XAxis
              dataKey="day"
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="duration" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Progress */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Postęp objętości</h2>
          <span className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +29.8%
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={volumeData}>
            <XAxis
              dataKey="week"
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Muscle Group Distribution */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
        <h2 className="text-lg mb-4">Rozkład grup mięśniowych</h2>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="40%" height={160}>
            <PieChart>
              <Pie
                data={muscleGroupData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {muscleGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {muscleGroupData.map((group) => (
              <div key={group.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-sm text-gray-300">{group.name}</span>
                </div>
                <span className="text-sm text-gray-400">{group.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Records */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
        <h2 className="text-lg mb-4">Rekordy osobiste</h2>
        <div className="space-y-3">
          {progressData.map((record) => (
            <div key={record.exercise} className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{record.exercise}</span>
                <span className="text-emerald-400 text-lg">
                  {record.weight[record.weight.length - 1]} kg
                </span>
              </div>
              <div className="flex items-center gap-1">
                {record.weight.map((weight, idx) => {
                  const prevWeight = idx > 0 ? record.weight[idx - 1] : weight;
                  const isIncrease = weight > prevWeight;
                  return (
                    <div key={idx} className="flex-1">
                      <div
                        className="h-2 rounded-full bg-gradient-to-t from-emerald-500 to-emerald-400"
                        style={{ height: `${(weight / Math.max(...record.weight)) * 32}px` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{record.weeks[0]}</span>
                <span>{record.weeks[record.weeks.length - 1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-5 border border-blue-500/20">
        <h2 className="text-lg mb-4">Podsumowanie miesiąca</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Kalorie spalone</p>
            <p className="text-2xl">{stats.totalCalories.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Średni czas</p>
            <p className="text-2xl">{stats.avgDuration} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Treningi/tydzień</p>
            <p className="text-2xl">5.2</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Najlepszy dzień</p>
            <p className="text-2xl">Śr</p>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Cele miesiąca</h2>
          <button
            onClick={() => onNavigate('goals')}
            className="text-emerald-400 text-sm"
          >
            Edytuj
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Treningi (20/20)</span>
              <span className="text-emerald-400 text-sm">100%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Kalorie (18250/20000)</span>
              <span className="text-emerald-400 text-sm">91%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '91%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Objętość (142.5t/150t)</span>
              <span className="text-yellow-400 text-sm">95%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: '95%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
