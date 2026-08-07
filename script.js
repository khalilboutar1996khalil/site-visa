  var stampsEl = document.querySelector('.stamps');
  if (stampsEl && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    io.observe(stampsEl);
  } else if (stampsEl) {
    stampsEl.classList.add('in-view');
  }

  // Video popup modal
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  var openBtn = document.getElementById('openVideoModal');
  var closeBtn = document.getElementById('closeVideoModal');

  function openModal(){
    modal.classList.add('open');
    modalVideo.muted = false;
    modalVideo.volume = 1;
    try { modalVideo.currentTime = 0; } catch(e){}
    var p = modalVideo.play();
    if (p && p.catch) {
      p.catch(function(){
        // Browser blocked unmuted autoplay: retry muted, then let the person unmute via controls
        modalVideo.muted = true;
        modalVideo.play().catch(function(){});
      });
    }
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.classList.remove('open');
    modalVideo.pause();
    document.body.style.overflow = '';
  }
  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e){
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeModal();
  });
