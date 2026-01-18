// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingPercent = document.getElementById('loadingPercent');
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projectsGrid');
const matrixCanvas = document.getElementById('matrixCanvas');
const terminalWindow = document.getElementById('terminalWindow');
const terminalBody = document.getElementById('terminalBody');
const currentCommand = document.getElementById('currentCommand');

// Theme Management
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Project Data
const projects = [
    {
        id: 1,
        title: "Secure Banking System",
        description: "End-to-end encrypted banking platform with multi-factor authentication and fraud detection.",
        type: "security",
        icon: "fas fa-shield-alt",
        tech: ["Node.js", "React", "MongoDB", "JWT", "AES-256"],
        github: "#",
        demo: "#",
        delay: "0.1s"
    },
    {
        id: 2,
        title: "E-commerce Platform",
        description: "Scalable e-commerce solution with real-time inventory and payment processing.",
        type: "web",
        icon: "fas fa-shopping-cart",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
        github: "#",
        demo: "#",
        delay: "0.2s"
    },
    {
        id: 3,
        title: "Network Scanner",
        description: "Advanced network scanning tool for security analysis and vulnerability detection.",
        type: "security",
        icon: "fas fa-network-wired",
        tech: ["Python", "Nmap", "Socket", "Multithreading"],
        github: "#",
        demo: "#",
        delay: "0.3s"
    },
    {
        id: 4,
        title: "Task Manager App",
        description: "Cross-platform task management application with team collaboration features.",
        type: "mobile",
        icon: "fas fa-tasks",
        tech: ["React Native", "Firebase", "Redux", "Push Notifications"],
        github: "#",
        demo: "#",
        delay: "0.4s"
    },
    {
        id: 5,
        title: "API Gateway",
        description: "High-performance API gateway with rate limiting, caching, and authentication.",
        type: "web",
        icon: "fas fa-server",
        tech: ["Go", "Redis", "Kong", "Docker"],
        github: "#",
        demo: "#",
        delay: "0.5s"
    },
    {
        id: 6,
        title: "Password Manager",
        description: "Secure password management system with zero-knowledge encryption.",
        type: "security",
        icon: "fas fa-key",
        tech: ["React", "Express", "SQLite", "PBKDF2"],
        github: "#",
        demo: "#",
        delay: "0.6s"
    }
];

// Terminal Commands
const commands = {
    help: "Available commands: help, about, skills, projects, contact, clear",
    about: "I'm a Full-Stack Developer specializing in cybersecurity and web development.",
    skills: "Frontend: React, Vue, TypeScript | Backend: Node.js, Python, Go | Security: Network, Cryptography",
    projects: "Check out my projects section for detailed information.",
    contact: "Email: nama@domain.com | Phone: +62 812 3456 7890",
    clear: "clear"
};

// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        this.fontSize = 14;
        this.columns = 0;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono'`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillStyle = '#0F0';
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize theme
    initTheme();
    
    // Initialize matrix rain
    if (isDarkMode) {
        const matrix = new MatrixRain(matrixCanvas);
    }
    
    // Initialize terminal
    initTerminal();
    
    // Load projects
    loadProjects('all');
    
    // Initialize animations
    initAnimations();
    
    // Simulate loading progress
    simulateLoading();
});

