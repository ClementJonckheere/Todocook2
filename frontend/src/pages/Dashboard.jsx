import React from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import BottomNavbar from '../components/Navbar/BottomNavbar.jsx';

export default function Dashboard() {
  const user = {
    name: 'Delphine',
    caloriesToday: 1347,
  };

  const suggestedRecipes = [
    { id: 1, title: 'Salade quinoa', calories: 350 },
    { id: 2, title: 'Wrap au thon', calories: 420 },
  ];

  const userRecipes = [
    { id: 101, title: 'Poulet curry', calories: 500 },
    { id: 102, title: 'Smoothie banane', calories: 200 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Bonjour, {user.name}</h1>
        <p className="text-sm text-gray-700">
          <span className="font-bold">{user.caloriesToday}</span> kcal aujourd’hui
        </p>
      </header>

      {/* Search */}
      <div className="p-4">
        <SearchBar placeholder="Rechercher une recette..." />
      </div>

      {/* Suggestions */}
      <section className="px-4">
        <h2 className="text-md font-bold mb-2 text-gray-800">Suggestions de l’appli</h2>
        <div className="grid gap-4">
          {suggestedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} title={recipe.title} calories={recipe.calories} />
          ))}
        </div>
      </section>

      {/* Mes recettes */}
      <section className="px-4 mt-6 mb-24">
        <h2 className="text-md font-bold mb-2 text-gray-800">Mes recettes</h2>
        <div className="grid gap-4">
          {userRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} title={recipe.title} calories={recipe.calories} />
          ))}
        </div>
      </section>

    </div>
  );
}
