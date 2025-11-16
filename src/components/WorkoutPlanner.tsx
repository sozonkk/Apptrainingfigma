import { useState } from 'react';
import { Plus, Calendar, Clock, Dumbbell, ChevronRight, Edit2, Trash2, Copy } from 'lucide-react';

interface WorkoutPlannerProps {
  onNavigate: (screen: string) => void;
  onStartWorkout: (workout: any) => void;
}

export function WorkoutPlanner({ onNavigate, onStartWorkout }: WorkoutPlannerProps) {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  const workoutPlans = [
    {
      id: 1,
      name: 'Trening Klatki i Tricepsów',
      category: 'Siła',
      exercises: [
        { name: 'Wyciskanie sztangi', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Wyciskanie hantli', sets: 4, reps: '10-12', rest: 60 },
        { name: 'Rozpiętki hantlami', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Wyciskanie francuskie', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Pompki na poręczach', sets: 3, reps: '12-15', rest: 60 },
      ],
      duration: 45,
      lastDone: '3 dni temu',
    },
    {
      id: 2,
      name: 'Trening Pleców i Bicepsów',
      category: 'Siła',
      exercises: [
        { name: 'Podciąganie', sets: 4, reps: '6-8', rest: 90 },
        { name: 'Wiosłowanie sztangą', sets: 4, reps: '8-10', rest: 90 },
        { name: 'Wiosłowanie hantlami', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Uginanie sztangi', sets: 3, reps: '10-12', rest: 60 },
        { name: 'Uginanie młotkiem', sets: 3, reps: '12-15', rest: 60 },
      ],
      duration: 50,
      lastDone: '5 dni temu',
    },
    {
      id: 3,
      name: 'Trening Nóg',
      category: 'Siła',
      exercises: [
        { name: 'Przysiad ze sztangą', sets: 4, reps: '8-10', rest: 120 },
        { name: 'Martwy ciąg', sets: 4, reps: '6-8', rest: 120 },
        { name: 'Wypychanie nóg', sets: 4, reps: '12-15', rest: 90 },
        { name: 'Uginanie nóg', sets: 3, reps: '12-15', rest: 60 },
        { name: 'Wspięcia na palce', sets: 4, reps: '15-20', rest: 45 },
      ],
      duration: 60,
      lastDone: 'Dziś',
    },
    {
      id: 4,
      name: 'HIIT Cardio',
      category: 'Cardio',
      exercises: [
        { name: 'Burpees', sets: 4, reps: '30s', rest: 30 },
        { name: 'Mountain climbers', sets: 4, reps: '30s', rest: 30 },
        { name: 'Jump squats', sets: 4, reps: '30s', rest: 30 },
        { name: 'High knees', sets: 4, reps: '30s', rest: 30 },
      ],
      duration: 20,
      lastDone: '1 dzień temu',
    },
  ];

  const handleCreateWorkout = () => {
    setView('create');
  };

  const handleEditWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setView('edit');
  };

  if (view === 'create' || view === 'edit') {
    return <WorkoutEditor onBack={() => setView('list')} workout={view === 'edit' ? selectedWorkout : null} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Plany treningowe</h1>
          <p className="text-gray-400 text-sm mt-1">{workoutPlans.length} planów gotowych do treningu</p>
        </div>
        <button
          onClick={handleCreateWorkout}
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-2xl p-4 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl mb-1">12</p>
            <p className="text-sm text-gray-400">Treningów w tym miesiącu</p>
          </div>
          <div className="text-right">
            <p className="text-2xl mb-1">580</p>
            <p className="text-sm text-gray-400">Minut aktywności</p>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className="space-y-3">
        <h2 className="text-lg">Obecny tydzień</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'].map((day, index) => (
            <div
              key={day}
              className={`rounded-xl p-3 text-center ${
                index === 2
                  ? 'bg-emerald-500 text-white'
                  : index < 2
                  ? 'bg-gray-800 text-gray-400'
                  : 'bg-[#1a1a1a] border border-gray-800 text-gray-400'
              }`}
            >
              <p className="text-xs mb-1">{day}</p>
              <p className="text-lg">{13 + index}</p>
              {index < 3 && (
                <div className="w-1 h-1 rounded-full bg-current mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plans List */}
      <div className="space-y-3">
        <h2 className="text-lg">Wszystkie plany</h2>
        <div className="space-y-3">
          {workoutPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{plan.name}</h3>
                    <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs">
                      {plan.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {plan.exercises.length} ćwiczeń
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {plan.duration} min
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Ostatnio: {plan.lastDone}</p>
                </div>
              </div>

              {/* Exercise List Preview */}
              <div className="space-y-2 mb-3 bg-black/20 rounded-xl p-3">
                {plan.exercises.slice(0, 3).map((exercise, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{exercise.name}</span>
                    <span className="text-gray-500">
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>
                ))}
                {plan.exercises.length > 3 && (
                  <p className="text-xs text-gray-500 text-center pt-1">
                    +{plan.exercises.length - 3} więcej
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onStartWorkout(plan)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 py-2.5 transition-colors"
                >
                  Rozpocznij
                </button>
                <button
                  onClick={() => handleEditWorkout(plan)}
                  className="px-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="px-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="px-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Suggestions */}
      <div className="space-y-3 pb-4">
        <h2 className="text-lg">Sugerowane szablony</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCreateWorkout}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/20 text-left"
          >
            <p className="mb-1">Push/Pull/Legs</p>
            <p className="text-xs text-gray-400">Klasyczny split 3-dniowy</p>
          </button>
          <button
            onClick={handleCreateWorkout}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/20 text-left"
          >
            <p className="mb-1">Full Body</p>
            <p className="text-xs text-gray-400">Kompleksowy trening</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Workout Editor Component
function WorkoutEditor({ onBack, workout }: { onBack: () => void; workout: any }) {
  const [workoutName, setWorkoutName] = useState(workout?.name || '');
  const [selectedCategory, setSelectedCategory] = useState(workout?.category || 'Siła');
  const [exercises, setExercises] = useState(workout?.exercises || []);

  const categories = ['Siła', 'Cardio', 'Wytrzymałość', 'Rozciąganie', 'Funkcjonalny'];

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: '10', rest: 60 }]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Powrót
        </button>
        <h1 className="text-xl">{workout ? 'Edytuj plan' : 'Nowy plan'}</h1>
        <button className="px-4 py-2 bg-emerald-500 rounded-xl">
          Zapisz
        </button>
      </div>

      {/* Workout Name */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Nazwa treningu</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="np. Trening klatki piersiowej"
          className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder:text-gray-600"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Kategoria</label>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-400 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Ćwiczenia</label>
          <button
            onClick={addExercise}
            className="text-emerald-400 text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Dodaj ćwiczenie
          </button>
        </div>

        <div className="space-y-3">
          {exercises.map((exercise: any, index: number) => (
            <div key={index} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].name = e.target.value;
                  setExercises(newExercises);
                }}
                placeholder="Nazwa ćwiczenia"
                className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder:text-gray-600 mb-3"
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Serie</label>
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].sets = parseInt(e.target.value);
                      setExercises(newExercises);
                    }}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Powtórzenia</label>
                  <input
                    type="text"
                    value={exercise.reps}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].reps = e.target.value;
                      setExercises(newExercises);
                    }}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Przerwa (s)</label>
                  <input
                    type="number"
                    value={exercise.rest}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[index].rest = parseInt(e.target.value);
                      setExercises(newExercises);
                    }}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={() => {}}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 py-4 transition-colors"
        >
          {workout ? 'Zapisz zmiany' : 'Utwórz plan treningowy'}
        </button>
      </div>
    </div>
  );
}