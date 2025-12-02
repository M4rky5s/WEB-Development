export default function loadHome() {
    const content = document.getElementById('content');

    const homeDiv = document.createElement('div');
    homeDiv.classList.add('home-tab');

    const headline = document.createElement('h1');
    headline.textContent = 'Welcome to the Best Restaurant in Town!';

    const description = document.createElement('p');
    description.textContent = 'We serve fresh, delicious food every single day. Our chefs are world-class and our dishes are unforgettable.';

    const image = document.createElement('img');
    image.src = 'https://www.franciscosegarra.com/wp-content/uploads/2022/03/restaurant-decoration.jpg';
    image.alt = 'Restaurant interior';

    image.width = 400;
    image.height = 200;

    homeDiv.appendChild(headline);
    homeDiv.appendChild(description);
    homeDiv.appendChild(image);

    content.appendChild(homeDiv);
}