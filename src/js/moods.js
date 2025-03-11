import {fetchData} from './fetch';

const getMoods = async () => {
    
  // haetaan data joko json tai fetch rajapinnasta
  const url = 'http://localhost:3000/api/moods';

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
  createTable(response);
};

const createTable = (response) => {
    const tableBody = document.querySelector('#mood-table-body');
  tableBody.innerHTML = ''; //tyhjennetään taulukko

  response.forEach((response) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${response.mood}</td>
        <td>${response.notes}</td>
        <td>${new Date(response.created_at).toLocaleDateString('fi-FI')}</td>
      `;

    tableBody.appendChild(row);
  });
};

const addMood = async (event) => {
    event.preventDefault();
  
    // Haetaan formista oikea tieto mikä on täytetty .value
    

    const mood = document.querySelector('#mood').value.trim();
    const notes = document.querySelector('#mood-notes').value.trim();
  
    // url
    const url = 'http://localhost:3000/api/moods';
  
    // Nyt haetaan Token localstoragesta
    const token = localStorage.getItem('token');
  
    // POST
      //content-type: application/json
    
      const bodyData = {
        mood: mood,
        notes: notes,
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
      document.querySelector('#mood-form').reset(); // tyhjennetään formi
  
  };

export {getMoods,addMood};