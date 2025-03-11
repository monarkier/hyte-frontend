import {fetchData} from './fetch';

const getEntries = async () => {

  const diaryContainer = document.getElementById('diary');
  console.log(diaryContainer);

  // haetaan data joko json tai fetch rajapinnasta
  const url = 'http://localhost:3000/api/entries';

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

  const response = await fetchData(url,options);

  if (response.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(response);
  luoTaulu(response);
  
};

const luoTaulu = (response) => {
  const tableBody = document.querySelector('#entries-table-body');
  tableBody.innerHTML = ''; //tyhjennetään taulukko

  response.forEach((response) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${response.sleep_duration}</td>
        <td>${response.sleep_quality}</td>
        <td>${response.dream_description}</td>
        <td>${new Date(response.created_at).toLocaleDateString('fi-FI')}</td>
      `;

    tableBody.appendChild(row);
  });
};

const addEntry = async (event) => {
  event.preventDefault();

  // Haetaan formista oikea tieto mikä on täytetty .value
  const sleep_duration = document.querySelector('#sleep-duration').value.trim();
  const sleep_quality = document.querySelector('#sleep-quality').value.trim();
  const dream_description = document.querySelector('#dream-description').value.trim();

  // url
  const url = 'http://localhost:3000/api/entries';

  // Nyt haetaan Token localstoragesta
  const token = localStorage.getItem('token');

  // POST
    //content-type: application/json
  
    const bodyData = {
      sleep_duration: sleep_duration,
      sleep_quality: sleep_quality,
      dream_description: dream_description,
    };
  
    // options eli mikä metodi, headers ja JSON
    const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    };
    console.log(options);
  
    const response = await fetchData(url, options);
  
    if (response.error) {
      // On hyvä jättää oikea virhe ns. koodareille luettavaksi
      console.log(response.error);
      return;
    }
  
    if (response.message) {
      console.log(response.message);
    }
  
    console.log(response);
    document.querySelector('#sleep-form').reset(); // tyhjennetään formi

};

export {getEntries,addEntry};