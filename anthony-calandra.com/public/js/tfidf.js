document.getElementById('submit').addEventListener('click', e => {
  e.preventDefault();
  const submit = document.getElementById('submit');
  const query = document.getElementById('query').value;
  const csrf = document.getElementById('_csrf').value;
  const opts = {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _csrf: csrf, query })
  };
  submit.disabled = true;
  window.fetch(`/wikipedia-tfidf`, opts)
    .then(res => {
      const resultsEl = document.getElementById('results');
      res.text().then(text => {
        resultsEl.textContent = text;
        submit.disabled = false;
      });
    })
    .catch(err => {
      document.getElementById('results').textContent = 'Error';
    });
});
