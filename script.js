// Переключение светлой и тёмной темы с запоминанием выбора, счётчик посещений
(function () {
  const btn = document.getElementById('theme');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* хранилище недоступно */ } }
  };

  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    btn.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
    btn.setAttribute('aria-pressed', String(dark));
  }

  const saved = store.get('theme');
  applyTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

  btn.addEventListener('click', function () {
    const dark = !document.body.classList.contains('dark');
    applyTheme(dark);
    store.set('theme', dark ? 'dark' : 'light');
  });

  const visits = Number(store.get('visits') || 0) + 1;
  store.set('visits', String(visits));
  document.getElementById('visits').textContent = visits;
})();
