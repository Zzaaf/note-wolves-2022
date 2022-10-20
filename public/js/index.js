const form = document.querySelector('form');
const section = document.querySelector('#list');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { action, method, note } = event.target;

    fetch(action, {
      method,
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        note: note.value,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        section.innerHTML += data;
        form.reset();
      });
  });
}
