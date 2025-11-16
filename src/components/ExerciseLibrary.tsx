import { useState } from 'react';
import { Search, Filter, Dumbbell, Heart, Clock, TrendingUp, Play, BookOpen } from 'lucide-react';

interface ExerciseLibraryProps {
  onNavigate: (screen: string) => void;
}

export function ExerciseLibrary({ onNavigate }: ExerciseLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'Wszystkie', icon: Dumbbell },
    { id: 'chest', label: 'Klatka', icon: Heart },
    { id: 'back', label: 'Plecy', icon: TrendingUp },
    { id: 'legs', label: 'Nogi', icon: TrendingUp },
    { id: 'arms', label: 'Ramiona', icon: Dumbbell },
    { id: 'shoulders', label: 'Barki', icon: Dumbbell },
    { id: 'core', label: 'Brzuch', icon: Heart },
  ];

  const exercises = [
    {
      id: 1,
      name: 'Wyciskanie sztangi leżąc',
      category: 'chest',
      difficulty: 'Średni',
      equipment: 'Sztanga',
      muscleGroups: ['Klatka piersiowa', 'Triceps', 'Barki przednie'],
      description: 'Podstawowe ćwiczenie na klatkę piersiową. Leżąc na ławce, wypychaj sztangę do góry.',
      instructions: [
        'Połóż się na ławce, stopy stabilnie na podłodze',
        'Chwyć sztangę nieco szerzej niż szerokość barków',
        'Opuść sztangę kontrolowanie do klatki',
        'Wypchnij sztangę do góry, nie blokując łokci',
      ],
      sets: '3-4',
      reps: '8-12',
      rest: 90,
      tips: 'Utrzymuj łopatki ściągnięte przez cały ruch',
      lastPerformed: '2 dni temu',
      personalBest: '85 kg',
    },
    {
      id: 2,
      name: 'Przysiad ze sztangą',
      category: 'legs',
      difficulty: 'Zaawansowany',
      equipment: 'Sztanga',
      muscleGroups: ['Czworogłowy', 'Pośladki', 'Dwugłowy ud'],
      description: 'Król ćwiczeń na nogi. Kompleksowe ćwiczenie angażujące całe ciało.',
      instructions: [
        'Umieść sztangę na górnej części pleców',
        'Stopy na szerokość barków',
        'Zejdź w dół, utrzymując plecy proste',
        'Wypchnij się do góry przez pięty',
      ],
      sets: '4-5',
      reps: '6-10',
      rest: 120,
      tips: 'Kolana powinny podążać w kierunku palców stóp',
      lastPerformed: '1 dzień temu',
      personalBest: '120 kg',
    },
    {
      id: 3,
      name: 'Podciąganie nachwytem',
      category: 'back',
      difficulty: 'Średni',
      equipment: 'Drążek',
      muscleGroups: ['Plecy szerokie', 'Biceps', 'Plecy środkowe'],
      description: 'Doskonałe ćwiczenie na szerokość pleców i siłę chwytową.',
      instructions: [
        'Chwyć drążek nachwytem na szerokość barków',
        'Zwiń ciało ku górze, prowadząc łokciami',
        'Podciągnij brodę powyżej drążka',
        'Opuść się kontrolowanie',
      ],
      sets: '3-4',
      reps: '6-12',
      rest: 90,
      tips: 'Unikaj kołysania się, kontroluj ruch',
      lastPerformed: '3 dni temu',
      personalBest: 'Ciężar własny + 20 kg',
    },
    {
      id: 4,
      name: 'Wyciskanie sztangi stojąc',
      category: 'shoulders',
      difficulty: 'Średni',
      equipment: 'Sztanga',
      muscleGroups: ['Barki', 'Triceps', 'Górna klatka'],
      description: 'Podstawowe ćwiczenie na barki, angażujące również core.',
      instructions: [
        'Stań stabilnie, stopy na szerokość bioder',
        'Trzymaj sztangę na wysokości barków',
        'Wypchnij sztangę pionowo do góry',
        'Opuść kontrolowanie',
      ],
      sets: '3-4',
      reps: '8-12',
      rest: 90,
      tips: 'Napinaj brzuch dla stabilizacji',
      lastPerformed: '5 dni temu',
      personalBest: '60 kg',
    },
    {
      id: 5,
      name: 'Martwy ciąg klasyczny',
      category: 'back',
      difficulty: 'Zaawansowany',
      equipment: 'Sztanga',
      muscleGroups: ['Plecy', 'Pośladki', 'Uda', 'Core'],
      description: 'Kompleksowe ćwiczenie na całe ciało, szczególnie plecy i nogi.',
      instructions: [
        'Stań blisko sztangi, stopy pod biodrami',
        'Pochyl się z prostymi plecami',
        'Chwyć sztangę, napnij ciało',
        'Wyprostuj się, prowadząc biodrami',
      ],
      sets: '3-4',
      reps: '5-8',
      rest: 120,
      tips: 'Utrzymuj plecy w naturalnej krzywizne',
      lastPerformed: '1 dzień temu',
      personalBest: '140 kg',
    },
    {
      id: 6,
      name: 'Wiosłowanie sztangą',
      category: 'back',
      difficulty: 'Średni',
      equipment: 'Sztanga',
      muscleGroups: ['Plecy środkowe', 'Biceps', 'Plecy dolne'],
      description: 'Świetne ćwiczenie na grubość pleców.',
      instructions: [
        'Pochyl się do przodu z prostymi plecami',
        'Trzymaj sztangę na prostych rękach',
        'Przyciągnij sztangę do dolnej części brzucha',
        'Opuść kontrolowanie',
      ],
      sets: '3-4',
      reps: '8-12',
      rest: 90,
      tips: 'Prowadź łokciami wzdłuż ciała',
      lastPerformed: '2 dni temu',
      personalBest: '90 kg',
    },
    {
      id: 7,
      name: 'Uginanie ramion ze sztangą',
      category: 'arms',
      difficulty: 'Początkujący',
      equipment: 'Sztanga',
      muscleGroups: ['Biceps', 'Przedramiona'],
      description: 'Klasyczne ćwiczenie na biceps.',
      instructions: [
        'Stań prosto, sztanga w dolnej pozycji',
        'Ugnij ramiona, przyciągając sztangę do barków',
        'Nie poruszaj łokciami',
        'Opuść kontrolowanie',
      ],
      sets: '3-4',
      reps: '10-15',
      rest: 60,
      tips: 'Unikaj kołysania tułowiem',
      lastPerformed: '3 dni temu',
      personalBest: '45 kg',
    },
    {
      id: 8,
      name: 'Deska (Plank)',
      category: 'core',
      difficulty: 'Początkujący',
      equipment: 'Brak',
      muscleGroups: ['Brzuch', 'Core', 'Plecy dolne'],
      description: 'Izometryczne ćwiczenie wzmacniające core.',
      instructions: [
        'Oprzyj się na przedramionach i palcach stóp',
        'Utrzymuj ciało w linii prostej',
        'Napnij brzuch i pośladki',
        'Wytrzymaj określony czas',
      ],
      sets: '3-4',
      reps: '30-60s',
      rest: 60,
      tips: 'Nie podnoś bioder ani nie opuszczaj ich',
      lastPerformed: 'Wczoraj',
      personalBest: '3 min',
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedExercise) {
    return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-1">Biblioteka ćwiczeń</h1>
        <p className="text-gray-400 text-sm">{exercises.length} ćwiczeń dostępnych</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Szukaj ćwiczeń..."
          className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-400 border border-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-3 border border-emerald-500/20">
          <p className="text-2xl mb-1">24</p>
          <p className="text-xs text-gray-400">Wykonane</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-3 border border-purple-500/20">
          <p className="text-2xl mb-1">12</p>
          <p className="text-xs text-gray-400">Ulubione</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-3 border border-blue-500/20">
          <p className="text-2xl mb-1">8</p>
          <p className="text-xs text-gray-400">Rekordy</p>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3 pb-4">
        {filteredExercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="w-full bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 text-left hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="mb-2">{exercise.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    exercise.difficulty === 'Początkujący'
                      ? 'bg-green-500/20 text-green-400'
                      : exercise.difficulty === 'Średni'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">{exercise.equipment}</span>
                </div>
              </div>
              <BookOpen className="w-5 h-5 text-gray-600" />
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {exercise.muscleGroups.slice(0, 2).map((muscle) => (
                <span key={muscle} className="px-2 py-1 bg-black/20 rounded-lg text-xs text-gray-400">
                  {muscle}
                </span>
              ))}
              {exercise.muscleGroups.length > 2 && (
                <span className="px-2 py-1 bg-black/20 rounded-lg text-xs text-gray-400">
                  +{exercise.muscleGroups.length - 2}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-400">
                <span>{exercise.sets} serie</span>
                <span>•</span>
                <span>{exercise.reps} powtórzeń</span>
              </div>
              <span className="text-emerald-400">{exercise.personalBest}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Exercise Detail Component
function ExerciseDetail({ exercise, onBack }: { exercise: any; onBack: () => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white">
          ← Powrót
        </button>
        <button className="text-red-400">
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {/* Exercise Name & Info */}
      <div>
        <h1 className="text-2xl mb-3">{exercise.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-lg text-sm ${
            exercise.difficulty === 'Początkujący'
              ? 'bg-green-500/20 text-green-400'
              : exercise.difficulty === 'Średni'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {exercise.difficulty}
          </span>
          <span className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-400">
            {exercise.equipment}
          </span>
        </div>
        <p className="text-gray-400">{exercise.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#1a1a1a] rounded-xl p-3 border border-gray-800 text-center">
          <p className="text-2xl text-emerald-400 mb-1">{exercise.sets}</p>
          <p className="text-xs text-gray-400">Serie</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 border border-gray-800 text-center">
          <p className="text-2xl text-emerald-400 mb-1">{exercise.reps}</p>
          <p className="text-xs text-gray-400">Powtórzenia</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 border border-gray-800 text-center">
          <p className="text-2xl text-emerald-400 mb-1">{exercise.rest}s</p>
          <p className="text-xs text-gray-400">Przerwa</p>
        </div>
      </div>

      {/* Personal Best */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-2xl p-4 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Twój rekord</p>
            <p className="text-2xl">{exercise.personalBest}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Muscle Groups */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
        <h2 className="text-lg mb-3">Zaangażowane mięśnie</h2>
        <div className="flex flex-wrap gap-2">
          {exercise.muscleGroups.map((muscle: string) => (
            <span key={muscle} className="px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
        <h2 className="text-lg mb-3">Instrukcja wykonania</h2>
        <div className="space-y-3">
          {exercise.instructions.map((instruction: string, index: number) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-sm">
                {index + 1}
              </div>
              <p className="text-sm text-gray-300 pt-0.5">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 border border-blue-500/20">
        <h3 className="mb-2 flex items-center gap-2">
          💡 Wskazówka
        </h3>
        <p className="text-sm text-gray-300">{exercise.tips}</p>
      </div>

      {/* Last Performed */}
      <div className="bg-[#1a1a1a] rounded-xl p-3 border border-gray-800 flex items-center justify-between">
        <span className="text-sm text-gray-400">Ostatnio wykonane</span>
        <span className="text-sm">{exercise.lastPerformed}</span>
      </div>

      {/* Action Button */}
      <div className="pb-4">
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-4 flex items-center justify-center gap-2 transition-colors">
          <Play className="w-5 h-5" />
          Dodaj do treningu
        </button>
      </div>
    </div>
  );
}
