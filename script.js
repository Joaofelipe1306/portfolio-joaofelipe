
const menuBtn = document.getElementById('menuBtn');
const menuLista = document.getElementById('menuLista');

menuBtn.addEventListener('click', () => {
  menuLista.classList.toggle('ativo');
});



const temaBtn = document.getElementById('temaBtn');

temaBtn.addEventListener('click', () => {
  document.body.classList.toggle('claro');
});



const enviarBtn = document.getElementById('enviarBtn');

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');

enviarBtn.addEventListener('click', () => {

  if (nome.value === '') {
    alert('Digite seu nome');
    return;
  }

  if (email.value === '') {
    alert('Digite seu e-mail');
    return;
  }

  if (mensagem.value === '') {
    alert('Digite sua mensagem');
    return;
  }


  emailjs.init('9VyKcL7aVPGubADSM'); // Sua chave pública do EmailJS

  const templateParams = {
    from_name: nome.value,
    from_email: email.value,
    message: mensagem.value,
    to_email: 'joaofelipegoncalves1306@gmail.com' // Seu email
  };

  emailjs.send('service_zemjoed', 'template_05wxy28', templateParams) // Seus IDs
    .then(function(response) {
      alert('Mensagem enviada com sucesso!');
      nome.value = '';
      email.value = '';
      mensagem.value = '';
    }, function(error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
      console.error('Erro:', error);
    });
});
