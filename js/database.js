import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import {
  getDatabase,
  set,
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBSzGKhweBHCc-0C5AJFrqVnixMMgPiu7k',
  authDomain: 'quickment-ef21d.firebaseapp.com',
  databaseURL: 'https://quickment-ef21d-default-rtdb.firebaseio.com',
  projectId: 'quickment-ef21d',
  storageBucket: 'quickment-ef21d.appspot.com',
  messagingSenderId: '982730093545',
  appId: '1:982730093545:web:3e3bbba8d84e3c17bed178',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export function writeData(
  name,
  age,
  sex,
  country,
  hamiltonScore,
  montScore,
  qidsScore
) {
  const dataRef = ref(database, 'users');
  readData().then((oldData) => {
    let newData = [];
    if (oldData) {
      newData = oldData.data;
    }

    newData.push({
      name,
      age,
      sex,
      country,
      hamiltonScore,
      montScore,
      qidsScore,
    });

    set(dataRef, { data: newData });
  });
}

export function readData() {
  const dataRef = ref(database, 'users/');
  return new Promise((resolve, reject) => {
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
}

// writeData('sonet', 33, 'm', 'bd', 44, 33, 22);

// readData().then((mama) => {
//   console.log(mama);
// });
