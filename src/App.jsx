
import { useState } from 'react'
import './App.css'

const recipes = [
  {
    id: 1,
    name: 'Pasta cremosa',
    category: 'Comida',
    time: 25,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900',
    description: 'Una deliciosa pasta con tomate, crema y queso.',
    ingredients: [
      '200 g de pasta',
      '2 tomates',
      '2 dientes de ajo',
      '100 ml de crema',
      '50 g de queso rallado',
      'Sal, pimienta y aceite de oliva',
    ],
    steps: [
      'Cuece la pasta en agua con sal.',
      'Pica los tomates y el ajo.',
      'Sofríe el ajo y agrega los tomates.',
      'Añade la crema, sal y pimienta.',
      'Mezcla con la pasta y agrega el queso.',
    ],
  },
  {
    id: 2,
    name: 'Quesadillas de pollo',
    category: 'Cena',
    time: 20,
    difficulty: 'Fácil',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=900',
    description: 'Quesadillas doradas con pollo y queso derretido.',
    ingredients: [
      '4 tortillas',
      '200 g de pollo cocido y desmenuzado',
      '150 g de queso para derretir',
      '1/4 de cebolla',
      'Aceite, sal y pimienta',
    ],
    steps: [
      'Pica la cebolla y mézclala con el pollo.',
      'Sazona con sal y pimienta.',
      'Coloca el pollo y el queso sobre las tortillas.',
      'Dobla las tortillas y caliéntalas en una sartén.',
      'Dora por ambos lados hasta que el queso se derrita.',
    ],
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )

    const matchesCategory =
      category === 'Todas' || recipe.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">🍅 Mi Recetario</a>
        <a href="#recetas" className="nav-link">Explorar recetas</a>
      </header>

      <section className="hero">
        <span className="eyebrow">COCINA FÁCIL, COME RICO</span>
        <h1>¿Qué se te antoja cocinar hoy?</h1>
        <p>
          Descubre recetas deliciosas, sencillas y perfectas
          para compartir con quienes más quieres.
        </p>
        <a className="primary-button" href="#recetas">
          Descubrir recetas ↓
        </a>
      </section>

      <main className="recipe-section" id="recetas">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NUESTRA COLECCIÓN</span>
            <h2>Recetas para ti</h2>
          </div>
          <span className="recipe-count">
            {filteredRecipes.length} recetas
          </span>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="🔎 Buscar receta o ingrediente..."
            aria-label="Buscar receta o ingrediente"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-filters">
            {['Todas', 'Comida', 'Cena'].map((item) => (
              <button
                key={item}
                className={category === item ? 'chip active' : 'chip'}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <img
                className="recipe-image"
                src={recipe.image}
                alt={recipe.name}
              />

              <div className="recipe-content">
                <div className="recipe-meta">
                  <span>{recipe.category}</span>
                  <span>⏱ {recipe.time} min</span>
                </div>

                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>

                <div className="card-footer">
                  <span>● {recipe.difficulty}</span>
                  <button
                    className="details-button"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    Ver receta →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <p className="empty-state">
            No encontramos recetas. Intenta con otro ingrediente.
          </p>
        )}
      </main>

      {selectedRecipe && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedRecipe(null)}
        >
          <section
            className="recipe-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Cerrar receta"
            >
              ✕
            </button>

            <span className="eyebrow">¡VAMOS A COCINAR!</span>
            <h2 id="modal-title">{selectedRecipe.name}</h2>
            <p>
              ⏱ {selectedRecipe.time} minutos · {selectedRecipe.difficulty}
            </p>

            <h3>🛒 Ingredientes</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>

            <h3>👩‍🍳 Preparación</h3>
            <ol>
              {selectedRecipe.steps.map((step, index) => (
                <li key={step}>
                  <strong>Paso {index + 1}:</strong> {step}
                </li>
              ))}
            </ol>

            <button
              className="primary-button"
              onClick={() => setSelectedRecipe(null)}
            >
              ¡A disfrutar!
            </button>
          </section>
        </div>
      )}

      <footer className="footer">
        Hecho con ♥ para disfrutar los pequeños momentos.
      </footer>
    </div>
  )
}

export default App
