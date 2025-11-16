import { useState } from 'react';
import { Calendar, TrendingUp, Clock, Dumbbell, ChevronRight, Filter } from 'lucide-react';

interface WorkoutHistoryProps {
  onNavigate: (screen: string) => void;
}

export function WorkoutHistory({ onNavigate }: WorkoutHistoryProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  const workoutHistory = [
    {
      id: 1,
      name: 'Trening Pleców i Bicepsów',
      date: '16 listopada 2024',
      time: '18:30',
      duration: 52,
      exercises: 5,
      totalSets: 18,
      totalReps: 234,
      volume: 4850, // kg
      calories: 420,
      category: 'Siła',
      exercises_detail: [
        { name: 'Podciąganie', sets: [8, 7, 6, 6], weight: [0, 0, 0, 0] },
        { name: 'Wiosłowanie sztangą', sets: [10, 10, 8, 8], weight: [80, 80, 80, 80] },
        { name: 'Wiosłowanie hantlami', sets: [12, 11, 10], weight: [30, 30, 30] },
        { name: 'Uginanie sztangi', sets: [12, 10, 10], weight: [40, 40, 40] },
        { name: 'Uginanie młotkiem', sets: [15, 12, 12], weight: [16, 16, 16] },
      ],
    },
    {
      id: 2,
      name: 'Trening Nóg',
      date: '15 listopada 2024',
      time: '17:00',
      duration: 68,
      exercises: 5,
      totalSets: 19,
      totalReps: 198,
      volume: 6240,
      calories: 580,
      category: 'Siła',
      exercises_detail: [
        { name: 'Przysiad ze sztangą', sets: [10, 8, 8, 6], weight: [100, 100, 110, 110] },
        { name: 'Martwy ciąg', sets: [8, 6, 6, 5], weight: [120, 130, 130, 140] },
        { name: 'Wypychanie nóg', sets: [15, 12, 12, 10], weight: [180, 180, 200, 200] },
        { name: 'Uginanie nóg', sets: [15, 12, 10], weight: [50, 50, 50] },
        { name: 'Wspięcia na palce', sets: [20, 18, 16, 15], weight: [100, 100, 100, 100] },
      ],
    },
    {
      id: 3,
      name: 'HIIT Cardio',
      date: '14 listopada 2024',
      time: '08:00',
      duration: 25,
      exercises: 4,
      totalSets: 16,
      totalReps: 0,
      volume: 0,
      calories: 320,
      category: 'Cardio',
      exercises_detail: [
        { name: 'Burpees', sets: ['30s', '30s', '30s', '30s'], weight: [0, 0, 0, 0] },
        { name: 'Mountain climbers', sets: ['30s', '30s', '30s', '30s'], weight: [0, 0, 0, 0] },
        { name: 'Jump squats', sets: ['30s', '30s', '30s', '30s'], weight: [0, 0, 0, 0] },
        { name: 'High knees', sets: ['30s', '30s', '30s', '30s'], weight: [0, 0, 0, 0] },
      ],
    },
    {
      id: 4,
      name: 'Trening Klatki i Tricepsów',
      date: '13 listopada 2024',
      time: '18:45',
      duration: 48,
      exercises: 5,
      totalSets: 17,
      totalReps: 192,
      volume: 3920,
      calories: 380,
      category: 'Siła',
      exercises_detail: [
        { name: 'Wyciskanie sztangi', sets: [10, 8, 8, 6], weight: [80, 80, 85, 85] },
        { name: 'Wyciskanie hantli', sets: [12, 10, 10, 8], weight: [32, 32, 34, 34] },
        { name: 'Rozpiętki hantlami', sets: [15, 12, 12], weight: [18, 18, 18] },
        { name: 'Wyciskanie francuskie', sets: [12, 10, 10], weight: [30, 30, 30] },
        { name: 'Pompki na poręczach', sets: [15, 12, 10], weight: [0, 0, 0] },
      ],
    },
    {
      id: 5,
      name: 'Trening Ramion',
      date: '12 listopada 2024',
      time: '17:30',
      duration: 42,
      exercises: 6,
      totalSets: 18,
      totalReps: 216,
      volume: 2880,
      calories: 340,
      category: 'Siła',
      exercises_detail: [
        { name: 'Wyciskanie sztangi stojąc', sets: [10, 8, 8], weight: [50, 50, 52] },
        { name: 'Arnoldy', sets: [12, 10, 10], weight: [20, 20, 20] },
        { name: 'Wznosy bokiem', sets: [15, 12, 12], weight: [12, 12, 12] },
        { name: 'Wznosy w przód', sets: [15, 12, 12], weight: [10, 10, 10] },
        { name: 'Face pulls', sets: [15, 15, 12], weight: [40, 40, 40] },
        { name: 'Wznosy tyłem', sets: [15, 15, 12], weight: [8, 8, 8] },
      ],
    },
  ];

  const filters = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'strength', label: 'Siła' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'week', label: 'Ten tydzień' },
    { id: 'month', label: 'Ten miesiąc' },
  ];

  if (selectedWorkout) {
    return <WorkoutDetail workout={selectedWorkout} onBack={() => setSelectedWorkout(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-1">Historia treningów</h1>
        <p className="text-gray-400 text-sm">Przeglądaj swoje osiągnięcia</p>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-2xl p-5 border border-emerald-500/20">
        <p className="text-sm text-gray-400 mb-3">W tym miesiącu</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl mb-1">24</p>
            <p className="text-xs text-gray-400">Treningów</p>
          </div>
          <div>
            <p className="text-2xl mb-1">18.5h</p>
            <p className="text-xs text-gray-400">Czas</p>
          </div>
          <div>
            <p className="text-2xl mb-1">9.2k</p>
            <p className="text-xs text-gray-400">Kalorie</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              selectedFilter === filter.id
                ? 'bg-emerald-500 text-white'
                : 'bg-[#1a1a1a] text-gray-400 border border-gray-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Workout List */}
      <div className="space-y-3 pb-4">
        {workoutHistory.map((workout) => (
          <button
            key={workout.id}
            onClick={() => setSelectedWorkout(workout)}
            className="w-full bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 text-left hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg">{workout.name}</h3>
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    workout.category === 'Siła'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {workout.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{workout.date}</span>
                  <span>•</span>
                  <span>{workout.time}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-1">Czas</p>
                <p className="text-sm">{workout.duration} min</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-1">Serie</p>
                <p className="text-sm">{workout.totalSets}</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-1">Reps</p>
                <p className="text-sm">{workout.totalReps}</p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-1">Kcal</p>
                <p className="text-sm">{workout.calories}</p>
              </div>
            </div>

            {workout.volume > 0 && (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>Objętość: {workout.volume} kg</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Workout Detail Component
function WorkoutDetail({ workout, onBack }: { workout: any; onBack: () => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Powrót
        </button>
        <button className="text-emerald-400 text-sm">Powtórz trening</button>
      </div>

      {/* Workout Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl">{workout.name}</h1>
          <span className={`px-2 py-1 rounded-lg text-xs ${
            workout.category === 'Siła'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-orange-500/20 text-orange-400'
          }`}>
            {workout.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{workout.date}</span>
          <span>•</span>
          <span>{workout.time}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20">
          <Clock className="w-6 h-6 text-emerald-400 mb-2" />
          <p className="text-2xl mb-1">{workout.duration}</p>
          <p className="text-sm text-gray-400">Minut</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-500/20">
          <Dumbbell className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-2xl mb-1">{workout.totalSets}</p>
          <p className="text-sm text-gray-400">Serie</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Powtórzenia</p>
          <p className="text-2xl">{workout.totalReps}</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Kalorie</p>
          <p className="text-2xl">{workout.calories}</p>
        </div>
      </div>

      {workout.volume > 0 && (
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 border border-blue-500/20">
          <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-2xl mb-1">{workout.volume} kg</p>
          <p className="text-sm text-gray-400">Całkowita objętość</p>
        </div>
      )}

      {/* Exercise Details */}
      <div className="space-y-3">
        <h2 className="text-lg">Ćwiczenia</h2>
        <div className="space-y-3">
          {workout.exercises_detail.map((exercise: any, index: number) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
            >
              <h3 className="mb-3">{exercise.name}</h3>
              <div className="space-y-2">
                {exercise.sets.map((reps: any, setIndex: number) => {
                  const weight = exercise.weight[setIndex];
                  return (
                    <div
                      key={setIndex}
                      className="flex items-center justify-between bg-black/20 rounded-lg p-3"
                    >
                      <span className="text-sm text-gray-400">Seria {setIndex + 1}</span>
                      <div className="flex items-center gap-3">
                        {weight > 0 && (
                          <span className="text-sm text-gray-400">{weight} kg</span>
                        )}
                        <span className="text-sm text-emerald-400 min-w-[60px] text-right">
                          {reps} {typeof reps === 'number' ? 'reps' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-800 text-sm text-gray-400">
                Łącznie: {exercise.sets.length} serii
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-4 transition-colors">
          Rozpocznij ten sam trening
        </button>
      </div>
    </div>
  );
}
