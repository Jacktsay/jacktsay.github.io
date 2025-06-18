/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to light mode';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to dark mode';
        }
    }

    // Enhanced chat functionality
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatHistory = document.getElementById('chatHistory');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // Knowledge base for the AI assistant
    const knowledgeBase = {
        'research': 'Jacky\'s research focuses on Generative AI, Big Data, NLP, IoT, SSSound, navigation and robotics. He completed his PhD at Kyoto University in 2022.',
        'experience': 'Jacky is currently a Postdoctoral Researcher at Primeton Information Technologies Inc. and Shanghai Jiao Tong University. He previously worked as a Senior Hardware Engineer at Precision Robotics Ltd.',
        'education': 'Jacky received his PhD in Agricultural Science from Kyoto University (2017-2022) and his BEng in Electronic Engineering from Hong Kong University of Science and Technology (2013-2017).',
        'skills': 'Jacky is proficient in Python, C++, Vue.js, Altium & PCB Design, and has expertise in Generative AI. He also has experience with web technologies like HTML, CSS, JavaScript, and various frameworks.',
        'awards': 'Jacky has received several awards including Yanmar\'s prize-winning student essays, Asian Future Leaders Scholarship Program, Monbukagakusho Honors Scholarship, and JST SPRING Grant.',
        'contact': 'You can reach Jacky at cailw@primeton.com or call 185-6559-5604. He is located in Shanghai, China.',
        'interests': 'Jacky is interested in SSSounds, hydroponics, and gaming. He believes in continuous learning and innovation.'
    };

    function getAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Simple keyword matching for responses
        if (message.includes('research') || message.includes('work') || message.includes('study')) {
            return knowledgeBase.research;
        } else if (message.includes('experience') || message.includes('job') || message.includes('work')) {
            return knowledgeBase.experience;
        } else if (message.includes('education') || message.includes('degree') || message.includes('university')) {
            return knowledgeBase.education;
        } else if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
            return knowledgeBase.skills;
        } else if (message.includes('award') || message.includes('scholarship') || message.includes('prize')) {
            return knowledgeBase.awards;
        } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            return knowledgeBase.contact;
        } else if (message.includes('interest') || message.includes('hobby')) {
            return knowledgeBase.interests;
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! I\'m here to help you learn more about Jacky Tsay. You can ask me about his research, experience, education, skills, awards, or contact information.';
        } else {
            return 'I\'m not sure about that. You can ask me about Jacky\'s research, experience, education, skills, awards, contact information, or interests.';
        }
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        if (isUser) {
            messageDiv.textContent = message;
        } else {
            messageDiv.innerHTML = `<strong>AI Assistant:</strong> ${message}`;
        }
        
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<strong>AI Assistant:</strong> <span class="loading"></span> Typing...';
        chatHistory.appendChild(typingDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            hideTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, false);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    });

    // Skill progress animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Animate skills when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to social icons
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.resume-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize first section as visible
    const firstSection = document.querySelector('.resume-section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }

});
