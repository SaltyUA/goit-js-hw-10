import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const elements = {
  catInfo: document.querySelector(`.cat-info`),
  select: document.querySelector(`.breed-select`),
  loader: document.querySelector(`.loader`),
  error: document.querySelector(`.error`),
};

elements.select.classList.add(`isHidden`);

fetchBreeds()
  .then(() => {
    elements.loader.classList.add(`isHidden`);
    elements.select.classList.remove(`isHidden`);
  })
  .catch(error => {
    console.warn(error);
    elements.loader.classList.add(`isHidden`);
    Notiflix.Report.failure(
      `Oops! Something went wrong! Try reloading the page!`
    );
  });

elements.select.addEventListener('change', setHtml);

function setHtml() {
  elements.catInfo.innerHTML = ``;
  elements.loader.classList.remove(`isHidden`);
  fetchCatByBreed(elements.select.value)
    .then(cat => {
      elements.loader.classList.add(`isHidden`);

      let markup;
      cat.map(breed => {
        markup = `<img src="${breed.url}">
      `;
        breed.breeds.map(breed => {
          markup += `<div class="breed-info">
          <p class="breed-name"><b>Breed Name:</b> ${breed.name}</p>
          <p class="breed-desc"><b>Description:</b> ${breed.description}</p>
          <p class="breed-temp"><b>Temperament:</b> ${breed.temperament}</p>
          </div>`;
        });
      });
      elements.catInfo.insertAdjacentHTML(`beforeend`, markup);
    })
    .catch(error => {
      console.warn(error);
      elements.loader.classList.add(`isHidden`);
      Notiflix.Report.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    });
}
