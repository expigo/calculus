// Main JavaScript for Calculus Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Quiz functionality
    initializeQuizzes();

    // Exercise solutions toggle
    initializeExercises();

    // Code copy functionality
    initializeCodeCopy();
});

// Quiz System
function initializeQuizzes() {
    const quizzes = document.querySelectorAll('.quiz');

    quizzes.forEach(quiz => {
        const submitBtn = quiz.querySelector('.submit-quiz');
        const resetBtn = quiz.querySelector('.reset-quiz');
        const questions = quiz.querySelectorAll('.quiz-question');

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

    questions.forEach(question => {
        const options = question.querySelectorAll('.quiz-options li');
        const selectedOption = question.querySelector('.quiz-options li.selected');

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

    const resultDiv = quiz.querySelector('.quiz-result') || createResultDiv(quiz);
    resultDiv.innerHTML = `<strong>Score: ${correct}/${total}</strong> (${Math.round(correct/total * 100)}%)`;
    resultDiv.style.display = 'block';

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

function createResultDiv(quiz) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'quiz-result';
    resultDiv.style.marginTop = '1rem';
    resultDiv.style.padding = '1rem';
    resultDiv.style.backgroundColor = '#eff6ff';
    resultDiv.style.borderRadius = '0.5rem';
    quiz.appendChild(resultDiv);
    return resultDiv;
}

// Add click handlers for quiz options
document.addEventListener('click', function(e) {
    if (e.target.matches('.quiz-options li')) {
        const question = e.target.closest('.quiz-question');
        question.querySelectorAll('.quiz-options li').forEach(opt => {
            opt.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});

// Exercise Solutions
function initializeExercises() {
    const exercises = document.querySelectorAll('.exercise');

    exercises.forEach(exercise => {
        const showSolutionBtn = exercise.querySelector('.show-solution');
        const solution = exercise.querySelector('.solution');

        if (showSolutionBtn && solution) {
            showSolutionBtn.addEventListener('click', function() {
                solution.classList.toggle('visible');
                this.textContent = solution.classList.contains('visible')
                    ? 'Hide Solution'
                    : 'Show Solution';
            });
        }
    });
}

// Code Copy Functionality
function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '0.5rem';
        copyBtn.style.right = '0.5rem';
        copyBtn.style.padding = '0.25rem 0.75rem';
        copyBtn.style.fontSize = '0.75rem';

        // Wrap code block in container
        const container = document.createElement('div');
        container.style.position = 'relative';
        block.parentNode.insertBefore(container, block);
        container.appendChild(block);
        container.appendChild(copyBtn);

        copyBtn.addEventListener('click', async function() {
            const code = block.querySelector('code')?.textContent || block.textContent;

            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// Interactive slider handlers (for various visualizations)
function setupSlider(sliderId, displayId, callback) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);

    if (slider && display) {
        slider.addEventListener('input', function() {
            display.textContent = this.value;
            if (callback) callback(parseFloat(this.value));
        });
    }
}

// Utility function for formatting numbers
function formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals);
}

// Function to evaluate mathematical expressions (using safe evaluation)
function evaluateExpression(expr, x) {
    // This is a simple evaluator - in production, use a proper math library
    try {
        const sanitized = expr.replace(/x/g, `(${x})`);
        return Function(`"use strict"; return (${sanitized})`)();
    } catch (e) {
        console.error('Expression evaluation error:', e);
        return NaN;
    }
}

// LaTeX rendering helper (if needed for dynamic content)
function renderMath() {
    if (window.MathJax) {
        MathJax.typesetPromise().catch((err) => console.error('MathJax error:', err));
    }
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--primary-color)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress on content pages
if (document.querySelector('.main-content')) {
    initScrollProgress();
}

// Table of contents active link highlighting
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

initTocHighlight();

// Export utilities for use in other scripts
window.CalculusUtils = {
    formatNumber,
    evaluateExpression,
    renderMath,
    setupSlider
};
