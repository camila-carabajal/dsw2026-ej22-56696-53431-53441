document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  if (menuButton && sidebar && backdrop) {
    const toggleSidebar = () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
    };

    menuButton.addEventListener('click', toggleSidebar);
    backdrop.addEventListener('click', toggleSidebar);
  }
});
