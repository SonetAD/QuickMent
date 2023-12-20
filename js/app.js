// variables
const welcome = document.getElementById('welcome');
const welcomeBtn = document.getElementById('welcomeBtn');
const profile = document.getElementById('profile');
const profileForm = document.getElementById('profileForm');
const name = document.getElementById('name');
const age = document.getElementById('age');
const sex = document.getElementById('sex');
const country = document.getElementById('country');
const hamiltonInfo = document.getElementById('hamiltonInfo');
const profileInfo = {};
let questionCount = 0;
const questionDynamic = document.getElementById('questionDynamic');
const questionForm = document.getElementById('questionForm');
const prevArrow = document.getElementById('arrow');
const nextArrow = document.getElementById('leftarrow');
const questions = document.getElementById('questions');
let hamiltonScore = 0;
let tempHamiltonScore = 0;
const scorePage = document.getElementById('scorepage');
const message = document.getElementById('message');

// welcome page
welcomeBtn.addEventListener('click', (e) => {
  welcome.style.display = 'none';
  profile.style.display = 'block';
  e.preventDefault();
});

// profile page
profileForm.addEventListener('submit', (e) => {
  if (name.value && age.value && sex.value && country.value) {
    profileInfo.name = name.value;
    profileInfo.age = age.value;
    profileInfo.sex = sex.value;
    profileInfo.country = country.value;
    profile.style.display = 'none';
    hamiltonInfo.style.display = 'grid';
    // hamilton info page

    const messages = [
      `Hi ${name.value},how are you doing?`,
      'Are you depressed today?',
      'I can mesure your Psychological Condition with Hamilton Rating Sca.',
      'Are you Ready?',
    ];
    let i = 0;
    hamiltonInfo.innerHTML = `<h1 id='info'>${messages[i]}</h1>`;
    let showInfo = setInterval(() => {
      if (i + 1 < messages.length) {
        hamiltonInfo.innerHTML = `<h1 id='info'>${messages[i + 1]}</h1>`;
        i++;
      } else {
        clearInterval(showInfo);
        const btn = document.createElement('button');
        btn.textContent = 'START';
        btn.setAttribute('class', 'btn');
        btn.setAttribute('id', 'startBtn');
        hamiltonInfo.appendChild(btn);

        const startBtn = document.getElementById('startBtn');

        startBtn.addEventListener('click', (e) => {
          hamiltonInfo.style.display = 'none';
          questions.style.display = 'block';
          loadQuestionDynamically();
          e.preventDefault();
        });
      }
    }, 3000);
  } else {
    window.alert('Oops!It seems you missed a field!');
  }
  e.preventDefault();
});

// questions page

function loadQuestionDynamically() {
  hamiltonScore += tempHamiltonScore;
  // console.log(tempHamiltonScore);
  questionDynamic.textContent = questionList[questionCount][0];
  // dynamically add options
  let i = 0;
  questionForm.innerHTML = '';
  for (let option in questionList[questionCount][1]) {
    const optionDiv = document.createElement('div');
    // prepare  option input tagt
    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.setAttribute('id', `option${i}`);
    optionInput.value = questionList[questionCount][1][option];
    optionInput.setAttribute('name', 'option');
    // prepare  labelt
    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('class', 'questionLable');
    optionLabel.setAttribute('for', `option${i}`);

    optionLabel.textContent = option;

    // append input and label to option div
    optionDiv.appendChild(optionInput);
    optionDiv.appendChild(optionLabel);
    questionForm.appendChild(optionDiv);
    const selectedOption = document.getElementById(`option${i}`);
    selectedOption.addEventListener('click', (e) => {
      tempHamiltonScore = questionList[questionCount][1][option];
      console.log(tempHamiltonScore);
    });
    i++;
  }
}

function updateScore() {
  questions.style.display = 'none';
  scorePage.style.display = 'block';
  const score = document.getElementById('score');
  score.textContent = `SCORE: ${hamiltonScore}`;
  let depressionMessage;
  if (0 <= hamiltonScore && hamiltonScore <= 7) {
    depressionMessage = 'YOU ARE NORMAL';
  } else if (8 <= hamiltonScore && hamiltonScore <= 13) {
    depressionMessage = 'YOU HAVE MILD DEPRESSION';
  } else if (14 <= hamiltonScore && hamiltonScore <= 18) {
    depressionMessage = 'YOU HAVE MODERATE DEPRESSION';
  } else if (19 <= hamiltonScore && hamiltonScore <= 22) {
    depressionMessage = 'SEVERE DEPRESSION';
  } else {
    depressionMessage = 'VERY SEVERE DEPRESSION';
  }
  message.textContent = depressionMessage;
}

document.addEventListener('keydown', (e) => {
  if (0 <= questionCount && questionCount + 1 < questionList.length) {
    if (e.key.toLowerCase() === 'arrowright') {
      questionCount++;
      loadQuestionDynamically();
    } else if (e.key.toLowerCase() === 'arrowleft') {
      questionCount--;
      loadQuestionDynamically();
    }
  } else {
    questionCount = 0;
    // loadQuestionDynamically();
    updateScore();
  }
  // e.preventDefault();
});

nextArrow.addEventListener('click', (e) => {
  if (0 <= questionCount && questionCount + 1 < questionList.length) {
    questionCount++;
    loadQuestionDynamically();
  } else {
    questionCount = 0;
    updateScore();
  }
  e.preventDefault();
});

prevArrow.addEventListener('click', (e) => {
  if (0 <= questionCount && questionCount + 1 < questionList.length) {
    questionCount--;
    loadQuestionDynamically();
  } else {
    questionCount = 0;
    updateScore();
  }
  e.preventDefault();
});