// Loading Simulation
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        loadingBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${Math.round(progress)}%`;
    }, 50);
}

// Theme Management
function initTheme() {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Update matrix canvas visibility
    if (isDarkMode) {
        const matrix = new MatrixRain(matrixCanvas);
    }
}

themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Toggle matrix rain
    if (isDarkMode) {
        const matrix = new MatrixRain(matrixCanvas);
    }
    
    // Update button text
    const themeLabel = document.querySelector('.theme-label');
    themeLabel.textContent = isDarkMode ? 'Mode Normal' : 'Mode Hacker';
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    // Header background on scroll
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Animate skill bars when in view
    animateSkillBars();
    
    // Animate stats when in view
    animateStats();
});

// Mobile Navigation
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Projects Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        const filter = this.getAttribute('data-filter');
        loadProjects(filter);
    });
});

// Load Projects
function loadProjects(filter) {
    // Clear grid
    projectsGrid.innerHTML = '';
    
    // Filter projects
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.type === filter);
    
    // Create project cards
    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = project.delay;
        
        projectCard.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-type">${project.type.toUpperCase()}</div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>Code</span>
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Demo</span>
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
        
        // Animate cards
        setTimeout(() => {
            projectCard.classList.add('visible');
        }, 100);
    });
}

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > sectionTop + sectionHeight / 2) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });
    }
}

// Animate Stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const heroSection = document.getElementById('home');
    
    if (!heroSection) return;
    
    const sectionTop = heroSection.offsetTop;
    const sectionHeight = heroSection.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > sectionTop + sectionHeight / 2) {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
    }
}

// Terminal Functions
function initTerminal() {
    // Type random commands
    typeRandomCommand();
    
    // Handle terminal clicks
    terminalWindow.addEventListener('click', () => {
        typeRandomCommand();
    });
}

function typeRandomCommand() {
    const commandKeys = Object.keys(commands);
    const randomCommand = commandKeys[Math.floor(Math.random() * commandKeys.length)];
    
    if (randomCommand === 'clear') {
        clearTerminal();
        return;
    }
    
    let i = 0;
    const typingSpeed = 50;
    
    function typeChar() {
        if (i < randomCommand.length) {
            currentCommand.textContent += randomCommand.charAt(i);
            i++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Show response after delay
            setTimeout(() => {
                addTerminalLine(`> ${commands[randomCommand]}`);
                currentCommand.textContent = '';
                // Start new command after delay
                setTimeout(typeRandomCommand, 2000);
            }, 500);
        }
    }
    
    currentCommand.textContent = '';
    typeChar();
}

function addTerminalLine(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    terminalBody.insertBefore(line, terminalBody.lastElementChild);
    
    // Auto scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function clearTerminal() {
    const lines = terminalBody.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        if (index < lines.length - 1) {
            line.remove();
        }
    });
    currentCommand.textContent = '';
    setTimeout(typeRandomCommand, 1000);
}

// Contact Form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        
        // Show success message with hacker effect
        showHackerNotification('Message encrypted and sent successfully!', 'success');
        
        // Add to terminal
        addTerminalLine('> New message received from contact form');
        
    }, 2000);
});

// Hacker-style Notification
function showHackerNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `hacker-notification ${type}`;
    
    const lines = [
        '> Initializing notification protocol...',
        '> Establishing secure connection...',
        `> ${message}`,
        '> Connection secured. Closing channel...'
    ];
    
    let currentLine = 0;
    
    function typeLine() {
        if (currentLine < lines.length) {
            const line = document.createElement('div');
            line.className = 'notification-line';
            line.style.fontFamily = "'JetBrains Mono', monospace";
            line.style.color = type === 'success' ? '#00ff00' : '#ff0055';
            line.style.fontSize = '0.9rem';
            line.style.marginBottom = '5px';
            line.style.opacity = '0';
            
            const text = lines[currentLine];
            let i = 0;
            
            function typeChar() {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, 30);
                } else {
                    line.style.opacity = '1';
                    currentLine++;
                    setTimeout(typeLine, 500);
                }
            }
            
            notification.appendChild(line);
            typeChar();
        } else {
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'rgba(10, 10, 10, 0.9)';
    notification.style.border = '1px solid #00ff00';
    notification.style.borderRadius = '8px';
    notification.style.padding = '15px';
    notification.style.maxWidth = '400px';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
    
    document.body.appendChild(notification);
    typeLine();
}

// Initialize Animations
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-category, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Glitch effect on hero name
const heroName = document.querySelector('.hero-name');
if (heroName) {
    setInterval(() => {
        if (isDarkMode && Math.random() > 0.7) {
            heroName.style.textShadow = '0 0 10px #00ff00';
            setTimeout(() => {
                heroName.style.textShadow = 'none';
            }, 100);
        }
    }, 3000);
}

// Scan line effect
const scanLine = document.querySelector('.scan-line');
if (scanLine) {
    setInterval(() => {
        if (isDarkMode) {
            scanLine.style.opacity = Math.random() > 0.5 ? '1' : '0.5';
        }
    }, 2000);
}

// Add keyboard shortcuts for hacker mode
document.addEventListener('keydown', function(e) {
    if (isDarkMode) {
        // Ctrl + H to toggle hacker mode
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Ctrl + T to toggle terminal
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            terminalWindow.style.display = terminalWindow.style.display === 'none' ? 'block' : 'none';
        }
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (isDarkMode) {
            this.style.boxShadow = '0 0 20px var(--primary)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Initialize particle effect for dark mode
if (isDarkMode) {
    createParticles();
}

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--primary)';
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = '0 0 5px var(--primary)';
    
    // Random position
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = (Math.random() - 0.5) * 0.5;
    
    function move() {
        x += vx;
        y += vy;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) vx = -vx;
        if (y <= 0 || y >= 100) vy = -vy;
        
        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        
        // Random opacity flicker for hacker effect
        particle.style.opacity = Math.random() > 0.1 ? '1' : '0';
        
        requestAnimationFrame(move);
    }
    
    move();
}
