import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_stwoMKnBCI3w3rm3mZUgdEVuOSe4KN3KZsGbFRMCCwhYVDzCm7Dtc6qPEAFc8IYq';

export async function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.data);
}

export async function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
