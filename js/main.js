// ============================================
// PRODUCTION-GRADE INTERACTIVITY
// Modern Animations & Engagement Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollProgress();
    initScrollAnimations();
    initQuizzes();
    initExercises();
    initCodeCopy();
    initTocHighlight();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // Update on scroll
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.section, .feature-card, .module').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// QUIZ SYSTEM
// ============================================
function initQuizzes() {
    const quizzes = document.querySelectorAll('.quiz');

    quizzes.forEach(quiz => {
        const submitBtn = quiz.querySelector('.submit-quiz');
        const resetBtn = quiz.querySelector('.reset-quiz');
        const questions = quiz.querySelectorAll('.quiz-question');

        // Select option
        quiz.querySelectorAll('.quiz-options li').forEach(option => {
            option.addEventListener('click', function() {
                const question = this.closest('.quiz-question');
                const options = question.querySelectorAll('.quiz-options li');

                // Only allow selection if not already submitted
                if (!this.classList.contains('correct') && !this.classList.contains('incorrect')) {
                    options.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
        });

        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                checkQuizAnswers(quiz, questions);
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                resetQuiz(quiz, questions);
            });
        }
    });
}

function checkQuizAnswers(quiz, questions) {
    let correct = 0;
    let total = questions.length;
    let answered = 0;

    questions.forEach(question => {
        const options = question.querySelectorAll('.quiz-options li');
        const selectedOption = question.querySelector('.quiz-options li.selected');

        if (selectedOption) {
            answered++;
        }

        options.forEach(option => {
            const isCorrect = option.dataset.correct === 'true';

            if (isCorrect) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected')) {
                option.classList.add('incorrect');
            }

            option.style.pointerEvents = 'none';
        });

        if (selectedOption && selectedOption.dataset.correct === 'true') {
            correct++;
        }
    });

    // Show results
    let resultDiv = quiz.querySelector('.quiz-result');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.className = 'quiz-result';
        resultDiv.style.marginTop = '2rem';
        resultDiv.style.padding = '1.5rem';
        resultDiv.style.background = 'var(--glass-bg)';
        resultDiv.style.borderRadius = '12px';
        resultDiv.style.border = '2px solid var(--primary-color)';
        resultDiv.style.textAlign = 'center';
        resultDiv.style.fontSize = '1.2rem';
        resultDiv.style.fontWeight = '700';
        quiz.appendChild(resultDiv);
    }

    const percentage = Math.round((correct / total) * 100);
    let message = '';
    let color = '';

    if (percentage === 100) {
        message = '🎉 Perfect! You got all questions correct!';
        color = 'var(--success-color)';
    } else if (percentage >= 70) {
        message = '✅ Great job! You passed!';
        color = 'var(--success-color)';
    } else if (percentage >= 50) {
        message = '📚 Not bad, but review the material.';
        color = 'var(--warning-color)';
    } else {
        message = '🔄 Keep studying! You can do better.';
        color = 'var(--error-color)';
    }

    resultDiv.innerHTML = `
        <div style="color: ${color}; margin-bottom: 1rem;">${message}</div>
        <div>Score: <span style="color: ${color}">${correct}/${total}</span> (${percentage}%)</div>
        <div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            Answered: ${answered}/${total} questions
        </div>
    `;
    resultDiv.style.display = 'block';
    resultDiv.style.animation = 'fadeInUp 0.5s ease';

    quiz.querySelector('.submit-quiz').disabled = true;
}

function resetQuiz(quiz, questions) {
    questions.forEach(question => {
        const options = question.querySelectorAll('.quiz-options li');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    });

    const resultDiv = quiz.querySelector('.quiz-result');
    if (resultDiv) {
        resultDiv.style.display = 'none';
    }

    quiz.querySelector('.submit-quiz').disabled = false;
}

// ============================================
// EXERCISE SOLUTIONS
// ============================================
function initExercises() {
    const exercises = document.querySelectorAll('.exercise');

    exercises.forEach(exercise => {
        const showSolutionBtn = exercise.querySelector('.show-solution');
        const solution = exercise.querySelector('.solution');

        if (showSolutionBtn && solution) {
            showSolutionBtn.addEventListener('click', function() {
                solution.classList.toggle('visible');
                this.textContent = solution.classList.contains('visible')
                    ? '🔼 Hide Solution'
                    : '🔽 Show Solution';

                // Smooth scroll to solution if showing
                if (solution.classList.contains('visible')) {
                    setTimeout(() => {
                        solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            });
        }
    });
}

// ============================================
// CODE COPY FUNCTIONALITY
// ============================================
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = '📋 Copy';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '1rem';
        copyBtn.style.right = '1rem';
        copyBtn.style.padding = '0.5rem 1rem';
        copyBtn.style.fontSize = '0.85rem';
        copyBtn.style.zIndex = '10';

        // Wrap code block in container
        const container = document.createElement('div');
        container.style.position = 'relative';
        block.parentNode.insertBefore(container, block);
        container.appendChild(block);
        container.appendChild(copyBtn);

        copyBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            const code = block.querySelector('code')?.textContent || block.textContent;

            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = '✅ Copied!';
                copyBtn.style.background = 'var(--success-gradient)';

                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                    copyBtn.style.background = 'var(--glass-bg)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                copyBtn.textContent = '❌ Failed';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            }
        });
    });
}

// ============================================
// TABLE OF CONTENTS ACTIVE LINK
// ============================================
function initTocHighlight() {
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('section[id]');

    if (tocLinks.length === 0 || sections.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// INTERACTIVE SLIDER HELPERS
// ============================================
function setupSlider(sliderId, displayId, callback) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);

    if (slider && display) {
        slider.addEventListener('input', function() {
            display.textContent = this.value;
            if (callback) callback(parseFloat(this.value));
        });

        // Initialize
        if (callback) callback(parseFloat(slider.value));
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals);
}

function evaluateExpression(expr, x) {
    try {
        const sanitized = expr.replace(/x/g, `(${x})`);
        return Function(`"use strict"; return (${sanitized})`)();
    } catch (e) {
        console.error('Expression evaluation error:', e);
        return NaN;
    }
}

function renderMath() {
    if (window.MathJax) {
        MathJax.typesetPromise().catch((err) => console.error('MathJax error:', err));
    }
}

// ============================================
// TYPING ANIMATION (for hero sections)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search (if search is implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Implement search functionality here
        console.log('Search shortcut pressed');
    }

    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ============================================
// DARK MODE TOGGLE (future enhancement)
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'false' : 'true');
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.add('light-mode');
}

// ============================================
// EXPORT UTILITIES
// ============================================
window.CalculusUtils = {
    formatNumber,
    evaluateExpression,
    renderMath,
    setupSlider,
    typeWriter
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images (if any)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.body.appendChild(script);
}

// Service Worker for offline capability (future enhancement)
if ('serviceWorker' in navigator) {
    // Uncomment when ready to implement PWA
    // navigator.serviceWorker.register('/sw.js');
}

console.log('%c✨ Calculus for ML/DL/DS ✨', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for aspiring ML researchers', 'color: #a1a1aa; font-size: 12px;');
