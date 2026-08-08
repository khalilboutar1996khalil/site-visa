  var WHATSAPP_NUMBER = '21653117158';

  var animatedSections = [
    document.querySelector('.hero'),
    document.querySelector('.service-grid'),
    document.querySelector('.consultation'),
    document.querySelector('.reason-grid'),
    document.querySelector('.stamps')
  ].filter(Boolean);

  if (animatedSections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    animatedSections.forEach(function(section){
      observer.observe(section);
    });
  } else {
    animatedSections.forEach(function(section){
      section.classList.add('in-view');
    });
  }

  // Theme toggle
  document.addEventListener('DOMContentLoaded', function() {
    var themeToggle = document.getElementById('themeToggle');
    var savedTheme = localStorage.getItem('docvisa-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
      document.body.setAttribute('data-theme', theme);
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        var icon = themeToggle.querySelector('.theme-toggle-icon');
        var label = themeToggle.querySelector('.theme-toggle-label');
        if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        if (label) label.textContent = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
        if (theme === 'dark') {
          themeToggle.setAttribute('aria-label', 'Basculer vers le thème clair');
        } else {
          themeToggle.setAttribute('aria-label', 'Basculer vers le thème sombre');
        }
      }
    }

    applyTheme(initialTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        var currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('docvisa-theme', nextTheme);
      });
    }
  });

  // Navigation: burger menu + lien actif au défilement
  var siteNav = document.getElementById('siteNav');
  var navBurger = document.getElementById('navBurger');

  function closeNav() {
    if (!siteNav || !navBurger) return;
    siteNav.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
    navBurger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  if (navBurger && siteNav) {
    navBurger.addEventListener('click', function(){
      var isOpen = siteNav.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', String(isOpen));
      navBurger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    // Le menu mobile se referme dès qu'on choisit une destination
    siteNav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('click', function(e){
      if (!siteNav.contains(e.target) && !navBurger.contains(e.target)) closeNav();
    });
  }

  var navLinks = siteNav ? Array.prototype.slice.call(siteNav.querySelectorAll('a[href^="#"]')) : [];
  var navTargets = navLinks.map(function(link){
    return { link: link, section: document.querySelector(link.getAttribute('href')) };
  }).filter(function(item){ return item.section; });

  if (navTargets.length) {
    var navTicking = false;
    var syncActiveLink = function(){
      navTicking = false;
      // On considère « courante » la dernière section dont le haut est passé sous l'entête
      var probe = window.scrollY + 140;
      var current = null;
      navTargets.forEach(function(item){
        if (item.section.offsetTop <= probe) current = item;
      });
      // En bas de page, la dernière section reste active même si son haut est plus haut
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = navTargets[navTargets.length - 1];
      }
      navTargets.forEach(function(item){
        item.link.classList.toggle('active', item === current);
        if (item === current) {
          item.link.setAttribute('aria-current', 'true');
        } else {
          item.link.removeAttribute('aria-current');
        }
      });
    };
    window.addEventListener('scroll', function(){
      if (!navTicking) {
        navTicking = true;
        window.requestAnimationFrame(syncActiveLink);
      }
    }, { passive: true });
    window.addEventListener('resize', syncActiveLink, { passive: true });
    syncActiveLink();
  }

  // Video popup modal
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  var openBtn = document.getElementById('openVideoModal');
  var closeBtn = document.getElementById('closeVideoModal');
  var lastFocusedBeforeModal = null;

  function openModal(){
    if (!modal || !modalVideo) return;
    lastFocusedBeforeModal = document.activeElement;
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
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(){
    if (!modal || !modalVideo) return;
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modalVideo.pause();
    document.body.style.overflow = '';
    // On rend le clavier au bouton qui a ouvert la vidéo
    if (lastFocusedBeforeModal && lastFocusedBeforeModal.focus) lastFocusedBeforeModal.focus();
    lastFocusedBeforeModal = null;
  }
  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e){
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      closeModal();
      closeNav();
    }
    // Tant que la vidéo est ouverte, la tabulation reste dans la fenêtre
    if (e.key === 'Tab' && modal && modal.classList.contains('open')) {
      var focusables = modal.querySelectorAll('button, video[controls], [href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Consultation form simulator & WhatsApp submit
  var consultationForm = document.getElementById('consultationForm');
  var simDestination = document.getElementById('simDestination');
  var simVisaType = document.getElementById('simVisaType');
  var simProfile = document.getElementById('simProfile');
  var simRefusal = document.getElementById('simRefusal');
  var simulatorResult = document.getElementById('simulatorResult');
  var resultPrice = document.getElementById('resultPrice');
  var resultDelay = document.getElementById('resultDelay');
  var resultCount = document.getElementById('resultCount');
  var resultNote = document.getElementById('resultNote');
  var resultDocs = document.getElementById('resultDocs');
  var docProgress = document.getElementById('docProgress');
  var copyDocsBtn = document.getElementById('copyDocsBtn');
  var printDocsBtn = document.getElementById('printDocsBtn');
  var simProgressFill = document.getElementById('simProgressFill');
  var simProgressText = document.getElementById('simProgressText');
  var simProgress = document.getElementById('simProgress');
  var formFoot = document.getElementById('formFoot');
  var formFootDefault = formFoot ? formFoot.innerHTML : '';

  var docDatabase = {
    profiles: {
      salarie: [
        "Attestation de travail récente (originale signée)",
        "3 dernières fiches de paie originales",
        "Historique de carrière CNSS récent (Extrait de situation)",
        "Titre de congé signé (si voyage de tourisme)"
      ],
      gerant: [
        "Copie conforme du Registre National des Entreprises (RNE)",
        "Statuts originaux de la société",
        "Déclaration d'impôts récente de la société (Patente)",
        "Relevés bancaires de la société des 3 derniers mois"
      ],
      liberale: [
        "Attestation d'inscription récente à l'Ordre professionnel",
        "Copie de la carte professionnelle",
        "Déclaration unique des revenus (Patente personnelle)",
        "3 derniers relevés de compte bancaire professionnel"
      ],
      etudiant: [
        "Certificat d'inscription récent ou carte d'étudiant",
        "Derniers relevés de notes et diplômes obtenus",
        "Engagement de prise en charge financière légalisé par le garant",
        "Justificatifs professionnels et relevés bancaires du garant (3 mois)"
      ],
      autre: [
        "Justificatifs de ressources personnelles (retraite, titres de propriété...)",
        "Engagement financier légalisé rédigé par un garant de votre famille",
        "Justificatifs professionnels et relevés bancaires du garant (3 mois)"
      ]
    },
    types: {
      tourisme: [
        "Réservation d'hôtel confirmée ou Attestation d'hébergement officielle",
        "Réservation de billet d'avion aller-retour temporaire",
        "Itinéraire de voyage détaillé (recommandé)"
      ],
      etudes: [
        "Attestation d'admission officielle de l'établissement d'accueil",
        "Justificatif d'hébergement pour les 3 premiers mois (bail, résidence...)",
        "Justificatif de ressources financières suffisantes (compte bloqué, bourse...)"
      ],
      travail: [
        "Lettre d'invitation officielle de l'entreprise partenaire",
        "Ordre de mission signé par l'employeur en Tunisie",
        "Contrat de travail visé par les autorités compétentes (si applicable)"
      ],
      regroupement: [
        "Documents d'état civil prouvant le lien (Livret de famille, Acte de mariage)",
        "Justificatif de logement du conjoint accueillant dans le pays d'accueil",
        "Preuves de ressources stables et régulières du conjoint accueillant"
      ]
    }
  };

  // Précisions propres à chaque destination, affichées au-dessus de la liste
  var destinationNotes = {
    France: "Dépôt via un centre agréé (TLScontact / VFS). Prévoyez que tous les documents en arabe soient traduits en français par un traducteur assermenté.",
    Italie: "Le consulat italien est particulièrement attentif à l'itinéraire et aux réservations : elles doivent être cohérentes entre elles, dates comprises.",
    Espagne: "Les justificatifs de ressources sont examinés de près. Comptez un montant disponible correspondant à la durée complète du séjour.",
    Malte: "Le nombre de rendez-vous disponibles est limité ; mieux vaut préparer le dossier avant même d'avoir votre créneau.",
    Canada: "La demande se dépose en ligne sur le portail IRCC : tout est numérisé, et les données biométriques sont à fournir séparément après le dépôt."
  };

  var refusalNote = "Vous nous avez signalé un refus antérieur : apportez la lettre de refus lors de notre échange. Son motif exact détermine la façon de reconstruire le dossier.";

  var currentDocs = [];

  function updateProgressBar() {
    if (!simProgressFill || !simProgressText) return;
    var answered = 0;
    if (simDestination && simDestination.value) answered++;
    if (simVisaType && simVisaType.value) answered++;
    if (simProfile && simProfile.value) answered++;

    simProgressFill.style.width = (answered / 3 * 100) + '%';

    var messages = [
      '0 réponse sur 3 — commencez par la destination',
      '1 réponse sur 3 — plus que deux questions',
      '2 réponses sur 3 — dernière question',
      '✓ Votre estimation est prête, elle s\'affiche ci-dessous'
    ];
    simProgressText.textContent = messages[answered];
    if (simProgress) simProgress.classList.toggle('complete', answered === 3);
  }

  function updateDocProgress() {
    if (!docProgress || !resultDocs) return;
    var boxes = resultDocs.querySelectorAll('input[type="checkbox"]');
    var checked = resultDocs.querySelectorAll('input[type="checkbox"]:checked');
    docProgress.textContent = checked.length + ' / ' + boxes.length;
  }

  function renderDocs(docs) {
    if (!resultDocs) return;
    resultDocs.innerHTML = '';
    docs.forEach(function(doc, i) {
      var li = document.createElement('li');
      var label = document.createElement('label');
      label.className = 'doc-check';

      var box = document.createElement('input');
      box.type = 'checkbox';
      box.id = 'doc-' + i;
      box.addEventListener('change', function(){
        label.classList.toggle('done', box.checked);
        updateDocProgress();
      });

      var text = document.createElement('span');
      text.textContent = doc;

      label.appendChild(box);
      label.appendChild(text);
      li.appendChild(label);
      resultDocs.appendChild(li);
    });
    updateDocProgress();
  }

  function updateSimulator() {
    updateProgressBar();

    var dest = simDestination ? simDestination.value : '';
    var type = simVisaType ? simVisaType.value : '';
    var prof = simProfile ? simProfile.value : '';
    var refusal = simRefusal ? simRefusal.value : '';

    if (dest && type && prof) {
      // Calculate Price
      var price = "80 TND";
      var delay = "24h à 48h";

      if (type === 'etudes' || type === 'travail') {
        price = (dest === 'Canada') ? "150 TND" : "120 TND";
      } else if (type === 'regroupement') {
        price = "180 TND";
        delay = "48h à 72h";
      } else { // tourisme
        price = (dest === 'Canada') ? "100 TND" : "80 TND";
      }

      if (dest === 'Canada') {
        delay = "48h à 72h"; // Canada requires portal upload, longer processing
      }

      // Display Price and Delay
      if (resultPrice) resultPrice.textContent = price;
      if (resultDelay) resultDelay.textContent = delay;

      // Note contextuelle : spécificités du pays, puis rappel si refus antérieur
      if (resultNote) {
        var notes = [];
        if (destinationNotes[dest]) notes.push('ℹ️ ' + destinationNotes[dest]);
        if (refusal === 'oui-meme-pays' || refusal === 'oui-autre-pays') notes.push('⚠️ ' + refusalNote);
        if (notes.length) {
          resultNote.innerHTML = notes.map(function(n){ return '<div>' + n + '</div>'; }).join('');
          resultNote.hidden = false;
        } else {
          resultNote.hidden = true;
        }
      }

      // Populate documents
      var baseDocs = [
        "Passeport en cours de validité (minimum 6 mois) + copies",
        "Formulaire de demande officiel complété et signé",
        "Photos d'identité récentes aux normes consulaires",
        "Assurance voyage couvrant toute la durée du séjour"
      ];

      var profileDocs = docDatabase.profiles[prof] || [];
      var typeDocs = docDatabase.types[type] || [];

      currentDocs = [].concat(baseDocs, profileDocs, typeDocs);
      renderDocs(currentDocs);

      if (resultCount) resultCount.textContent = currentDocs.length + ' pièces';

      // Show simulator block with animation
      if (simulatorResult) {
        var wasHidden = !simulatorResult.classList.contains('show');
        simulatorResult.style.display = 'block';
        // Trigger reflow to let CSS transition work
        simulatorResult.offsetHeight;
        simulatorResult.classList.add('show');
        // À la première apparition, on amène le résultat dans le champ de vision
        if (wasHidden) {
          setTimeout(function(){
            simulatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 120);
        }
      }
    } else {
      currentDocs = [];
      if (simulatorResult) {
        simulatorResult.classList.remove('show');
        // Delay display none to let transition finish
        setTimeout(function() {
          if (!simulatorResult.classList.contains('show')) {
            simulatorResult.style.display = 'none';
          }
        }, 400);
      }
    }
  }

  if (simDestination) simDestination.addEventListener('change', updateSimulator);
  if (simVisaType) simVisaType.addEventListener('change', updateSimulator);
  if (simProfile) simProfile.addEventListener('change', updateSimulator);
  if (simRefusal) simRefusal.addEventListener('change', updateSimulator);
  updateProgressBar();

  // Copier la liste des documents
  function flashButton(btn, message) {
    var original = btn.textContent;
    btn.textContent = message;
    btn.classList.add('done');
    setTimeout(function(){
      btn.textContent = original;
      btn.classList.remove('done');
    }, 2200);
  }

  if (copyDocsBtn) {
    copyDocsBtn.addEventListener('click', function(){
      if (!currentDocs.length) return;
      var header = 'Documents à préparer — DocVisa Tunisie';
      if (simDestination && simDestination.value) {
        header += ' (' + simDestination.value + ')';
      }
      var text = header + '\n\n' + currentDocs.map(function(d, i){
        return (i + 1) + '. ' + d;
      }).join('\n');

      var done = function(){ flashButton(copyDocsBtn, '✓ Liste copiée'); };
      var failed = function(){ flashButton(copyDocsBtn, '✕ Copie impossible'); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function(){ legacyCopy(text, done, failed); });
      } else {
        legacyCopy(text, done, failed);
      }
    });
  }

  // Repli pour les navigateurs sans presse-papier asynchrone (ou hors HTTPS)
  function legacyCopy(text, onSuccess, onFailure) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    if (ok) { onSuccess(); } else { onFailure(); }
  }

  if (printDocsBtn) {
    printDocsBtn.addEventListener('click', function(){
      window.print();
    });
  }

  // Connect stamps to simulator
  var stamps = document.querySelectorAll('.stamps .stamp');
  stamps.forEach(function(stamp) {
    stamp.setAttribute('role', 'button');
    stamp.setAttribute('tabindex', '0');

    var country = '';
    if (stamp.classList.contains('fr')) country = 'France';
    else if (stamp.classList.contains('it')) country = 'Italie';
    else if (stamp.classList.contains('es')) country = 'Espagne';
    else if (stamp.classList.contains('mt')) country = 'Malte';
    else if (stamp.classList.contains('ca')) country = 'Canada';

    if (country) {
      stamp.setAttribute('aria-label', 'Simuler un dossier pour ' + country);
    }

    function selectCountry() {
      if (!country || !simDestination) return;
      simDestination.value = country;
      stamps.forEach(function(s){ s.classList.toggle('is-selected', s === stamp); });
      updateSimulator();
      var consultationSection = document.getElementById('consultation');
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function() {
          // On place le curseur sur la question suivante, pas sur celle déjà remplie
          var next = (simVisaType && !simVisaType.value) ? simVisaType : simDestination;
          next.focus();
        }, 800);
      }
    }

    stamp.addEventListener('click', selectCountry);
    stamp.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCountry();
      }
    });
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e){
      e.preventDefault();
      var nameInput = consultationForm.querySelector('input[name="name"]');
      var name = nameInput ? nameInput.value.trim() : '';
      var dest = simDestination ? simDestination.value : '';
      var typeText = simVisaType ? simVisaType.options[simVisaType.selectedIndex].text : '';
      var profileText = simProfile ? simProfile.options[simProfile.selectedIndex].text : '';
      var refusalValue = simRefusal ? simRefusal.value : '';
      var refusalText = refusalValue && simRefusal ? simRefusal.options[simRefusal.selectedIndex].text : '';
      var messageInput = document.getElementById('simMessage');
      var message = messageInput ? messageInput.value.trim() : '';

      var priceText = resultPrice ? resultPrice.textContent : '';
      var delayText = resultDelay ? resultDelay.textContent : '';

      var text = 'Bonjour DocVisa Tunisie, je souhaite un accompagnement pour mon dossier visa.\n\n';
      text += '👤 Nom : ' + (name || 'Non renseigné') + '\n';
      text += '🌍 Destination : ' + dest + '\n';
      text += '📄 Type de visa : ' + typeText + '\n';
      text += '💼 Profil : ' + profileText + '\n';

      if (refusalText) {
        text += '🔁 Refus antérieur : ' + refusalText + '\n';
      }

      if (priceText && priceText !== '—') {
        text += '💰 Tarif estimé : ' + priceText + ' (Délai : ' + delayText + ')\n';
      }

      // On transmet ce qui reste à réunir : c'est le point de départ de l'échange
      if (currentDocs.length && resultDocs) {
        var boxes = Array.prototype.slice.call(resultDocs.querySelectorAll('input[type="checkbox"]'));
        var missing = currentDocs.filter(function(doc, i){
          return boxes[i] && !boxes[i].checked;
        });
        var ready = currentDocs.length - missing.length;
        text += '\n📋 Documents : ' + ready + ' sur ' + currentDocs.length + ' déjà en ma possession\n';
        if (missing.length) {
          text += 'Il me manque encore :\n';
          missing.forEach(function(doc){
            text += '• ' + doc + '\n';
          });
        }
      }

      if (message) {
        text += '\n💬 Précisions : ' + message + '\n';
      }

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      var opened = window.open(url, '_blank', 'noopener');

      if (formFoot) {
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          // Fenêtre bloquée par le navigateur : on donne un lien à cliquer soi-même
          formFoot.classList.add('error');
          formFoot.innerHTML = 'Votre navigateur a bloqué l\'ouverture de WhatsApp. ' +
            '<a href="' + url + '" target="_blank" rel="noopener">Cliquez ici pour ouvrir la conversation</a>.';
        } else {
          formFoot.classList.remove('error');
          formFoot.innerHTML = '✓ WhatsApp s\'ouvre dans un nouvel onglet avec votre récapitulatif. Relisez-le, puis envoyez.';
          setTimeout(function(){
            formFoot.innerHTML = formFootDefault;
          }, 8000);
        }
      }
    });
  }
