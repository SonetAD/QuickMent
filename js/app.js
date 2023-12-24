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
let questionCount = -1;
const questionDynamic = document.getElementById('questionDynamic');
const questionForm = document.getElementById('questionForm');
const prevArrow = document.getElementById('arrow');
const nextArrow = document.getElementById('leftarrow');
const questions = document.getElementById('questions');
let hamiltonScore = 0;
let montScore = 0;
let tempHamiltonScore = 0;
const scorePage = document.getElementById('scorepage');
const message = document.getElementById('message');
const nextLevel = document.getElementById('nextlevel');
const currentQuestionSet = {
  hamilton: true,
  mont: false,
};

// global functions

function dynamicInfo(messages, dynamicQuestion) {
  scorePage.style.display = 'none';
  hamiltonInfo.style.display = 'grid';
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
      console.log(startBtn);

      startBtn.addEventListener('click', (e) => {
        hamiltonInfo.style.display = 'none';
        questions.style.display = 'block';
        console.log(dynamicQuestion);
        questionCount++;
        loadQuestionDynamically(dynamicQuestion);
        e.preventDefault();
      });
    }
  }, 3000);
}

// load question dynamically on screen
function loadQuestionDynamically(dynamicQuestions) {
  console.log(questionCount);
  questionDynamic.textContent = dynamicQuestions[questionCount][0];
  // dynamically add options
  let i = 0;
  questionForm.innerHTML = '';
  for (let option in dynamicQuestions[questionCount][1]) {
    const optionDiv = document.createElement('div');
    // prepare  option input tagt
    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.setAttribute('id', `option${i}`);
    optionInput.value = dynamicQuestions[questionCount][1][option];
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
      tempHamiltonScore = dynamicQuestions[questionCount][1][option];
    });
    i++;
  }

  if (currentQuestionSet.hamilton) {
    hamiltonScore += tempHamiltonScore;
  } else if (currentQuestionSet.mont) {
    montScore += tempHamiltonScore;
  }
  tempHamiltonScore = 0;
}

// score page
function updateScore() {
  questions.style.display = 'none';
  scorePage.style.display = 'block';
  const score = document.getElementById('score');
  if (currentQuestionSet.hamilton) {
    score.textContent = `SCORE: ${hamiltonScore}`;
  } else if (currentQuestionSet.mont) {
    score.textContent = `SCORE: ${montScore}`;
  }
  let depressionMessage;
  const depressionLevel = {
    normal: 'YOU ARE NORMAL',
    mild: 'YOU HAVE MILD DEPRESSION',
    moderate: ' YOU HAVE MODERATE DEPRESSION',
    severe: 'SEVERE DEPRESSION',
    verySevere: 'VERY SEVERE DEPRESSION',
  };

  if (currentQuestionSet.hamilton) {
    if (0 <= hamiltonScore && hamiltonScore <= 7) {
      depressionMessage = depressionLevel.normal;
    } else if (8 <= hamiltonScore && hamiltonScore <= 13) {
      depressionMessage = depressionLevel.mild;
    } else if (14 <= hamiltonScore && hamiltonScore <= 18) {
      depressionMessage = depressionLevel.moderate;
    } else if (19 <= hamiltonScore && hamiltonScore <= 22) {
      depressionMessage = depressionLevel.severe;
    } else {
      depressionMessage = depressionLevel.verySevere;
    }
  } else if (currentQuestionSet.mont) {
    if (0 <= montScore && montScore <= 6) {
      depressionMessage = depressionLevel.normal;
    } else if (7 <= montScore && 13 <= 19) {
      depressionMessage = depressionLevel.mild;
    } else if (20 <= montScore && montScore <= 34) {
      depressionMessage = depressionLevel.moderate;
    } else {
      depressionMessage = depressionLevel.severe;
    }
  }
  message.textContent = depressionMessage;
  nextLevel.addEventListener('click', (e) => {
    console.log(currentQuestionSet);
    if (currentQuestionSet.hamilton) {
      dynamicInfo(['fuck'], questionList);
    } else if (currentQuestionSet.mont) {
      // questionCount++;
      dynamicInfo(['kka'], montList);
    }

    e.preventDefault();
  });
}

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
    dynamicInfo(messages, questionList);
  } else {
    window.alert('Oops!It seems you missed a field!');
  }
  e.preventDefault();
});

// question navigation by ke press

// document.addEventListener('keydown', (e) => {
//   let currentList = [];
//   if (currentQuestionSet.hamilton) {
//     currentList = questionList;
//   } else if (currentQuestionSet.mont) {
//     currentList = montList;
//   }
//   if (questionCount + 1 < currentList.length) {
//     if (e.key.toLowerCase() === 'arrowright') {
//       questionCount++;
//       if (currentQuestionSet.hamilton) {
//         loadQuestionDynamically('hamilton', questionList);
//       } else if (currentQuestionSet.mont) {
//         loadQuestionDynamically('mont', montList);
//       }
//     } else if (e.key.toLowerCase() === 'arrowleft') {
//       questionCount--;
//       if (currentQuestionSet.hamilton) {
//         loadQuestionDynamically('hamilton', questionList);
//       } else if (currentQuestionSet.mont) {
//         loadQuestionDynamically('mont', montList);
//       }
//     }
//   } else {
//     questionCount = -1;
//     if (currentQuestionSet.hamilton) {
//       currentQuestionSet.hamilton = false;
//       currentQuestionSet.mont = true;
//       updateScore('hamilton');
//     } else if (currentQuestionSet.mont) {
//       currentQuestionSet.mont = false;
//       updateScore('mont');
//     }
//   }
// });

// question navigation by arrow click
nextArrow.addEventListener('click', (e) => {
  let currentList = [];
  if (currentQuestionSet.hamilton) {
    currentList = questionList;
  } else if (currentQuestionSet.mont) {
    currentList = montList;
  }
  if (questionCount + 1 < currentList.length) {
    questionCount++;
    loadQuestionDynamically(currentList);
  } else {
    questionCount = -1;
    // loadQuestionDynamically();
    if (currentQuestionSet.hamilton) {
      currentQuestionSet.hamilton = false;
      currentQuestionSet.mont = true;
      updateScore();
    } else if (currentQuestionSet.mont) {
      currentQuestionSet.mont = false;
      updateScore();
    }
  }
  e.preventDefault();
});

// previous arrow
prevArrow.addEventListener('click', (e) => {
  let currentList = [];
  if (currentQuestionSet.hamilton) {
    currentList = questionList;
  } else if (currentQuestionSet.mont) {
    currentList = montList;
  }
  if (questionCount + 1 < currentList.length) {
    questionCount--;
    if (currentQuestionSet.hamilton) {
      loadQuestionDynamically('hamilton', questionList);
    } else if (currentQuestionSet.mont) {
      loadQuestionDynamically('mont', montList);
    }
  } else {
    questionCount = -1;
    // loadQuestionDynamically();
    if (currentQuestionSet.hamilton) {
      currentQuestionSet.hamilton = false;
      currentQuestionSet.mont = true;
      updateScore('hamilton');
    } else if (currentQuestionSet.mont) {
      currentQuestionSet.mont = false;
      updateScore('mont');
    }
  }
  e.preventDefault();
});
