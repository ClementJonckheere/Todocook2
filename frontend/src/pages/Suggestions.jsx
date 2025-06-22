(function(){
  window.Suggestions = function Suggestions() {
    const _React = React;
    const useState = _React.useState;
    const useEffect = _React.useEffect;

    const [recipes, setRecipes] = useState([]);

    useEffect(function(){
      fetch('/api/v1/recipes/suggested?user_id=1')
        .then(function(r){ return r.json(); })
        .then(function(data){ setRecipes(data); })
        .catch(function(err){ console.error('Failed to load suggestions', err); });
    }, []);

    return _React.createElement('div', null,
      _React.createElement('h2', null, 'Suggestions personnalis\u00e9es'),
      _React.createElement('ul', null,
        recipes.map(function(r){
          return _React.createElement('li', { key: r.id }, r.title);
        })
      )
    );
  }
})();
