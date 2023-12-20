// popup.js
const goalScreen = document.getElementById('goal-screen');
const goalInput = document.getElementById('goal-input');
const taskScreen = document.getElementById('task-screen');
const taskInput = document.getElementById('task-input');
const workScreen = document.getElementById('work-screen');
const restScreen = document.getElementById('rest-screen');
const endScreen = document.getElementById('end-screen');
const workDescription = document.getElementById('work-description');
const workTimer = document.getElementById('work-timer');
const restTimer = document.getElementById('rest-timer');
const endBlockTitle = document.getElementById('end-block-title');
const summaryDiv = document.getElementById('summary');

// Initial state
let state = 'goal'; // 'goal', 'task', 'work', 'rest', 'end'
let taskSummary = [];

// Counter for WORK sessions
let workSessionCount = 0;

// Event listeners for input
goalInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter' && goalInput.value.trim() !== '') {
    handleInput(goalInput.value.trim());
  }
});

taskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter' && taskInput.value.trim() !== '') {
    handleInput(taskInput.value.trim());
  }
});

// Handle different states
function handleInput(input) {
  switch (state) {
    case 'goal':
      goalScreen.style.display = 'none';
      taskScreen.style.display = 'block';
      state = 'task';
      break;

    case 'task':
      taskScreen.style.display = 'none';
      workScreen.style.display = 'block';
      state = 'work';
      workDescription.innerText = `Task: ${input}`;
      startTimer(5, 'work'); // Shortened for testing (5 seconds)
      break;

    case 'work':
      workSessionCount++;
      workScreen.style.display = 'none';
      restScreen.style.display = 'block';
      state = 'rest';
      taskSummary.push(input);
      startTimer(2, 'rest'); // Shortened for testing (2 seconds)
      break;

    case 'rest':
      restScreen.style.display = 'none';
      taskScreen.style.display = 'block';
      state = 'task';

      if (workSessionCount === 4) {
        showEndBlock();
      }
      break;

    case 'end':
      endScreen.style.display = 'none';
      goalScreen.style.display = 'block';
      state = 'goal';
      break;

    default:
      break;
  }
}

// Timer functionality
let timer;
let timerDisplay;

function startTimer(durationInSeconds, timerType) {
  timerDisplay = durationInSeconds;

  timer = setInterval(function() {
    timerDisplay--;

    if (timerDisplay <= 0) {
      clearInterval(timer);
      handleInput(); // Move to the next state
    }

    updateTimerDisplay(timerType);
  }, 1000);
}

function updateTimerDisplay(timerType) {
  if (timerType === 'work') {
    workTimer.innerText = `Work: ${formatTime(timerDisplay)}`;
  } else if (timerType === 'rest') {
    restTimer.innerText = `Rest: ${formatTime(timerDisplay)}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Show end block function
function showEndBlock() {
  endScreen.style.display = 'block';
  endBlockTitle.innerText = 'END OF WORK BLOCK';
  summaryDiv.innerText = `Tasks Completed:\n\n${taskSummary.join('\n')}`;
}

// Initial display
goalScreen.style.display = 'block';
