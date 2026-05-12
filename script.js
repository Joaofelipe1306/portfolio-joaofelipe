/* =============================================
   PORTFÓLIO – JOÃO FELIPE
   script.js — Interações e validações JS puro
   ============================================= */

/* ---- 1. ALTERNADOR DE TEMA CLARO / ESCURO ---- */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Recupera o tema salvo no localStorage (persistência entre visitas)
const savedTheme = localStorage.getItem('theme') || 'dark-theme';
body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
  // Alterna entre dark-theme e light-theme
  if (body.classList.contains('dark-theme')) {
    body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});

/* ---- 2. MENU HAMBURGER (MOBILE) ---- */
const menuToggle  = document.getElementById('menuToggle');
const navLinks    = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  // Abre ou fecha o menu mobile
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  // Acessibilidade: comunica estado ao leitor de tela
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu ao clicar em qualquer link (UX mobile)
navLinks.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

/* ---- 3. REALCE DO LINK ATIVO NA NAVBAR (Scroll Spy) ---- */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-item');

// Usa IntersectionObserver para detectar qual seção está visível
const observerOptions = {
  root: null,          // viewport
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove 'active' de todos e adiciona no link correspondente
      navItems.forEach(item => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

/* ---- 4. NAVBAR COM SOMBRA AO ROLAR ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Adiciona sombra na navbar quando a página rola
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ---- 5. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO ---- */

const btnEnviar   = document.getElementById('btnEnviar');
const successMsg  = document.getElementById('successMsg');
const contactForm = document.getElementById('contactForm');

// Referências dos campos
const campoNome      = document.getElementById('nome');
const campoEmail     = document.getElementById('email');
const campoMensagem  = document.getElementById('mensagem');

// Referências das mensagens de erro
const erroNome      = document.getElementById('erroNome');
const erroEmail     = document.getElementById('erroEmail');
const erroMensagem  = document.getElementById('erroMensagem');

/**
 * Valida o formato de e-mail usando expressão regular
 * Exemplo válido: usuario@dominio.com
 */
function emailValido(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor.trim());
}

/**
 * Marca um campo como inválido e exibe a mensagem de erro
 */
function marcarInvalido(campo, erroEl, mensagem) {
  campo.parentElement.classList.add('invalid');
  erroEl.textContent = mensagem;
}

/**
 * Limpa o estado de erro de um campo
 */
function limparErro(campo, erroEl) {
  campo.parentElement.classList.remove('invalid');
  erroEl.textContent = '';
}

// Validação em tempo real ao digitar (melhora UX)
campoNome.addEventListener('input', () => {
  if (campoNome.value.trim().length > 0) limparErro(campoNome, erroNome);
});
campoEmail.addEventListener('input', () => {
  if (emailValido(campoEmail.value)) limparErro(campoEmail, erroEmail);
});
campoMensagem.addEventListener('input', () => {
  if (campoMensagem.value.trim().length > 0) limparErro(campoMensagem, erroMensagem);
});

// Clique no botão de envio
btnEnviar.addEventListener('click', () => {
  let valido = true; // flag de validação geral

  // --- Valida campo Nome ---
  if (campoNome.value.trim() === '') {
    marcarInvalido(campoNome, erroNome, 'Por favor, informe seu nome.');
    valido = false;
  } else {
    limparErro(campoNome, erroNome);
  }

  // --- Valida campo E-mail ---
  if (campoEmail.value.trim() === '') {
    marcarInvalido(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!emailValido(campoEmail.value)) {
    marcarInvalido(campoEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
    valido = false;
  } else {
    limparErro(campoEmail, erroEmail);
  }

  // --- Valida campo Mensagem ---
  if (campoMensagem.value.trim() === '') {
    marcarInvalido(campoMensagem, erroMensagem, 'Por favor, escreva uma mensagem.');
    valido = false;
  } else if (campoMensagem.value.trim().length < 10) {
    marcarInvalido(campoMensagem, erroMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  } else {
    limparErro(campoMensagem, erroMensagem);
  }

  // --- Se tudo válido: simula envio ---
  if (valido) {
    // Simula carregamento
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled = true;

    setTimeout(() => {
      // Limpa os campos após "envio"
      campoNome.value     = '';
      campoEmail.value    = '';
      campoMensagem.value = '';

      // Oculta o formulário e exibe mensagem de sucesso
      contactForm.style.display = 'none';
      successMsg.hidden = false;

      // Restaura o formulário após 5 segundos (opcional)
      setTimeout(() => {
        contactForm.style.display = 'block';
        successMsg.hidden = true;
        btnEnviar.textContent = 'Enviar mensagem';
        btnEnviar.disabled = false;
      }, 5000);

    }, 1200); // delay de 1.2s para simular requisição
  }
});
