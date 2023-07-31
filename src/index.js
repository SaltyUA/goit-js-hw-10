import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';

const elements = {
  catInfo: document.querySelector(`.cat-info`),
  select: document.querySelector(`.breed-select`),
  loader: document.querySelector(`.loader`),
  error: document.querySelector(`.error`),
};
elements.select.classList.add(`isHidden`);

fetchBreeds().then(elements.select.classList.remove(`isHidden`));

elements.select.addEventListener('change', setHtml);

function setHtml() {
  elements.loader.classList.remove(`isHidden`);
  fetchCatByBreed(elements.select.value)
    .then(cat => {
      elements.loader.classList.add(`isHidden`);

      elements.catInfo.innerHTML = ``;
      let markup;
      cat.map(breed => {
        markup = `<img src="${breed.url}">
      `;
        breed.breeds.map(breed => {
          markup += `<p class="breed-name">Breed Name: ${breed.name}</p>
          <p class="breed-desc">Description: ${breed.description}</p>
          <p class="breed-temp">Temperament: ${breed.temperament}</p>`;
        });
      });
      elements.catInfo.insertAdjacentHTML(`beforeend`, markup);
    })
    .catch(error =>
      Notiflix.Report.failure(
        `Oops! Something went wrong! Try reloading the page!`
      )
    );
}
