import axios from 'axios';

const selectEl = document.querySelector(`.breed-select`);
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_stwoMKnBCI3w3rm3mZUgdEVuOSe4KN3KZsGbFRMCCwhYVDzCm7Dtc6qPEAFc8IYq';

export async function fetchBreeds() {
  const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
  const catsArr = [...response.data];
  const catsListArr = catsArr.map(breed => {
    return `<option value='${breed.id}'>${breed.name}</option>`;
  });
  const selectTemplate = `${catsListArr.join(``)}`;
  selectEl.insertAdjacentHTML(`beforeend`, selectTemplate);
}

export async function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
