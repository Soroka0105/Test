
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkUp, elms } from './Markup';
let page = 1;
const perPage = 40;
let lightbox = new SimpleLightbox('.gallery a', {});

elms.form.addEventListener('submit', handlerSubmit);
elms.loadMoreBtn.addEventListener('click', loadMoreHandler);

async function handlerSubmit(evt) {
  evt.preventDefault();
  page = 1;
  const params = new URLSearchParams({
    key: elms.APIKEY,
    q: elms.input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  try {
    elms.gallery.innerHTML = ''
    elms.form.reset()
    elms.loadMoreBtn.classList.replace('load-more', 'load-more-hiden');
    const responce = await axios.get(`${elms.BASIC_URL}?${params}`);
    console.log(responce);
    createMarkUp(responce.data.hits);
    lightbox.refresh();
    if (responce.data.hits.length === 0) {
      elms.loadMoreBtn.classList.replace('load-more', 'load-more-hiden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (responce.data.hits.length !== 0) {
      elms.loadMoreBtn.classList.replace('load-more-hiden', 'load-more');
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMoreHandler() {
  page += 1;
  const params = new URLSearchParams({
    key: elms.APIKEY,
    q: elms.input.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });
  
  try {
    
    const responce = await axios.get(`${elms.BASIC_URL}?${params}`);
    console.log(responce);
    console.log(responce.data.hits);
    console.log(page);
    // console.log(responce.status);
    createMarkUp(responce.data.hits);
    lightbox.refresh();
    if (responce.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    // if (responce.status === 400) {
    //  throw new Error("error")
    // }
    
  } catch (error) {
    elms.loadMoreBtn.classList.replace('load-more', 'load-more-hiden')
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
    

    console.error(error);
  }
}


