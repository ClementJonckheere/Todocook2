(function(){
  window.CreateRecipe = function CreateRecipe() {
    const _React = React;
    const useState = _React.useState;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e){
      e.preventDefault();
      api.createRecipe({ title: title, description: description, ingredients: [] })
        .then(function(){
          setMessage('Recette enregistr\u00e9e !');
          setTitle('');
          setDescription('');
        })
        .catch(function(err){
          console.error('Failed to create recipe', err);
          setMessage('Erreur lors de l\u2019enregistrement');
        });
    }

    return _React.createElement('div', null,
      _React.createElement('h2', null, 'Cr\u00e9ation d\u2019une recette'),
      _React.createElement('form', { onSubmit: handleSubmit },
        _React.createElement('div', null,
          _React.createElement('input', {
            value: title,
            placeholder: 'Titre',
            onChange: function(e){ setTitle(e.target.value); }
          })
        ),
        _React.createElement('div', null,
          _React.createElement('textarea', {
            value: description,
            placeholder: 'Description',
            onChange: function(e){ setDescription(e.target.value); }
          })
        ),
        _React.createElement('button', { type: 'submit' }, 'Enregistrer')
      ),
      message && _React.createElement('p', null, message)
    );
  }
})();
