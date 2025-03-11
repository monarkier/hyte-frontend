import {fetchData} from './fetch';

/////////////////////
// Dialogi
/* const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');

closeButton.addEventListener('click', () => {
  dialog.close();
});

/////////////////////
// Snackbar
const snackbar = document.getElementById('snackbar');

const showSnackbar = (message, type = '') => {
  snackbar.innerText = message;
  snackbar.className = `show ${type}`.trim(); // Add optional type class (e.g., 'error')

  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '').trim();
  }, 3000);
};

/////////////////////
// getUsers
const getUsers = async () => {
  const url = 'http://localhost:3000/api/users';

  // Kutsun headers tiedot johon liitetään tokeni
  let headers = {};

  // Nyt haetaan Token localstoragesta
  const token = localStorage.getItem('token');

  // Muodostetaa nyt headers oikeaan muotoon
  headers = {Authorization: `Bearer ${token}`};

  // Options
  const options = {
    headers: headers,
  };
  console.log(options);

  const users = await fetchData(url, options);

  if (users.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(users);

  const tableBody = document.querySelector('.tbody');
  tableBody.innerHTML = ''; //tyhjennetään taulukko

  // TODO, myöhemmin järkevä erotella omaksi funktiokseen
  users.forEach((user) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><button class="check" data-id="${user.user_id}">Info</button></td>
        <td><button class="del" data-id="${user.user_id}">Delete</button></td>
        <td>${user.user_id}</td>
      `;

    tableBody.appendChild(row);
  });

  addEventListeners();
};

const addEventListeners = () => {
  const nappulat = document.querySelectorAll('.check');
  console.log(nappulat);
  nappulat.forEach((button) => {
    button.addEventListener('click', async (event) => {
      console.log('Klikkasit nappulaa:', event.target);
      const userId = event.target.dataset.id;
      console.log('Haetaan tietoja käyttäjälle id:llä:', userId);

      const user = await getUserById(userId);
      console.log(user);

      if (user) {
        dialog.querySelector('p').innerHTML = '';
        dialog.showModal();
        dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${user.user_id}</span></div>
          <div>User Name: <span>${user.username}</span></div>
          <div>Email: <span>${user.email}</span></div>
          <div>Role: <span>${user.user_level}</span></div>`;
      }
    });
  });
}; */

/////////////////////
// getUsersById
const getUserById = async (userId) => {
  const user = await fetchData(`http://localhost:3000/api/users/${userId}`);

  if (user.error) {
    console.error(`Error fetching item with ID ${userId}:`, user.error);
    alert(`Error: ${user.error}`);
    return null;
  }
  return user;
};

/////////////////////
// getMe
const getMe = async () => {
  const url = 'http://localhost:3000/api/auth/me';

    // Kutsun headers tiedot johon liitetään tokeni
    let headers = {};

    // Nyt haetaan Token localstoragesta
    const token = localStorage.getItem('token');
  
    // Muodostetaa nyt headers oikeaan muotoon
    headers = {Authorization: `Bearer ${token}`};
  
    // Options
    const options = {
      headers: headers,
    };
    console.log(options);

    const haku = await fetchData(url, options);

  if (haku.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(haku);
  createProfile(haku);
};


const createProfile = (userData) => {
  const profileContainer = document.getElementById('userProfile');

  if (!profileContainer) {
    console.error("Elementti 'userProfile' ei löytynyt!");
    return;
  }

  profileContainer.innerHTML = `
    <h2>Käyttäjätiedot</h2>
    <p><strong>Käyttäjänimi:</strong> ${userData.username}</p>
    <p><strong>Sähköposti:</strong> ${userData.email}</p>
    <p><strong>Rekisteröitynyt:</strong> ${new Date(userData.created_at).toLocaleDateString('fi-FI')}</p>
  `;
};


/* document.addEventListener('DOMContentLoaded', () => {
  const fetchUserBtn = document.querySelector('#fetchUserBtn');

  fetchUserBtn.addEventListener('click', async () => {
    const userId = document.querySelector('#userIdInput').value.trim();

    if (!userId) {
      alert('Syötä käyttäjän ID!');
      return;
    }

    const user = await getUserById(userId);

    if (user) {
      alert(`
        Käyttäjä ID: ${user.user_id}
        Käyttäjänimi: ${user.username}
        Email: ${user.email}
        Rooli: ${user.user_level}
      `);
    } else {
      alert('Käyttäjää ei löytynyt!');
    }
  });
}); */


/////////////////////
// addUser
const addUser = async (event) => {
  event.preventDefault();

  // Haetaan formista oikea tieto mikä on täytetty .value
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const email = document.querySelector('#email').value.trim();

  // url
  const url = 'http://localhost:3000/api/users';

  // POST
  //content-type: application/json

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // options eli mikä metodi, headers ja JSON
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    // On hyvä jättää oikea virhe ns. koodareille luettavaksi
    console.log(response.error);
    // Käyttäjän viesti!!
    showSnackbar(
      'Virhe lähettämisessä, täytä kaikki vaadittavat kentät!',
      'error',
    );
    return;
  }

  if (response.message) {
    console.log(response.message);
    showSnackbar('Onnistunut käyttäjän lisääminen :) 💕', 'success');
  }

  console.log(response);
  document.querySelector('.addform').reset(); // tyhjennetään formi
  getUsers();
};

const deleteUser = async () => {
  try {
    const userId = await getUserID();

    console.log(userId);

    if (!userId) {
      console.error('Käyttäjän ID:tä ei löytynyt');
      return;
    }

    const url = `http://localhost:3000/api/users/${userId}`;
    
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok) {
      console.log('Käyttäjä poistettu:', result.message);
      localStorage.clear(); // Tyhjennä localStorage
      window.location.href = 'index.html'; // Ohjaa kirjautumissivulle
    } else {
      console.error('Virhe poistossa:', result.message);
    }
  } catch (error) {
    console.error('Virhe deleteUser-funktiossa:', error);
  }
};


const getUserID = async () => {
  const url = 'http://localhost:3000/api/auth/me';
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token puuttuu! Käyttäjä ei ole kirjautunut.');
    return null;
  }

  const options = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      console.log(data.user_id);
      return data.user_id; // Palauttaa käyttäjän ID:n
    } else {
      console.error('Virhe käyttäjän tietojen haussa:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Virhe palvelimeen yhdistäessä:', error);
    return null;
  }
};


export {addUser, getMe, deleteUser, getUserID};