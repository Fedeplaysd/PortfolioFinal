// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// Logica de enviado de email

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
  var formData = new FormData(this);
  
  var params = new URLSearchParams();
  params.append('personalizations', JSON.stringify([{
    to: [{ email: 'fedpedrazaimb@gmail.com' }],
    subject: 'Nuevo mensaje de contacto desde el sitio web'
  }]));
  params.append('from', JSON.stringify({ email: formData.get('email') }));
  params.append('content', JSON.stringify([{
    type: 'text/plain',
    value: 'Nombre: ' + formData.get('name') + '\nEmail: ' + formData.get('email') + '\nMensaje: ' + formData.get('message')
  }]));

  fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer'
    },
    body: params
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    alert('El mensaje se ha enviado correctamente.');
    // Aquí podrías redirigir al usuario a una página de agradecimiento
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
  });
});