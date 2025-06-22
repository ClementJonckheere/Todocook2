(function(){
  window.Pantry = function Pantry() {
    const _React = React;
    const useState = _React.useState;
    const useEffect = _React.useEffect;

    const [items, setItems] = useState([]);

    useEffect(function(){
      // Example user id 1 for demo purposes
      api.getPantry(1)
        .then(setItems)
        .catch(function(err){ console.error('Failed to load pantry', err); });
    }, []);

    return _React.createElement('div', null,
      _React.createElement('h2', null, 'Mon placard'),
      _React.createElement('ul', null,
        items.map(function(item){
          const ing = item.ingredient || {};
          return _React.createElement('li', { key: item.id }, ing.name || 'Ingrédient');
        })
      )
    );
  }
})();
