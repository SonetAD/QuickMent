import questionList from './data_modal.js';
import montList from './data_montgomery.js';
import qidsList from './data_qids.js';

import { readData, writeData } from './database.js';

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
let qidsScore = 0;
let tempHamiltonScore = -1;
const scorePage = document.getElementById('scorepage');
const message = document.getElementById('message');
const nextLevel = document.getElementById('nextlevel');
const currentQuestionSet = {
  hamilton: true,
  mont: false,
  qids: false,
};
let tempMoveTrack = 0;
const chart = document.getElementById('chart');

let checkIfBtn = false;

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
      if (!checkIfBtn) {
        hamiltonInfo.appendChild(btn);
        checkIfBtn = true;
      }

      const startBtn = document.getElementById('startBtn');
      // startBtn.style.display = 'none';

      startBtn.addEventListener('click', (e) => {
        checkIfBtn = false;
        hamiltonInfo.style.display = 'none';
        questions.style.display = 'block';
        console.log(dynamicQuestion);
        questionCount++;
        loadQuestionDynamically(dynamicQuestion, 'next');
        e.preventDefault();
      });
    }
  }, 3000);
}

// load question dynamically on screen
function loadQuestionDynamically(dynamicQuestions, trackMove) {
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
    console.log(tempHamiltonScore);
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        hamiltonScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        hamiltonScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  } else if (currentQuestionSet.mont) {
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        if (tempHamiltonScore % 2 === 0) {
          tempHamiltonScore /= 2;
        }
        montScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        montScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  } else {
    if (trackMove === 'next') {
      tempMoveTrack = tempHamiltonScore;
      if (tempHamiltonScore >= 0) {
        qidsScore += tempHamiltonScore;
      }
    } else {
      if (tempHamiltonScore >= 0) {
        qidsScore -= tempMoveTrack;
        tempMoveTrack = 0;
      }
    }
  }

  tempHamiltonScore = -1;
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
  } else {
    score.textContent = `SCORE: ${qidsScore}`;
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
  } else {
    if (0 <= qidsScore && qidsScore <= 5) {
      depressionMessage = depressionLevel.normal;
    } else if (6 <= qidsScore && qidsScore <= 10) {
      depressionMessage = depressionLevel.mild;
    } else if (11 <= qidsScore && qidsScore <= 15) {
      depressionMessage = depressionLevel.moderate;
    } else if (16 <= qidsScore && qidsScore <= 20) {
      depressionMessage = depressionLevel.severe;
    } else {
      depressionMessage = depressionLevel.verySevere;
    }
  }
  message.textContent = depressionMessage;
  nextLevel.addEventListener('click', (e) => {
    if (currentQuestionSet.hamilton) {
      dynamicInfo(['No Message'], questionList);
    } else if (currentQuestionSet.mont) {
      // questionCount++;
      dynamicInfo(['kka'], montList);
    } else if (currentQuestionSet.qids) {
      // questionCount--;
      dynamicInfo(['mama'], qidsList);
    } else {
      writeData(
        profileInfo.name,
        profileInfo.age,
        profileInfo.sex,
        profileInfo.country,
        hamiltonScore,
        montScore,
        qidsScore
      );

      scorePage.style.display = 'none';
      chart.style.display = 'flex';

      readData().then((userData) => {
        const totalUser = userData.data.length;
        let normal = 0;
        let mild = 0;
        let modarate = 0;
        let severe = 0;
        let verySevere = 0;

        userData.data.forEach((data) => {
          if (0 <= data.hamiltonScore && data.hamiltonScore <= 7) {
            normal += 1;
          } else if (8 <= data.hamiltonScore && 13 <= data.hamiltonScore) {
            mild += 1;
          } else if (14 <= data.hamiltonScore && 18 <= data.hamiltonScore) {
            modarate += 1;
          } else if (19 <= data.hamiltonScore && 22 <= data.hamiltonScore) {
            severe += 1;
          } else {
            verySevere += 1;
          }
        });

        const colors = ['red', 'green', 'blue', 'yellow', 'purple']; // Colors
        const finalData = [
          (normal / totalUser) * 100,
          (mild / totalUser) * 100,
          (modarate / totalUser) * 100,
          (severe / totalUser) * 100,
          (verySevere / totalUser) * 100,
        ];

        drawPieChart(finalData, colors);
      });
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

const moveNext = (el) => {
  if (tempHamiltonScore > -1) {
    let currentList = [];
    if (currentQuestionSet.hamilton) {
      currentList = questionList;
    } else if (currentQuestionSet.mont) {
      currentList = montList;
    } else {
      currentList = qidsList;
    }
    if (questionCount + 1 < currentList.length) {
      questionCount++;
      loadQuestionDynamically(currentList, 'next');
    } else {
      questionCount = -1;
      // loadQuestionDynamically();
      if (currentQuestionSet.hamilton) {
        updateScore();
        currentQuestionSet.hamilton = false;
        currentQuestionSet.mont = true;
      } else if (currentQuestionSet.mont) {
        updateScore();
        currentQuestionSet.mont = false;
        currentQuestionSet.qids = true;
      } else {
        updateScore();
        currentQuestionSet.qids = false;
      }
    }
  } else {
    window.alert('Please Select an option');
  }
};

const movePrev = () => {
  let currentList = [];
  if (currentQuestionSet.hamilton) {
    currentList = questionList;
  } else if (currentQuestionSet.mont) {
    currentList = montList;
  }
  if (questionCount >= 0) {
    questionCount--;
    loadQuestionDynamically(currentList, 'prev');
  } else {
    questionCount = -1;
    // loadQuestionDynamically();
    if (currentQuestionSet.hamilton) {
      updateScore();
      currentQuestionSet.hamilton = false;
      currentQuestionSet.mont = true;
    } else if (currentQuestionSet.mont) {
      updateScore();
      currentQuestionSet.mont = false;
    } else {
      updateScore();
      currentList.qids = true;
    }
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'arrowright') {
    moveNext();
  } else if (e.key.toLocaleLowerCase() === 'arrowleft') {
    movePrev();
  }
});
// question navigation by arrow click
nextArrow.addEventListener('click', (e) => {
  moveNext();
  e.preventDefault();
});

// previous arrow

prevArrow.addEventListener('click', (e) => {
  movePrev();
  e.preventDefault();
});

// chart section

function drawPieChart(data, colors) {
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');

  const total = data.reduce((a, b) => a + b, 0);
  var startAngle = 0;

  for (var i = 0; i < data.length; i++) {
    var sliceAngle = (2 * Math.PI * data[i]) / total;
    drawSlice(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width / 2, canvas.height / 2),
      startAngle,
      startAngle + sliceAngle,
      colors[i]
    );
    startAngle += sliceAngle;
  }
}

function drawSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

drawPieChart([25, 25, 4, 25, 25], ['red', 'black', 'blue', 'pink', 'green']);
