export default function loadContact() {
    const content = document.getElementById('content');

    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact-tab');

    const title = document.createElement('h1');
    title.textContent = "Contact Us";

    const phone = document.createElement('p');
    phone.textContent = "Phone: +370 611 12312";

    const email = document.createElement('p');
    email.textContent = "Email: ThisEmailIsReal@notfake.com";

    const address = document.createElement('p');
    address.textContent = "Address: Unknown Street 1, Vilnius";

    contactDiv.appendChild(title);
    contactDiv.appendChild(phone);
    contactDiv.appendChild(email);
    contactDiv.appendChild(address);

    content.appendChild(contactDiv);
}