export function toggleSideMenu() {
    const sideMenu = document.getElementById('side-menu') as HTMLDivElement;
    const shadowScreen = document.getElementById('shadow-screen') as HTMLDivElement;
    const link = document.querySelector('.el-menu-item') as HTMLElement;

    sideMenu.classList.toggle('open')

    shadowScreen.addEventListener('click', () => {
        hideShadowScreen(shadowScreen)
        sideMenu.classList.remove('open')
    })

    window.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('el-menu-item')) {
            hideShadowScreen(shadowScreen)
            sideMenu.classList.remove('open')
        }
    })

    if (sideMenu.classList.contains('open')) {
        showShadowScreen(shadowScreen)
    } else {
        hideShadowScreen(shadowScreen)
    }
}


function hideShadowScreen(shadowScreen: HTMLElement): void {
    shadowScreen.style.opacity = "0"
    setTimeout(() => {
        shadowScreen.style.display = 'none'
    }, 300)
}

function showShadowScreen(shadowScreen: HTMLElement): void {
    shadowScreen.style.display = 'block'
    setTimeout(() => {
        shadowScreen.style.opacity = "1"
    }, 150)
}

export function logout() {
    localStorage.removeItem('tc_token');
    window.location.href = '/login';
}

export function buildDynamicUrl(url: string, params = {}) {
    return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`{${key}}`, 'g'), <string>value);
    }, url);
}