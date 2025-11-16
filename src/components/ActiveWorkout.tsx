import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Check, X, Timer, TrendingUp, Plus, Minus } from 'lucide-react';

interface ActiveWorkoutProps {
  workoutData: any;
  onNavigate: (screen: string) => void;
}

export function ActiveWorkout({ workoutData, onNavigate }: ActiveWorkoutProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSets, setCompletedSets] = useState<any>({});

  const exercises = workoutData?.exercises || [
    { name: 'Wyciskanie sztangi', sets: 4, reps: '8-10', rest: 90 },
    { name: 'Wyciskanie hantli', sets: 4, reps: '10-12', rest: 60 },
    { name: 'Rozpiętki hantlami', sets: 3, reps: '12-15', rest: 60 },
  ];

  const currentExercise = exercises[currentExerciseIndex];
  const targetReps = parseInt(currentExercise.reps.split('-')[0]);

  // Workout timer
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setWorkoutTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Rest timer
  useEffect(() => {
    if (isResting && restTimer > 0 && !isPaused) {
      const interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isResting, restTimer, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    const key = `${currentExerciseIndex}-${currentSet}`;
    setCompletedSets({ ...completedSets, [key]: repsCompleted });

    if (currentSet < currentExercise.sets) {
      // Next set
      setCurrentSet(currentSet + 1);
      setRepsCompleted(0);
      setIsResting(true);
      setRestTimer(currentExercise.rest);
    } else if (currentExerciseIndex < exercises.length - 1) {
      // Next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setRepsCompleted(0);
      setIsResting(true);
      setRestTimer(currentExercise.rest);
    } else {
      // Workout complete
      handleFinishWorkout();
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimer(0);
  };

  const handleFinishWorkout = () => {
    // Show completion screen or navigate
    alert('Trening ukończony! Świetna robota! 🎉');
    onNavigate('dashboard');
  };

  const totalSets = exercises.reduce((acc: number, ex: any) => acc + ex.sets, 0);
  const completedSetsCount = Object.keys(completedSets).length;
  const progress = (completedSetsCount / totalSets) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (confirm('Czy na pewno chcesz zakończyć trening?')) {
              onNavigate('dashboard');
            }
          }}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-400">Czas treningu</p>
          <p className="text-2xl">{formatTime(workoutTimer)}</p>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Postęp treningu</p>
          <p className="text-sm text-emerald-400">{Math.round(progress)}%</p>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Serie {completedSetsCount} z {totalSets}
        </p>
      </div>

      {/* Rest Timer (if resting) */}
      {isResting && (
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-3xl p-8 border border-orange-500/20 mb-6 text-center">
          <Timer className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <p className="text-sm text-gray-400 mb-2">Przerwa</p>
          <p className="text-6xl mb-6">{restTimer}s</p>
          <button
            onClick={handleSkipRest}
            className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-3 transition-colors"
          >
            Pomiń przerwę
          </button>
        </div>
      )}

      {/* Current Exercise Card */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-3xl p-6 border border-emerald-500/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
              Ćwiczenie {currentExerciseIndex + 1}/{exercises.length}
            </span>
            <span className="text-gray-400 text-sm">
              Seria {currentSet}/{currentExercise.sets}
            </span>
          </div>

          <h2 className="text-3xl mb-2">{currentExercise.name}</h2>
          <p className="text-gray-400 mb-6">
            Cel: {currentExercise.reps} powtórzeń • {currentExercise.rest}s przerwy
          </p>

          {/* Rep Counter */}
          <div className="bg-black/30 rounded-2xl p-8 mb-6">
            <p className="text-center text-sm text-gray-400 mb-2">Powtórzenia</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setRepsCompleted(Math.max(0, repsCompleted - 1))}
                className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-7xl min-w-[120px] text-center">{repsCompleted}</div>
              <button
                onClick={() => setRepsCompleted(repsCompleted + 1)}
                className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            {repsCompleted >= targetReps && (
              <p className="text-center text-emerald-400 text-sm mt-4">
                ✓ Cel osiągnięty!
              </p>
            )}
          </div>

          {/* Complete Set Button */}
          <button
            onClick={handleCompleteSet}
            disabled={repsCompleted === 0 || isResting}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl py-4 flex items-center justify-center gap-2 transition-colors text-lg"
          >
            <Check className="w-5 h-5" />
            Ukończ serię
          </button>
        </div>

        {/* Exercise History for current workout */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400 mb-2">Historia serii</p>
          <div className="space-y-2 max-h-32 overflow-auto">
            {exercises.map((exercise: any, exIdx: number) => {
              const sets = Array.from({ length: exercise.sets }, (_, setIdx) => {
                const key = `${exIdx}-${setIdx + 1}`;
                return completedSets[key];
              });

              if (sets.filter((s) => s !== undefined).length === 0) return null;

              return (
                <div key={exIdx} className="bg-gray-800/50 rounded-lg p-2">
                  <p className="text-xs text-gray-400 mb-1">{exercise.name}</p>
                  <div className="flex gap-2">
                    {sets.map((reps, setIdx) => (
                      <div
                        key={setIdx}
                        className={`px-2 py-1 rounded text-xs ${
                          reps !== undefined
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-gray-700 text-gray-500'
                        }`}
                      >
                        {reps !== undefined ? `${reps} reps` : '-'}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Exercise List Preview */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <p className="text-sm text-gray-400 mb-3">Następne ćwiczenia</p>
        <div className="space-y-2">
          {exercises.slice(currentExerciseIndex + 1, currentExerciseIndex + 3).map((exercise: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
              <span className="text-sm">{exercise.name}</span>
              <span className="text-xs text-gray-500">
                {exercise.sets} × {exercise.reps}
              </span>
            </div>
          ))}
          {currentExerciseIndex >= exercises.length - 1 && (
            <div className="text-center py-4">
              <p className="text-emerald-400 text-sm">To ostatnie ćwiczenie! 💪</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
