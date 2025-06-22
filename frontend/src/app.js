const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

function App() {
  return (
    React.createElement(BrowserRouter, null,
      React.createElement('div', null,
        React.createElement('nav', null,
          React.createElement(Link, { to: '/' }, 'Home'),
          React.createElement(Link, { to: '/login' }, 'Login'),
          React.createElement(Link, { to: '/dashboard' }, 'Dashboard'),
          React.createElement(Link, { to: '/recipes' }, 'Recipes'),
          React.createElement(Link, { to: '/create' }, 'Create Recipe'),
          React.createElement(Link, { to: '/pantry' }, 'My Pantry'),
          React.createElement(Link, { to: '/suggestions' }, 'Suggestions')
        ),
        React.createElement(Routes, null,
          React.createElement(Route, { path: '/', element: React.createElement('h1', null, 'Welcome to TodoCook') }),
          React.createElement(Route, { path: '/login', element: React.createElement(Login, null) }),
          React.createElement(Route, { path: '/dashboard', element: React.createElement(Dashboard, null) }),
          React.createElement(Route, { path: '/recipes', element: React.createElement(RecipesList, null) }),
          React.createElement(Route, { path: '/create', element: React.createElement(CreateRecipe, null) }),
          React.createElement(Route, { path: '/pantry', element: React.createElement(Pantry, null) }),
          React.createElement(Route, { path: '/suggestions', element: React.createElement(Suggestions, null) })
        )
      )
    )
  );
}



ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
