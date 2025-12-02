export default function loadMenu() {
    const content = document.getElementById('content');

    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menu-tab');

    const title = document.createElement('h1');
    title.textContent = 'Our Menu';

    const list = document.createElement('ul');

    const item1 = document.createElement('li');
    item1.textContent = 'Pizza with Cheese';

    const item2 = document.createElement('li');
    item2.textContent = 'Hamburger';

    const item3 = document.createElement('li');
    item3.textContent = 'Hot Dog';

    list.appendChild(item1);
    list.appendChild(item2);
    list.appendChild(item3);

    menuDiv.appendChild(title);
    menuDiv.appendChild(list);

    content.appendChild(menuDiv);

}