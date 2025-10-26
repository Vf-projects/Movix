document.addEventListener('DOMContentLoaded', () => {
  const images = [
    { src: './images/john-wick poster.svg', title: 'John Wick: Parabellum', link: 'https://www.lionsgate.com/movies/john-wick-chapter-3-parabellum' },
    { src: './images/image 2.jpg', title: 'The Matrix Reloaded', link: 'https://www.warnerbros.com/movies/matrix-reloaded' },
    { src: './images/image 3.jpg', title: 'Interstellar', link: 'https://www.interstellarmovie.net/' },
    { src: './images/image 4.jpg', title: 'Dune: Part One', link: 'https://www.dunemovie.com/' },
    { src: './images/image 5.jpg', title: 'Oppenheimer', link: 'https://www.oppenheimermovie.com/' },
    { src: './images/image 6.jpg', title: 'The Batman', link: 'https://www.thebatman.com/' },
    { src: './images/image 7.jpg', title: 'Top Gun: Maverick', link: 'https://www.topgunmovie.com/' },
    { src: './images/image 8.jpg', title: 'Spider-Man: Across the Spider-Verse', link: 'https://www.acrossthespiderverse.movie/' },
    { src: './images/image 10.jpg', title: 'Black Panther: Wakanda Forever', link: 'https://www.marvel.com/movies/black-panther-wakanda-forever' },
    { src: './images/image 11.jpg', title: 'Mission Impossible: Fallout', link: 'https://www.missionimpossible.com/' },
    { src: './images/image 12.jpg', title: 'Tenet', link: 'https://www.warnerbros.com/movies/tenet' }
  ];

  const hero = document.getElementById('hero');
  const caption = document.querySelector('.caption');
  const leftBtn = document.querySelector('.side.left');
  const rightBtn = document.querySelector('.side.right');
  const dotsContainer = document.getElementById('dots');
  const visit = document.getElementById('visit');
  const theme = document.getElementById('theme');
  const section = document.querySelector('.body');

  let currentIndex = 0;
  let interval;

  // === Create navigation dots ===
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === currentIndex) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('span');

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function updateHero(index) {
    const img = new Image();
    img.src = images[index].src;

    visit.innerHTML = '';
    const btn = document.createElement('a');
    btn.innerText = 'Visit Site';
    btn.id = 'btn';
    btn.href = images[index].link;
    btn.target = '_blank';
    visit.appendChild(btn);

    hero.style.opacity = '0.9';
    img.onload = () => {
      setTimeout(() => {
        hero.style.backgroundImage = `url('${img.src}')`;
        caption.textContent = images[index].title;
        hero.style.opacity = '1';
        updateDots(index);
      }, 300);
    };
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateHero(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateHero(currentIndex);
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // === Button Navigation ===
  rightBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  leftBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // === Dot Navigation ===
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateHero(currentIndex);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // === Swipe Support ===
  let touchStartX = 0;
  let touchEndX = 0;

  hero.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  hero.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (delta > 50) prevSlide();
    else if (delta < -50) nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // === Hover Pause ===
  hero.addEventListener('mouseenter', stopAutoSlide);
  hero.addEventListener('mouseleave', startAutoSlide);

  // === Theme Mode ===
  function setTheme(mode) {
    if (mode === 'dark') {
      document.body.style.backgroundColor = 'rgb(1, 9, 20)';
      document.body.style.color = 'white';
      section.style.backgroundColor = '#021127';
      theme.innerText = 'LIGHT MODE';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = 'black';
      section.style.backgroundColor = 'rgb(199, 197, 197)';
      theme.innerText = 'DARK MODE';
      localStorage.setItem('theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  theme.addEventListener('click', () => {
    const current = localStorage.getItem('theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // === Horizontal Sliders ===
  const sliders = document.querySelectorAll('.level-1');
  const leftArrows = document.querySelectorAll('.arrow.left');
  const rightArrows = document.querySelectorAll('.arrow.right');

  sliders.forEach((slider, index) => {
    const left = leftArrows[index];
    const right = rightArrows[index];
    let scrollInterval;
    let direction = 1;

    function startAutoScroll() {
      scrollInterval = setInterval(() => {
        slider.scrollLeft += 300 * direction;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) direction = -1;
        if (slider.scrollLeft <= 0) direction = 1;
      }, 3000);
    }

    function stopAutoScroll() {
      clearInterval(scrollInterval);
    }

    startAutoScroll();

    if (left && right) {
      left.addEventListener('click', () => {
        slider.scrollLeft -= 300;
        direction = -1;
      });

      right.addEventListener('click', () => {
        slider.scrollLeft += 300;
        direction = 1;
      });
    }

    const images = slider.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('mouseover', stopAutoScroll);
      img.addEventListener('mouseout', startAutoScroll);
    });

    // Swipe Support for Sliders
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
      const distance = endX - startX;
      if (distance > 50) slider.scrollLeft -= 300;
      else if (distance < -50) slider.scrollLeft += 300;
    });
  });

  // === Initial Load ===
  updateHero(currentIndex);
  startAutoSlide();
});
