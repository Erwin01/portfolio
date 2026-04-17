/*===== CONTACT FORM VALIDATION & INTERACTIONS =====*/

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  // Event listener para el envío del formulario
  contactForm.addEventListener('submit', function(e) {
    const inputs = contactForm.querySelectorAll('.contact__input[required]');
    let isValid = true;

    // Validación básica de campos requeridos
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        highlightError(input);
      } else {
        clearError(input);
      }
    });

    if (!isValid) {
      e.preventDefault();
      showMessage('⚠️ Por favor completa todos los campos requeridos', 'error');
      return false;
    }

    // Validar email
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput && !isValidEmail(emailInput.value)) {
      e.preventDefault();
      showMessage('❌ Por favor ingresa un email válido', 'error');
      highlightError(emailInput);
      return false;
    }

    // Desactivar botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.value = 'Enviando...';
    showMessage('📤 Enviando tu mensaje...', 'info');
  });

  // Event listeners para cada input
  const inputs = contactForm.querySelectorAll('.contact__input');
  inputs.forEach(input => {
    // Al escribir
    input.addEventListener('input', function() {
      clearError(this);
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
      }
    });

    // Al obtener focus
    input.addEventListener('focus', function() {
      this.style.borderColor = '#00d4ff';
      this.style.background = 'rgba(0, 212, 255, 0.15)';
      this.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)';
    });

    // Al perder focus
    input.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.style.background = 'rgba(255, 255, 255, 0.08)';
        this.style.boxShadow = 'none';
      }
      
      // Validar email en blur
      if (this.type === 'email' && this.value.trim() && !isValidEmail(this.value)) {
        highlightError(this);
        showMessage('❌ Email inválido', 'error');
      }
    });

    // Limpiar mensaje de error después de 3 segundos
    input.addEventListener('input', function() {
      if (formMessage.classList.contains('error')) {
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'contact__form-message';
        }, 3000);
      }
    });
  });

  // Auto-limpiar mensaje después de 5 segundos
  const observer = new MutationObserver(() => {
    if (formMessage.textContent) {
      setTimeout(() => {
        if (formMessage.classList.contains('error') || formMessage.classList.contains('info')) {
          formMessage.textContent = '';
          formMessage.className = 'contact__form-message';
        }
      }, 5000);
    }
  });

  observer.observe(formMessage, { childList: true, characterData: true, subtree: true });
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para mostrar mensajes
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `contact__form-message ${type}`;
}

// Función para resaltar error
function highlightError(input) {
  input.style.borderColor = '#ff0055';
  input.style.boxShadow = '0 0 15px rgba(255, 0, 85, 0.3)';
  input.style.background = 'rgba(255, 0, 85, 0.08)';
}

// Función para limpiar error
function clearError(input) {
  input.style.borderColor = 'rgba(0, 212, 255, 0.3)';
  input.style.boxShadow = 'none';
  input.style.background = 'rgba(255, 255, 255, 0.08)';
}

// Animación al cargar el formulario
document.addEventListener('DOMContentLoaded', function() {
  if (contactForm) {
    // Pequeña animación de entrada
    setTimeout(() => {
      contactForm.style.opacity = '0.8';
      contactForm.style.transform = 'translateY(10px)';
      contactForm.style.transition = 'all 0.6s ease-out';
      
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }
});
