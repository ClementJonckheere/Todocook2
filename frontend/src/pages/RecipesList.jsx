(function(){
  window.RecipesList = function RecipesList() {
    const _React = React;
    const useState = _React.useState;
    const useEffect = _React.useEffect;

    const [recipes, setRecipes] = useState([]);

    useEffect(function(){
      api.listRecipes()
        .then(setRecipes)
        .catch(function(err){ console.error('Failed to load recipes', err); });
    }, []);

    return _React.createElement('div', null,
      _React.createElement('h2', null, 'Liste des recettes'),
      _React.createElement('ul', null,
        recipes.map(function(r){
          return _React.createElement('li', { key: r.id }, r.title);
        })
      )
    );
  }
})();
