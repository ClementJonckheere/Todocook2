// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RecipesList from './pages/RecipesList.jsx'
import CreateRecipe from './pages/CreateRecipe'
import Pantry from './pages/Pantry'
import Suggestions from './pages/Suggestions'
import NutritionTracker from './pages/NutritionTracker'; // juste après les autres imports


function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/create">Create Recipe</Link>
                <Link to="/pantry">My Pantry</Link>
                <Link to="/suggestions">Suggestions</Link>
                <Link to="/nutrition">Nutrition</Link>

            </nav>
            <Routes>
                <Route path="/" element={<h1>Welcome to TodoCook</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recipes" element={<RecipesList />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/pantry" element={<Pantry />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/nutrition" element={<NutritionTracker />} />

            </Routes>
        </Router>
    )
}

export default App
