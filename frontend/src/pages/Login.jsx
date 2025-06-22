(function(){
  window.Login = function Login() {
    const _React = React;
    const useState = _React.useState;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e){
      e.preventDefault();
      fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email })
      })
        .then(function(r){ return r.json(); })
        .then(function(){
          setMessage('Utilisateur cr\u00e9\u00e9');
          setName('');
          setEmail('');
        })
        .catch(function(err){
          console.error('Failed to register', err);
          setMessage('Erreur lors de l\u2019inscription');
        });
    }

    return _React.createElement('div', null,
      _React.createElement('h2', null, 'Connexion / Inscription'),
      _React.createElement('form', { onSubmit: handleSubmit },
        _React.createElement('div', null,
          _React.createElement('input', {
            value: name,
            placeholder: 'Nom',
            onChange: function(e){ setName(e.target.value); }
          })
        ),
        _React.createElement('div', null,
          _React.createElement('input', {
            value: email,
            placeholder: 'Email',
            onChange: function(e){ setEmail(e.target.value); }
          })
        ),
        _React.createElement('button', { type: 'submit' }, 'Envoyer')
      ),
      message && _React.createElement('p', null, message)
    );
  }
})();
