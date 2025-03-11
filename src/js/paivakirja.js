import '../css/style.css';
import { addEntry, getEntries } from "./entries";
import { getExercises, addExercise } from "./exercises";
import { getMoods, addMood } from "./moods";
import { getMe, deleteUser } from "./users";

document.getElementById('naytaSleep').addEventListener('click',function (){
    document.querySelector('#unipaivakirja').classList.remove('hidden');
    document.querySelector('#treenipaivakirja').classList.add('hidden');
    document.querySelector('#mielialapaivakirja').classList.add('hidden');
    document.querySelector('#asetukset').classList.add('hidden');
});

document.getElementById('naytaExercise').addEventListener('click',function (){
    document.querySelector('#treenipaivakirja').classList.remove('hidden');
    document.querySelector('#unipaivakirja').classList.add('hidden');
    document.querySelector('#mielialapaivakirja').classList.add('hidden');
    document.querySelector('#asetukset').classList.add('hidden');
});

document.getElementById('naytaMood').addEventListener('click',function (){
    document.querySelector('#mielialapaivakirja').classList.remove('hidden');
    document.querySelector('#treenipaivakirja').classList.add('hidden');
    document.querySelector('#unipaivakirja').classList.add('hidden');
    document.querySelector('#asetukset').classList.add('hidden');
});

document.getElementById('naytaAsetukset').addEventListener('click',function (){
    document.querySelector('#asetukset').classList.remove('hidden');
    document.querySelector('#treenipaivakirja').classList.add('hidden');
    document.querySelector('#unipaivakirja').classList.add('hidden');
    document.querySelector('#mielialapaivakirja').classList.add('hidden');
    getMe();
});

document.getElementById('naytaUnet').addEventListener('click',function (){
    document.querySelector('#view-entries').classList.remove('hidden');
    document.querySelector('#add-entry').classList.add('hidden');
    getEntries();
});

document.getElementById('lisaaUnet').addEventListener('click',function (){
    document.querySelector('#add-entry').classList.remove('hidden');
    document.querySelector('#view-entries').classList.add('hidden');
});

document.getElementById('naytaTreeni').addEventListener('click',function (){
    document.querySelector('#view-entries-t').classList.remove('hidden');
    document.querySelector('#add-entry-t').classList.add('hidden');
    getExercises();
    }); 

document.getElementById('lisaaTreeni').addEventListener('click',function (){
    document.querySelector('#add-entry-t').classList.remove('hidden');
    document.querySelector('#view-entries-t').classList.add('hidden');
    });

document.getElementById('naytaMieliala').addEventListener('click',function (){
    document.querySelector('#view-entries-m').classList.remove('hidden');
    document.querySelector('#add-entry-m').classList.add('hidden');
    getMoods();
        });
        
document.getElementById('lisaaMieliala').addEventListener('click',function (){
        document.querySelector('#add-entry-m').classList.remove('hidden');
        document.querySelector('#view-entries-m').classList.add('hidden');
            });

const addEntriesForm = document.querySelector('.entrySubmit');
addEntriesForm.addEventListener('click',addEntry);

const addExerciseForm = document.querySelector('.exerciseSubmit');
addExerciseForm.addEventListener('click',addExercise);

const addMoodForm = document.querySelector('.moodSubmit');
addMoodForm.addEventListener('click',addMood);

document.getElementById('delete-user').addEventListener('click', () => {
    const confirmDelete = confirm('Haluatko varmasti poistaa käyttäjätilisi? Tätä toimintoa ei voi peruuttaa!');
    if (confirmDelete) {
        deleteUser();
    }
  });

document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "index.html";
}); 