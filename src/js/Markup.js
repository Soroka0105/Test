
export function createMarkUp(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a class="gallery_link" href="${largeImageURL}">
        <div class="photo-card">
        
  <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" width="400px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
  
</div>
</a>`;
      }
    )
    .join('');
  elms.gallery.insertAdjacentHTML("beforeend", markup);
}

export const elms = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more-hiden'),
  input: document.querySelector('input'),
  APIKEY: '39342845-b067dc268014f57340e74d554',
  BASIC_URL: 'https://pixabay.com/api/',
};

