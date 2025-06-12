// Global variables for theme management
let currentTheme = 'default';
let animationSpeed = 1;
let isDarkMode = false;

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected section and activate tab
    document.getElementById(sectionName).classList.add('active');
    event.target.classList.add('active');
    
    // Add entrance animation
    const activeSection = document.getElementById(sectionName);
    activeSection.style.animation = 'none';
    setTimeout(() => {
        activeSection.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}
// quiz
const quizData = [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style Sheet"],
      answer: 0
    },
    {
      question: "Which HTML tag is used to include JavaScript?",
      options: ["<js>", "<javascript>", "<script>"],
      answer: 2
    }
  ];
  
  let currentQuestion = 0;
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(index);
      optionsDiv.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer === selected;
    alert(correct ? "✅ Correct!" : "❌ Incorrect.");
  }
  
  function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % quizData.length;
    loadQuestion();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("quizContainer")) {
      loadQuestion();
    }
  });
  
// API Demo
async function getJoke() {
    const jokeBox = document.getElementById("jokeResult");
    jokeBox.textContent = "Loading...";
  
    try {
      const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
      const data = await response.json();
      jokeBox.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
    } catch (error) {
      jokeBox.textContent = "Failed to load joke. Try again.";
      console.error("Error fetching joke:", error);
    }
  }
  
// Theme changer
function changeTheme(themeName) {
    const root = document.documentElement;
    const themes = {
        warm: { primary: '#ff6b6b', secondary: '#ee5a24', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
        cool: { primary: '#74b9ff', secondary: '#0984e3', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
        nature: { primary: '#00b894', secondary: '#00cec9', bg: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
        default: { primary: '#667eea', secondary: '#764ba2', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    };
    
    const theme = themes[themeName];
    document.body.style.background = theme.bg;
    currentTheme = themeName;
    
    // Update CSS custom properties
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    
    // Animate the change
    document.body.style.transition = 'background 0.5s ease';
}

// JavaScript interactive functions
function showRandomAlert() {
    const messages = [
        "🎉 JavaScript is working perfectly!",
        "⚡ Welcome to interactive web development!",
        "🚀 You've mastered the basics!",
        "🌟 Keep learning and building amazing things!",
        "💻 The web is your canvas!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

function animateProgress() {
    const progressBar = document.getElementById('progressBar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 1000);
        } else {
            width += 2;
            progressBar.style.width = width + '%';
        }
    }, 50 / animationSpeed);
}

function showModal() {
    document.getElementById('modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: particleFloat 3s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-200px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form handling
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form processing
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(`🎉 Thank you, ${data.name}! Your application has been submitted successfully.`);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}
function showAlert() {
    alert("Hello! You clicked the button.");
}

// Add this code to your existing script.js file

// Form validation object
const FormValidator = {
    form: null,
    
    init() {
        // Wait for DOM to be ready, then initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupValidation());
        } else {
            this.setupValidation();
        }
    },
    
    setupValidation() {
        this.form = document.getElementById('dynamicForm');
        if (this.form) {
            this.attachEventListeners();
        }
    },
    
    attachEventListeners() {
        // Real-time validation on input
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });
        
        // Real-time validation on blur
        this.form.addEventListener('blur', (e) => {
            this.validateField(e.target);
        }, true);
        
        // Password strength checking
        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }
    },
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous styling
        field.classList.remove('error', 'success');
        this.clearError(fieldName);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Specific field validations
        if (value && isValid) {
            switch (fieldName) {
                case 'firstName':
                case 'lastName':
                    if (!/^[a-zA-Z\s'-]{2,30}$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Name must be 2-30 characters and contain only letters, spaces, hyphens, and apostrophes';
                    }
                    break;
                    
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                    
                case 'phone':
                    if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number (10-15 digits)';
                    }
                    break;
                    
                case 'dateOfBirth':
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    if (age < 13 || age > 120) {
                        isValid = false;
                        errorMessage = 'You must be between 13 and 120 years old';
                    }
                    break;
                    
                case 'address':
                    if (value.length < 5) {
                        isValid = false;
                        errorMessage = 'Please enter a complete address';
                    }
                    break;
                    
                case 'city':
                    if (!/^[a-zA-Z\s'-]{2,50}$/.test(value)) {
                        isValid = false;
                        errorMessage = 'City name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
                    }
                    break;
                    
                case 'zipCode':
                    if (!/^[\d\w\s-]{3,10}$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid ZIP code';
                    }
                    break;
                    
                case 'username':
                    if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
                    }
                    break;
                    
                case 'password':
                    const passwordStrength = this.getPasswordStrength(value);
                    if (passwordStrength < 3) {
                        isValid = false;
                        errorMessage = 'Password is too weak. Please meet all requirements.';
                    }
                    break;
                    
                case 'confirmPassword':
                    const password = document.getElementById('password').value;
                    if (value !== password) {
                        isValid = false;
                        errorMessage = 'Passwords do not match';
                    }
                    break;
                    
                case 'website':
                    if (value && !/^https?:\/\/.+\..+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid URL (e.g., https://example.com)';
                    }
                    break;
                    
                case 'message':
                    if (value.length > 500) {
                        isValid = false;
                        errorMessage = 'Message must be less than 500 characters';
                    }
                    break;
            }
        }
        
        // Apply styling and show/hide error messages
        if (isValid && value) {
            field.classList.add('success');
        } else if (!isValid) {
            field.classList.add('error');
            this.showError(fieldName, errorMessage);
        }
        
        return isValid;
    },
    
    checkPasswordStrength(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        // Update requirement indicators
        Object.keys(requirements).forEach(req => {
            const element = document.getElementById(`${req}-req`);
            if (element) {
                if (requirements[req]) {
                    element.classList.add('met');
                } else {
                    element.classList.remove('met');
                }
            }
        });
        
        // Update strength bar
        const strength = this.getPasswordStrength(password);
        const strengthBar = document.getElementById('passwordStrengthBar');
        if (strengthBar) {
            strengthBar.className = 'password-strength-bar';
            
            if (strength === 1) strengthBar.classList.add('strength-weak');
            else if (strength === 2) strengthBar.classList.add('strength-fair');
            else if (strength === 3) strengthBar.classList.add('strength-good');
            else if (strength >= 4) strengthBar.classList.add('strength-strong');
        }
    },
    
    getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    },
    
    showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },
    
    clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },
    
    validateForm() {
        let isFormValid = true;
        const formElements = this.form.querySelectorAll('input, select, textarea');
        
        formElements.forEach(element => {
            if (!this.validateField(element)) {
                isFormValid = false;
            }
        });
        
        // Check if terms are accepted
        const termsCheckbox = document.getElementById('terms');
        if (termsCheckbox && !termsCheckbox.checked) {
            isFormValid = false;
            this.showError('terms', 'You must accept the terms and conditions');
        }
        
        return isFormValid;
    },
    
    clearAllErrors() {
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        const fields = this.form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.classList.remove('error', 'success');
        });
    }
};

