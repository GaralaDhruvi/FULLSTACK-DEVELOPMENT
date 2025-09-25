const counter = document.getElementById('counter');

// Load initial count
fetch('/count')
  .then(res => res.json())
  .then(data => {
    counter.innerText = data.count;
  });

function changeCount(action) {
  fetch(`/${action}`, {
    method: 'POST',
  })
    .then(res => res.json())
    .then(data => {
      counter.innerText = data.count;
    });
}
