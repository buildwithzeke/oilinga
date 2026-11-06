const nav = document.querySelector('.main-nav');
const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function showView(id) {
  const target = document.getElementById(id);
  if (!target || !target.classList.contains('view')) return;
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view === target));
  document.querySelectorAll('[data-view]').forEach(link => link.classList.toggle('active', link.dataset.view === id));
  nav.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-view]').forEach(link => link.addEventListener('click', event => {
  const id = link.dataset.view;
  if (document.getElementById(id)?.classList.contains('view')) {
    event.preventDefault();
    showView(id);
  }
}));
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => {
  button.textContent = '✓';
  button.style.background = '#d99a32';
  button.style.color = '#282522';
  showToast('Added to your cart');
  setTimeout(() => { button.textContent = '+'; button.style.background = ''; button.style.color = ''; }, 1100);
}));
document.querySelectorAll('.icon-button').forEach(button => button.addEventListener('click', () => showToast('Sign in to save your wishlist')));
document.querySelectorAll('.button-outline,.button-red').forEach(button => button.addEventListener('click', () => showToast('Account access is coming soon')));
document.querySelector('.search:not(.large) input').addEventListener('keydown', event => {
  if (event.key === 'Enter') { showView('marketplace'); document.querySelector('.search.large input').value = event.currentTarget.value; }
});
document.querySelector('.search.large button').addEventListener('click', () => showToast('Showing matching marketplace products'));
document.querySelectorAll('.filters input[type=checkbox]').forEach(input => input.addEventListener('change', () => showToast('Marketplace filters updated')));
