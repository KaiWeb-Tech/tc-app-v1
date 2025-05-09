export function toggleSideMenu() {
    const sideMenu = document.getElementById('side-menu') as HTMLDivElement;
    sideMenu.classList.toggle('open')
}