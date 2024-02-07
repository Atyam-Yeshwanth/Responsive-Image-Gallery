const imageData = [
  {url: 'v3.jpg', description: 'Mickey Mouse.' },
  { url: 'dora.jpg', description: 'Dora Bujji' },
  { url: 'dore.png', description: 'Doraemon' },
  { url: 'minion.jpg', description: 'Minion' },
  { url: 'shin.jpg', description: 'Shinchan' },
  { url: 'oggy.jpg', description: 'oggy' },
  { url: 'kick.jpg', description: 'Kick Buttoski' },
  { url: 'chota.jpg', description: 'Chota Bheem,' },
  { url: 'tom.jpg', description: 'Tom' },
  { url: 'jerry.jpg', description: 'Jerry' },
  { url: 'ben10.jpg', description: 'Ben10' },
  { url: 'kidvs.jpg', description: 'Cook Kidvs Kat' },
  { url: 'phineas ferb.jpg', description: 'phineas ferb' },
  { url: 'pika.jpeg', description: 'Pikachu' },
  { url: 'sponge.jpg', description: 'Sponge' },
  { url: 'nemo.jpg', description: 'nemo' },
  { url: 'power.jpg', description: 'Power Rangers' },
  { url: 'rollno.jpg', description: 'Krishna Rollno 21'},
  { url: 'bean.jpg', description: 'Bean' },
  { url: 'motu.jpg', description: 'Motu' },
  { url: 'patlu.jpg', description: 'Patlu' },
  { url: 'batman.jpg', description: 'Batman' },
  { url: 'bean.jpg', description: 'Mr.Bean' },
  { url: 'Dan Patrick.jpg', description: 'Dan Patrick' },
  { url: 'duck.jpg', description: 'Duck' },
  { url: 'Heidi.gif', description: 'Heidi' },
  { url: 'kitty.jpg', description: 'Kitty' },
  { url: 'lightyear.jpg', description: 'lightyear' },
  { url: 'Snoopy Wallpaper.jpg', description: 'Snoppy' },
  { url: 'woody.jpg', description: 'Woody' },
  
];

let currentIndex = 0;
let searchedData = [];

const gallery = document.getElementById('gallery');

function populateGallery(data) {
  data.forEach((item, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = item.url;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.classList.add('thumbnail');
    thumbnail.onclick = () => openLightbox(index, data);
    gallery.appendChild(thumbnail);
  });
}

populateGallery(imageData);

function openLightbox(index, data) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  currentIndex = index;
  lightboxImage.src = data[index].url;
  lightboxCaption.textContent = data[index].description;
  lightbox.style.display = 'flex';

  lightbox.onclick = () => closeLightbox();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

function changeImage(step, data) {
  if (data === searchedData) {
    
    currentIndex += step;

    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    } else if (currentIndex >= data.length) {
      currentIndex = 0;
    }
  } else {
    
    currentIndex = (currentIndex + step) % data.length;
    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    }
  }

  openLightbox(currentIndex, data);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    changeImage(-1, searchedData.length > 0 ? searchedData : imageData);
  } else if (event.key === 'ArrowRight') {
    changeImage(1, searchedData.length > 0 ? searchedData : imageData);
  }
});

const searchBar = document.getElementById('search-bar');

function filterImages(searchTerm) {
  searchedData = imageData.filter(data =>
    data.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  gallery.innerHTML = '';
  populateGallery(searchedData);
}

searchBar.addEventListener('input', () => filterImages(searchBar.value));