// Update the existing handleFormSubmit function
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Initialize validator if not already done
    if (!FormValidator.form) {
        FormValidator.setupValidation();
    }
    
    // Validate the form
    if (FormValidator.validateForm()) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Get selected languages
        const languages = Array.from(event.target.querySelectorAll('input[name="languages"]:checked'))
            .map(cb => cb.value);
        data.languages = languages;
        
        // Get contact method
        const contactMethod = event.target.querySelector('input[name="contactMethod"]:checked');
        if (contactMethod) {
            data.contactMethod = contactMethod.value;
        }
        
        // Simulate form processing
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        setTimeout(() => {
            alert(`🎉 Thank you, ${data.firstName || 'User'}! Your application has been submitted successfully.\n\nUsername: ${data.username}\nSkill Level: ${data.skill}\nPreferred Languages: ${data.languages.join(', ') || 'None selected'}`);
            
            // Reset form
            event.target.reset();
            FormValidator.clearAllErrors();
            
            // Reset password strength indicator
            const strengthBar = document.getElementById('passwordStrengthBar');
            if (strengthBar) {
                strengthBar.className = 'password-strength-bar';
            }
            
            // Reset password requirements
            const requirements = ['length', 'uppercase', 'lowercase', 'number', 'special'];
            requirements.forEach(req => {
                const element = document.getElementById(`${req}-req`);
                if (element) {
                    element.classList.remove('met');
                }
            });
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }, 2000);
    } else {
        alert('⚠️ Please fix the errors in the form before submitting.');
        
        // Scroll to first error
        const firstError = FormValidator.form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Add skill info functionality (enhance existing function)
function updateSkillInfo(skillLevel) {
    const skillInfo = document.getElementById('skillInfo');
    const skillDescription = document.getElementById('skillDescription');
    
    const descriptions = {
        beginner: 'Perfect for those just starting their web development journey. We\'ll provide extra guidance and foundational resources.',
        intermediate: 'Great for developers with some experience. You\'ll dive deeper into advanced concepts and best practices.',
        advanced: 'Ideal for experienced developers looking to master complex topics and modern frameworks.',
        expert: 'For seasoned professionals who want to stay current with cutting-edge technologies and contribute to the community.'
    };
    
    if (skillDescription && descriptions[skillLevel]) {
        skillDescription.textContent = descriptions[skillLevel];
        skillInfo.style.display = 'block';
        
        // Add a nice animation
        skillInfo.style.animation = 'fadeIn 0.5s ease';
    }
}

// Initialize form validation when the page loads
FormValidator.init();

function addTodo() {
    const input = document.getElementById('todoInput');
    const value = input.value.trim();
    if (!value) return;

    const list = document.getElementById('todoList');
    const li = document.createElement('li');
    li.innerHTML = `
        ${value}
        <button onclick="removeTodo(this)">Remove</button>
    `;
    list.appendChild(li);
    input.value = '';
}

function removeTodo(button) {
    const li = button.parentElement;
    li.remove();
}
