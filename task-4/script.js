// Quiz questions data
const biologyQuizData = [
    {
        id: 1,
        question: 'What is the basic unit of life?',
        options: ['Atom', 'Molecule', 'Organ', 'Cell'],
        correctAnswer: 'Cell'
    },
    {
        id: 2,
        question: 'Which organelle is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
        correctAnswer: 'Mitochondria'
    },
    {
        id: 3,
        question: 'Which blood cells help in fighting infections?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
        correctAnswer: 'White blood cells'
    },
    {
        id: 4,
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Germination'],
        correctAnswer: 'Photosynthesis'
    },
    {
        id: 5,
        question: 'Which part of the brain controls balance and coordination?',
        options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Thalamus'],
        correctAnswer: 'Cerebellum'
    },
    {
        id: 6,
        question: 'What is the function of red blood cells?',
        options: ['Fight infection', 'Clot blood', 'Carry oxygen', 'Digest food'],
        correctAnswer: 'Carry oxygen'
    },
    {
        id: 7,
        question: 'DNA stands for:',
        options: ['Deoxyribonucleic Acid', 'Dinucleic Acid', 'Deoxyribose Nucleic Acid', 'Double Helix Acid'],
        correctAnswer: 'Deoxyribonucleic Acid'
    },
    {
        id: 8,
        question: 'Which organ filters waste from the blood?',
        options: ['Lungs', 'Liver', 'Kidneys', 'Heart'],
        correctAnswer: 'Kidneys'
    },
    {
        id: 9,
        question: 'Which vitamin is produced when the skin is exposed to sunlight?',
        options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 'Vitamin D'
    },
    {
        id: 10,
        question: 'What is the main function of the large intestine?',
        options: ['Digest food', 'Absorb water', 'Produce enzymes', 'Store fat'],
        correctAnswer: 'Absorb water'
    }
];


// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// DOM elements
const quizContent = document.getElementById('quiz-content');

// Initialize the quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
}

// Display the current question
function showQuestion() {
    const questionData = biologyQuizData[currentQuestion];
    const questionNumber = currentQuestion + 1;
    const percentage = Math.round((questionNumber / biologyQuizData.length) * 100);
    
    const questionHTML = `
        <div class="question-header">
            <span class="question-progress">Question ${questionNumber} of ${biologyQuizData.length}</span>
            <span class="progress-percentage">${percentage}%</span>
        </div>
        
        <div class="question-card">
            <h2 class="question-text">${questionData.question}</h2>
            
            <div class="options-list">
                ${questionData.options.map((option, index) => `
                    <button class="option-button" onclick="handleAnswer(this, '${option}')">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    quizContent.innerHTML = questionHTML;
}

// Handle user answer selection
function handleAnswer(buttonElement, selectedOption) {
    // Get all option buttons
    const allButtons = document.querySelectorAll('.option-button');
    
    // Disable all buttons to prevent multiple selections
    allButtons.forEach(button => {
        button.classList.add('disabled');
    });
    
    const correctAnswer = biologyQuizData[currentQuestion].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;
    
    // Apply visual feedback
    if (isCorrect) {
        buttonElement.classList.add('correct-answer');
        score++;
    } else {
        buttonElement.classList.add('incorrect-answer');
        
        // Also highlight the correct answer
        allButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct-answer');
            }
        });
    }
    
    userAnswers[currentQuestion] = selectedOption;
    
    // Delay before moving to the next question to show the feedback
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < biologyQuizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500); // 1.5 second delay
}

// Display the quiz results
function showResult() {
    const percentage = Math.round((score / biologyQuizData.length) * 100);
    
    let message = '';
    let messageClass = '';
    
    if (percentage >= 80) {
        message = 'Excellent!';
        messageClass = 'excellent';
    } else if (percentage >= 60) {
        message = 'Good job!';
        messageClass = 'good';
    } else if (percentage >= 40) {
        message = 'Not bad!';
        messageClass = 'average';
    } else {
        message = 'Keep practicing!';
        messageClass = 'poor';
    }
    
    const resultHTML = `
        <div class="result-container">
            <h2>Quiz Results</h2>
            <p class="result-message ${messageClass}">${message}</p>
            
            <div class="score-box">
                <p class="score-text">
                    You scored <strong>${score}</strong> out of <strong>${biologyQuizData.length}</strong>
                </p>
                <p class="score-text">
                    <strong>(${percentage}%)</strong>
                </p>
            </div>
            
            <button class="restart-button" onclick="initQuiz()">Restart Quiz</button>
        </div>
    `;
    
    quizContent.innerHTML = resultHTML;
}


// Start the quiz when the page loads
window.onload = initQuiz;