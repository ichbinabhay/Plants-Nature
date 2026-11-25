/**
 * Plants and Nature - Classroom Presentation Engine
 * Features:
 * - 16-slide widescreen presentation with smooth projector transitions
 * - Dynamic continuous falling leaves screen (auto-disabled on Slide 1)
 * - Interactive Planet Earth: With Plants vs Without Plants comparison
 * - Real mountain video player with play/pause center overlay & fallback
 * - Mystery Plant Activity (Banyan, Neem, Hibiscus, Tulsi, Peepal, Snake Plant, Custom/Mint)
 * - Procedural Web Audio API soundscape integration with auto-ducking
 * - Full 7-8 minute speaking scripts in Presenter Notes
 */

// Presenter Notes Database with warm, emotional speaking scripts & classroom cues
const PRESENTER_SCRIPTS = {
  1: {
    title: "Opening: A Bare Earth (Dry Landscapes)",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[SMILE, SWEEP HAND TOWARD SCREEN WITH GENTLE CURIOSITY]</div>
      <div class="speaking-script-box">
        “Good morning everyone! Take a look at these three pictures on the screen.
        <br><br>
        First, towering golden sand dunes baking under the blazing desert sun. 
        Second, stark mineral badlands with jagged, sun-bleached stone ridges. 
        And third, dry, cracked clay ground that hasn't tasted rain in months.
        <br><br>
        Aren't these beautiful?
        <br><br>
        They are dramatic, vast, almost like photographs from Mars. But look closely at all three... What is missing?”
      </div>
      <div class="stage-direction-cue">[PAUSE 3-4 SECONDS FOR AUDIENCE GUESSES, THEN CLICK 'REVEAL ANSWER']</div>
      <div class="speaking-script-box">
        “Water? Animals? People? Yes! But underneath all of those is the one thing that turns dry, lifeless rock into a living home: <strong>Plants</strong>.
        <br><br>
        Without plants, Earth is just a dry, silent stone in space. Today, let’s discover why plants and nature are the living heartbeat of our entire world!”
      </div>
    `
  },
  2: {
    title: "Why Plants Matter: The Living Pillars",
    timing: "⏱ Recommended Time: 50 seconds",
    script: `
      <div class="stage-direction-cue">[INVITE AUDIENCE INTERACTION]</div>
      <div class="speaking-script-box">
        “Let's do a quick experiment together. Everyone, take a deep breath in... and let it out.
        <br><br>
        Where did that oxygen come from? Right now, billions of trees and plants are quietly converting sunlight, breathing in carbon dioxide and exhaling over 100 billion tons of clean oxygen every year.
        <br><br>
        Now think about your breakfast or lunch today. Every single calorie—from farm fruits and grains to food eaten by animals—begins with a plant.
        <br><br>
        Underground, plant roots weave living nets that stop soil from washing away in landslides. And above us, forests breathe water vapor into the sky to create the clouds that bring rain.”
      </div>
    `
  },
  3: {
    title: "Interactive Comparison: Earth With vs. Without Plants",
    timing: "⏱ Recommended Time: 55 seconds",
    script: `
      <div class="stage-direction-cue">[USE THE ON-SCREEN TOGGLE BUTTONS TO FLIP BETWEEN BOTH WORLDS]</div>
      <div class="speaking-script-box">
        “To truly understand what plants do, look at this comparison between our living Earth today, and an Earth stripped of plant life.
        <br><br>
        <em>[Click 'Earth Without Plants']</em>
        <br>
        Without plants, oxygen is depleted in years. Carbon dioxide suffocates the sky. Rain stops falling inland because there are no trees transpiring moisture into clouds. And without root networks, fertile topsoil blows away in worldwide dust storms, leaving nothing but bare rock.
        <br><br>
        <em>[Click 'Earth With Plants']</em>
        <br>
        Plants aren't just green decorations. They are the active life-support system that keeps Earth from becoming an uninhabitable desert like Mars.”
      </div>
    `
  },
  4: {
    title: "A Fictional Warning: The Story of WALL-E",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[WARM, RELATABLE TONE - CONNECT TO POPULAR CULTURE]</div>
      <div class="speaking-script-box">
        “Many of you have seen the Pixar movie <em>WALL-E</em>. 
        <br><br>
        In that movie, humans had to evacuate Earth because it turned into an endless landfill of trash, dust, and toxic haze. For seven hundred years, not a single leaf sprouted.
        <br><br>
        Now, this is science fiction—it’s not a prediction, but a thoughtful warning.
        <br><br>
        Remember the turning point? The robot finds one solitary green seedling inside an old discarded shoe. That fragile shoot wasn't just a plant—it was proof that life could return, and it inspired humanity to come home and care for their world.”
      </div>
    `
  },
  5: {
    title: "Mystery Plant Challenge: Activity Briefing",
    timing: "⏱ Recommended Time: 35 seconds",
    script: `
      <div class="stage-direction-cue">[HOLD UP MYSTERY POUCHES & ENGAGE THE CLASSROOM]</div>
      <div class="speaking-script-box">
        “Now for our hands-on mystery activity! I've passed around mystery pouches containing leaves, stems, or petals from plants around us.
        <br><br>
        For each round, use three senses:
        <br>
        1. <strong>Touch:</strong> Is it thick, leathery, waxy, or paper-thin?
        <br>
        2. <strong>Smell:</strong> Gently crush an edge. Is it spicy, bitter, minty, or sweet?
        <br>
        3. <strong>Sight:</strong> Notice the veins and leaf edges.
        <br><br>
        Let's open Pouch Number 1!”
      </div>
    `
  },
  6: {
    title: "Mystery Plant #1: Banyan Tree",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[READ CLUE WITH EXCITEMENT, PAUSE FOR GUESSES]</div>
      <div class="speaking-script-box">
        “Here is your clue for Pouch #1:
        <em>‘I am a massive tree whose branches send down woody prop roots that reach the earth, allowing a single tree to expand into what looks like an entire forest.’</em>
        <br><br>
        Who has a guess? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s the mighty <strong>Banyan Tree</strong>! National tree of India, cherished for cooling village shade. The Great Banyan in Kolkata covers 3.5 acres with 3,700 roots—an entire grove that is actually just one single tree!”
      </div>
    `
  },
  7: {
    title: "Mystery Plant #2: Neem Tree",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[INVITE THEM TO SMELL POUCH #2]</div>
      <div class="speaking-script-box">
        “Open Pouch #2 and take a sniff.
        <br>
        <em>‘I have slender curved leaflets with jagged saw-tooth edges. I have an unmistakably sharp, bitter aroma, and garden pests refuse to touch me.’</em>
        <br><br>
        Any guesses? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s the <strong>Neem Tree</strong>! Known as the 'Village Pharmacy.' Traditionally used for oral hygiene and eco-friendly crop protection. Surprising fact: Desert locust swarms that devour entire fields refuse to touch neem leaves because of a natural compound called <em>azadirachtin</em>!”
      </div>
    `
  },
  8: {
    title: "Mystery Plant #3: Hibiscus",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[SHOW PETAL FRAGMENTS FROM POUCH #3]</div>
      <div class="speaking-script-box">
        “Look into Pouch #3:
        <br>
        <em>‘I bloom with large trumpet-shaped ruby petals and a long, golden pollen-covered tube reaching out from my center.’</em>
        <br><br>
        Guesses? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s the vivid <strong>Hibiscus</strong>! Brewed into tart ruby Agua de Jamaica herbal tea packed with vitamin C, and used for hair conditioning. Fun fact: In Polynesian tradition, wearing it behind your left ear means you are taken; behind your right ear means you are single!”
      </div>
    `
  },
  9: {
    title: "Mystery Plant #4: Tulsi (Holy Basil)",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[INVITE A GENTLE INHALE OF POUCH #4]</div>
      <div class="speaking-script-box">
        “Crush the leaf in Pouch #4 gently:
        <br>
        <em>‘I am a compact leafy plant with purple-tinted stems and a warm, peppery clove fragrance that fills home courtyards each morning.’</em>
        <br><br>
        Guesses? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s <strong>Tulsi</strong>, Holy Basil! Brewed as a warm herbal infusion for comfort on cold days. Surprising fact: Its aromatic essential oils naturally repel mosquitoes, and it releases oxygen for up to 20 hours a day!”
      </div>
    `
  },
  10: {
    title: "Mystery Plant #5: Peepal Tree (Sacred Fig)",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[NOTICE THE ELONGATED LEAF TIP IN POUCH #5]</div>
      <div class="speaking-script-box">
        “Look closely at the leaf tip in Pouch #5:
        <br>
        <em>‘My heart-shaped leaves have an elegant, slender elongated drip tip that flutters in the slightest breeze. I am celebrated for releasing oxygen day and night.’</em>
        <br><br>
        Who recognizes this leaf? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s the <strong>Peepal Tree</strong>, also known as the Bodhi Tree! Historically revered as a place of meditation. Surprising scientific fact: Peepal uses CAM photosynthesis, absorbing carbon dioxide and releasing oxygen around the clock, even throughout the night!”
      </div>
    `
  },
  11: {
    title: "Mystery Plant #6: Snake Plant (Sansevieria)",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[HOLD UP SWORD-SHAPED STRIPED LEAF IN POUCH #6]</div>
      <div class="speaking-script-box">
        “Look closely at the leaf in Pouch #6:
        <br>
        <em>‘I have stiff, upright sword-shaped leaves with golden-yellow margins and green tiger-stripe patterns. I am famous for releasing oxygen and purifying indoor air while you sleep.’</em>
        <br><br>
        Who has a guess for this popular plant? <em>[Wait, then click Reveal]</em>
        <br><br>
        It’s the <strong>Snake Plant</strong>, also called Mother-in-Law's Tongue (<em>Dracaena trifasciata</em>)!
        <br><br>
        It is one of the most resilient indoor plants in the world, famously documented by NASA clean air studies for absorbing indoor airborne toxins like formaldehyde.
        <br><br>
        Surprising scientific fact: Unlike typical houseplants that produce oxygen only during the day, the Snake Plant uses Crassulacean Acid Metabolism (CAM) to open its pores and release fresh oxygen at night, making it the ideal bedroom plant!”
      </div>
    `
  },
  12: {
    title: "Mystery Plant #7: Customizable Plant (Mint / Pudina)",
    timing: "⏱ Recommended Time: 35 seconds",
    script: `
      <div class="stage-direction-cue">[SHOWCASE MINT OR CUSTOM PLANT IN POUCH #7]</div>
      <div class="speaking-script-box">
        “Here is Pouch #7! As an example, we have <strong>Mint (Pudina)</strong>, the beloved aromatic herb.
        <br><br>
        Surprising fact: Mint contains natural menthol, which triggers the cold-sensing receptors in our nerves, tricking the brain into feeling cool even on a warm day!
        <br><br>
        <em>(Note to presenter: You can click the 'Edit / Add Plant' button above anytime to change this slide to Rose, Jasmine, or any local plant you brought to class!)</em>”
      </div>
    `
  },
  13: {
    title: "Beyond the Leaf: The Majesty of Mountains",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[CLICK PLAY ON REAL MOUNTAIN VIDEO, LOWER VOICE RESPECTFULLY]</div>
      <div class="speaking-script-box">
        “We've held single leaves in our hands. But look at what happens when millions of trees unite across mountain ranges.
        <br><br>
        Watch these mountain pine forests and drifting mist. Mountains are the water towers of Earth. Tree canopies catch drifting cloud moisture. Roots filter rainwater deep into the ground, bubbling up into clear streams that form the great rivers feeding every town and city on Earth.”
      </div>
    `
  },
  14: {
    title: "Nature and Our Feelings: Robert Frost's Poem",
    timing: "⏱ Recommended Time: 60 seconds",
    script: `
      <div class="stage-direction-cue">[AUDIO DUCKS TO A WHISPER. READ THE POEM SLOWLY AND CLEARLY]</div>
      <div class="speaking-script-box">
        “Nature doesn't just keep our bodies alive—it also comforts our hearts.
        <br><br>
        Consider Robert Frost’s famous poem, <em>Dust of Snow</em>:
        <br><br>
        <em>
        The way a crow<br>
        Shook down on me<br>
        The dust of snow<br>
        From a hemlock tree<br><br>
        Has given my heart<br>
        A change of mood<br>
        And saved some part<br>
        Of a day I had rued.
        </em>
        <br><br>
        A crow—often considered gloomy—and a hemlock tree—a poisonous plant—came together to shake a simple sprinkle of snow on his neck. That unexpected contact with nature broke through his bad mood and saved his day.
        <br><br>
        Nature doesn’t fix every problem in life. But stepping outside and watching leaves dance gives our minds space to heal and reset.”
      </div>
    `
  },
  15: {
    title: "Closing: A Seed of Hope",
    timing: "⏱ Recommended Time: 45 seconds",
    script: `
      <div class="stage-direction-cue">[SMILE, LOOK DIRECTLY AT CLASSMATES WITH EMOTION]</div>
      <div class="speaking-script-box">
        “As we conclude today, I leave you with this question:
        <br><br>
        <strong>If one small plant can represent hope for an entire planet, what can each of us do to help that hope grow?</strong>
        <br><br>
        It starts with three simple actions:
        <br><br>
        1. <strong>Notice nature:</strong> Look up on your walk home. Notice the veins of a leaf, or morning dew.
        <br>
        2. <strong>Respect nature:</strong> Avoid snapping branches or trampling fragile saplings.
        <br>
        3. <strong>Help it grow:</strong> Water a thirsty potted plant, plant a seed, or keep a small green pot on your windowsill.
        <br><br>
        <strong>Notice nature. Respect it. Help it grow.</strong>
        <br><br>
        Thank you all so much!”
      </div>
    `
  },
  16: {
    title: "Presentation Guide, Shortcuts & Credits",
    timing: "⏱ Q&A & Resource Slide",
    script: `
      <div class="stage-direction-cue">[OPEN THE FLOOR FOR QUESTIONS]</div>
      <div class="speaking-script-box">
        “This slide contains our 7–8 minute timing breakdown, keyboard shortcuts, and the link to our comprehensive Planet Comparison file. I’d love to answer any questions now!”
      </div>
    `
  }
};

// Comparison Data for Slide 3
const COMPARISON_DATA = {
  with: [
    {
      icon: "🌬️",
      category: "Atmosphere & Oxygen",
      stat: "20.9% OXYGEN • STABLE CO₂",
      desc: "Plants generate over 100 billion tons of clean oxygen every year while absorbing carbon dioxide to prevent runaway greenhouse heating."
    },
    {
      icon: "🌧️",
      category: "Water & Rain Cycle",
      stat: "400L / DAY TRANSPIRED PER TREE",
      desc: "Forest canopies release massive moisture vapors and organic terpenes into the atmosphere, creating inland rain clouds hundreds of miles from oceans."
    },
    {
      icon: "🌱",
      category: "Soil & Living Earth",
      stat: "LIVING ROOT ANCHOR NET",
      desc: "Root systems weave microscopic subterranean meshes that anchor rich topsoil, stop mudslides, and filter clean drinking water into aquifers."
    },
    {
      icon: "🦌",
      category: "The Web of Life",
      stat: "8.7 MILLION SPECIES SUPPORTED",
      desc: "Plants convert sunlight into edible glucose at the base of every food chain, sustaining all herbivores, predators, and human civilization."
    }
  ],
  without: [
    {
      icon: "☠️",
      category: "Atmosphere & Oxygen",
      stat: "RAPID OXYGEN LOSS • CO₂ CRISIS",
      desc: "Oxygen reserves deplete within years as fires and oxidation consume air. Unabsorbed carbon dioxide turns the atmosphere toxic and stagnant."
    },
    {
      icon: "🏜️",
      category: "Water & Rain Cycle",
      stat: "DEAD SKIES • NO INLAND RAIN",
      desc: "Without plant transpiration, inland rain stops completely. Sporadic torrential storms scour barren land before evaporating into dry air."
    },
    {
      icon: "🌪️",
      category: "Soil & Living Earth",
      stat: "GLOBAL DUST STORMS • EROSION",
      desc: "Without root anchors, rainwater scours topsoil into bedrock within decades. Unchecked winds whip dried clay into global dust storms."
    },
    {
      icon: "🥀",
      category: "The Web of Life",
      stat: "100% TERRESTRIAL EXTINCTION",
      desc: "Herbivores starve within weeks, carnivores perish shortly after, and global agricultural collapse ends all human civilization."
    }
  ]
};

// Application State Controller
class PresentationApp {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 16;
    this.isNotesOpen = false;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.currentCompMode = 'with';

    this.appContainer = document.getElementById('presentation-app');
    this.presentationStage = document.getElementById('presentationStage');

    this.initDOMElements();
    this.initEventListeners();
    this.renderSlide(this.currentSlide);
    this.renderComparisonCards('with');
    this.buildSlideGrid();
  }

  initDOMElements() {
    this.slideCounter = document.getElementById('slideCounter');
    this.progressBar = document.getElementById('progressBar');
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevSlideBtn');
    this.nextBtn = document.getElementById('nextSlideBtn');
    
    // Presenter Drawer
    this.notesDrawer = document.getElementById('presenterDrawer');
    this.notesContent = document.getElementById('presenterNotesContent');
    this.notesToggleBtn = document.getElementById('notesToggleBtn');
    this.closeNotesBtn = document.getElementById('closeNotesDrawerBtn');

    // Timer
    this.timerToggleBtn = document.getElementById('timerToggleBtn');
    this.timerDisplay = document.getElementById('timerDisplay');

    // Modals
    this.gridModal = document.getElementById('gridModal');
    this.gridToggleBtn = document.getElementById('gridToggleBtn');
    this.gridSlidesList = document.getElementById('gridSlidesList');
    this.editPlantModal = document.getElementById('editPlantModal');

    // Audio controls
    this.audioModeSelect = document.getElementById('audioModeSelect');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.duckingBadge = document.getElementById('duckingBadge');

    // Fullscreen
    this.fullscreenBtn = document.getElementById('fullscreenBtn');

    // Mountain Video
    this.mountainVideo = document.getElementById('mountainVideo');
    this.mountainPlayBtn = document.getElementById('mountainPlayBtn');
    this.playBtnLabel = document.getElementById('playBtnLabel');
    this.mountainMuteBtn = document.getElementById('mountainMuteBtn');
    this.videoMuteLabel = document.getElementById('videoMuteLabel');
    this.mountainFallback = document.getElementById('mountainFallback');
    this.centerVideoPlayBtn = document.getElementById('centerVideoPlayBtn');

    // Comparison elements
    this.comparisonGrid = document.getElementById('comparisonGrid');
    this.compBtnWith = document.getElementById('compBtnWith');
    this.compBtnWithout = document.getElementById('compBtnWithout');
    this.compFooterSummary = document.getElementById('compFooterSummary');
  }

  initEventListeners() {
    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Presenter notes toggle
    this.notesToggleBtn.addEventListener('click', () => this.toggleNotes());
    this.closeNotesBtn.addEventListener('click', () => this.toggleNotes(false));

    // Timer
    this.timerToggleBtn.addEventListener('click', () => this.toggleTimer());

    // Grid modal
    this.gridToggleBtn.addEventListener('click', () => this.openGridModal());

    // Fullscreen
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Audio controls
    this.audioModeSelect.addEventListener('change', (e) => {
      if (window.natureAudio) {
        window.natureAudio.play(e.target.value);
      }
    });

    this.volumeSlider.addEventListener('input', (e) => {
      if (window.natureAudio) {
        window.natureAudio.setVolume(parseFloat(e.target.value));
      }
    });

    // Mountain Video controls
    if (this.mountainPlayBtn && this.mountainVideo) {
      this.mountainPlayBtn.addEventListener('click', () => this.toggleMountainVideo());
      this.mountainMuteBtn.addEventListener('click', () => this.toggleMountainMute());

      // If video errors or cannot load, show fallback gracefully
      this.mountainVideo.addEventListener('error', () => {
        console.warn('Video failed to load; using high-res visual fallback.');
        if (this.mountainFallback) {
          this.mountainFallback.classList.add('active');
        }
      });
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') this.closeAllModals();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'p':
        case 'P':
        case 'n':
        case 'N':
          e.preventDefault();
          this.toggleNotes();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          this.openGridModal();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          this.toggleTimer();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleAudioMute();
          break;
        case 'Escape':
          this.closeAllModals();
          break;
      }
    });
  }

  renderSlide(index) {
    if (index < 1 || index > this.totalSlides) return;
    this.currentSlide = index;

    // Toggle dedicated Arid / Dry theme for Slide 1
    const isSlide1 = index === 1;
    if (this.appContainer) this.appContainer.classList.toggle('dry-theme', isSlide1);
    if (this.presentationStage) this.presentationStage.classList.toggle('dry-theme', isSlide1);

    // Notify falling leaves engine (leaves fall on all slides EXCEPT slide 1)
    if (window.leavesEngine) {
      window.leavesEngine.onSlideChange(index);
    }

    // Update slides visibility
    this.slides.forEach((slide) => {
      const slideNum = parseInt(slide.dataset.slide, 10);
      if (slideNum === index) {
        slide.classList.add('active');
        // Handle audio ducking for speaking/poem slides
        const shouldDuck = slide.dataset.duckAudio === 'true';
        if (window.natureAudio) {
          window.natureAudio.duck(shouldDuck);
        }
        if (this.duckingBadge) {
          this.duckingBadge.classList.toggle('visible', shouldDuck);
        }
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Counter & Progress Bar
    this.slideCounter.textContent = `Slide ${index} / ${this.totalSlides}`;
    const progressPct = ((index - 1) / (this.totalSlides - 1)) * 100;
    this.progressBar.style.width = `${progressPct}%`;

    // Update Prev / Next button states
    this.prevBtn.disabled = index === 1;
    this.nextBtn.disabled = index === this.totalSlides;

    // Update Presenter Notes Content
    this.renderPresenterNotes(index);

    // Update slide grid active indicator
    this.updateGridActiveState();

    // Auto-pause video if leaving mountain slide
    if (index !== 13 && this.mountainVideo && !this.mountainVideo.paused) {
      this.mountainVideo.pause();
      if (this.playBtnLabel) this.playBtnLabel.textContent = 'Play Video';
      if (this.centerVideoPlayBtn) this.centerVideoPlayBtn.classList.remove('hidden');
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.renderSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 1) {
      this.renderSlide(this.currentSlide - 1);
    }
  }

  goToSlide(index) {
    this.renderSlide(index);
    this.closeAllModals();
  }

  renderPresenterNotes(slideNum) {
    const noteData = PRESENTER_SCRIPTS[slideNum];
    if (!noteData) {
      this.notesContent.innerHTML = `<p style="color:var(--color-text-muted);">No notes available for this slide.</p>`;
      return;
    }

    this.notesContent.innerHTML = `
      <div class="drawer-timing-tag">${noteData.timing}</div>
      <h4 style="font-family:var(--font-serif); font-size:1.15rem; color:var(--color-forest-deep); margin-bottom:8px;">${noteData.title}</h4>
      <div class="script-section-title">Speaking Script & Classroom Guidance</div>
      ${noteData.script}
    `;
  }

  renderComparisonCards(mode = 'with') {
    this.currentCompMode = mode;
    const items = COMPARISON_DATA[mode];
    if (!this.comparisonGrid || !items) return;

    this.comparisonGrid.innerHTML = items.map(item => `
      <div class="comparison-card ${mode === 'with' ? 'card-living' : 'card-barren'}">
        <div>
          <div class="comp-header-icon">${item.icon}</div>
          <h4 class="comp-category-title">${item.category}</h4>
          <span class="comp-stat-badge">${item.stat}</span>
        </div>
        <p class="comp-description">${item.desc}</p>
      </div>
    `).join('');

    if (this.compBtnWith && this.compBtnWithout) {
      this.compBtnWith.classList.toggle('active', mode === 'with');
      this.compBtnWithout.classList.toggle('active', mode === 'without');
    }

    if (this.compFooterSummary) {
      if (mode === 'with') {
        this.compFooterSummary.innerHTML = `🌱 <strong>Living Reality:</strong> Plants regulate atmospheric gases, protect rivers, and sustain all animal life.`;
      } else {
        this.compFooterSummary.innerHTML = `💀 <strong>Extinction State:</strong> Without plants, runaway carbon, soil scours, and complete trophic collapse follow.`;
      }
    }
  }

  toggleNotes(forceState = null) {
    this.isNotesOpen = forceState !== null ? forceState : !this.isNotesOpen;
    this.notesDrawer.classList.toggle('open', this.isNotesOpen);
    this.notesToggleBtn.classList.toggle('active', this.isNotesOpen);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  toggleTimer() {
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.timerToggleBtn.style.background = 'rgba(255, 255, 255, 0.08)';
    } else {
      this.isTimerRunning = true;
      this.timerToggleBtn.style.background = 'rgba(56, 124, 83, 0.4)';
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const padM = String(mins).padStart(2, '0');
        const padS = String(secs).padStart(2, '0');
        this.timerDisplay.textContent = `${padM}:${padS} / 07:30`;

        if (this.timerSeconds > 450) {
          this.timerDisplay.style.color = '#ef4444';
        } else if (this.timerSeconds > 420) {
          this.timerDisplay.style.color = '#f59e0b';
        } else {
          this.timerDisplay.style.color = 'inherit';
        }
      }, 1000);
    }
  }

  toggleAudioMute() {
    if (!window.natureAudio) return;
    if (window.natureAudio.isPlaying) {
      window.natureAudio.stop();
      this.audioModeSelect.value = 'none';
    } else {
      window.natureAudio.play('birds');
      this.audioModeSelect.value = 'birds';
    }
  }

  toggleMountainVideo() {
    if (!this.mountainVideo) return;
    if (this.mountainVideo.paused) {
      this.mountainVideo.play().then(() => {
        if (this.playBtnLabel) this.playBtnLabel.textContent = 'Pause Video';
        if (this.centerVideoPlayBtn) this.centerVideoPlayBtn.classList.add('hidden');
        if (this.mountainFallback) this.mountainFallback.classList.remove('active');
      }).catch(err => {
        console.warn('Video play interrupted; showing fallback', err);
        if (this.mountainFallback) this.mountainFallback.classList.add('active');
      });
    } else {
      this.mountainVideo.pause();
      if (this.playBtnLabel) this.playBtnLabel.textContent = 'Play Video';
      if (this.centerVideoPlayBtn) this.centerVideoPlayBtn.classList.remove('hidden');
    }
  }

  toggleMountainMute() {
    if (!this.mountainVideo) return;
    this.mountainVideo.muted = !this.mountainVideo.muted;
    if (this.videoMuteLabel) {
      this.videoMuteLabel.textContent = this.mountainVideo.muted ? 'Sound Off' : 'Sound On';
    }
  }

  buildSlideGrid() {
    if (!this.gridSlidesList) return;
    this.gridSlidesList.innerHTML = '';

    const slideTitles = [
      "1. Opening: A Bare Earth (Dry Theme)",
      "2. Why Plants Matter",
      "3. Interactive Planet Comparison",
      "4. A Fictional Warning: WALL-E",
      "5. Mystery Plant Challenge Intro",
      "6. Mystery #1: Banyan Tree",
      "7. Mystery #2: Neem Tree",
      "8. Mystery #3: Hibiscus",
      "9. Mystery #4: Tulsi (Holy Basil)",
      "10. Mystery #5: Peepal (Sacred Fig)",
      "11. Mystery #6: Snake Plant",
      "12. Mystery #7: Custom / Mint",
      "13. Mountains & Real Nature Video",
      "14. Dust of Snow (Robert Frost)",
      "15. Closing: A Seed of Hope",
      "16. Presentation Guide & Credits"
    ];

    slideTitles.forEach((title, idx) => {
      const slideIndex = idx + 1;
      const thumb = document.createElement('div');
      thumb.className = `grid-slide-thumb ${slideIndex === this.currentSlide ? 'current' : ''}`;
      thumb.dataset.slide = slideIndex;
      thumb.innerHTML = `
        <span class="thumb-num">SLIDE ${String(slideIndex).padStart(2, '0')}</span>
        <div class="thumb-title">${title}</div>
      `;
      thumb.addEventListener('click', () => {
        this.goToSlide(slideIndex);
      });
      this.gridSlidesList.appendChild(thumb);
    });
  }

  updateGridActiveState() {
    const thumbs = document.querySelectorAll('.grid-slide-thumb');
    thumbs.forEach(thumb => {
      const num = parseInt(thumb.dataset.slide, 10);
      thumb.classList.toggle('current', num === this.currentSlide);
    });
  }

  openGridModal() {
    if (this.gridModal) this.gridModal.classList.add('open');
  }

  closeAllModals() {
    if (this.gridModal) this.gridModal.classList.remove('open');
    if (this.editPlantModal) this.editPlantModal.classList.remove('open');
    this.toggleNotes(false);
  }
}

// Global helpers
function setComparisonMode(mode) {
  if (window.presentation) {
    window.presentation.renderComparisonCards(mode);
  }
}

function toggleLeavesAnimation() {
  if (window.leavesEngine) {
    const enabled = window.leavesEngine.toggleUserEnabled();
    const btn = document.getElementById('leavesToggleBtn');
    const label = document.getElementById('leavesToggleLabel');
    if (btn) btn.classList.toggle('active', enabled);
    if (label) label.textContent = enabled ? '🍃 Leaves: On' : '🍃 Leaves: Off';
  }
}

function toggleSlide1Reveal() {
  const ans = document.getElementById('slide1Answer');
  const btn = document.getElementById('slide1RevealBtn');
  if (!ans || !btn) return;
  if (ans.style.display === 'none') {
    ans.style.display = 'inline-flex';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Revealed (Click to Hide)</span>`;
    btn.classList.add('revealed');
  } else {
    ans.style.display = 'none';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><span>Reveal Answer</span>`;
    btn.classList.remove('revealed');
  }
}

function togglePlantReveal(plantKey) {
  const card = document.getElementById(`card-${plantKey}`);
  const btn = document.getElementById(`revealBtn-${plantKey}`);
  if (!card || !btn) return;

  const isRevealed = card.classList.contains('is-revealed');
  if (isRevealed) {
    card.classList.remove('is-revealed');
    card.classList.add('is-hidden');
    btn.classList.remove('revealed');
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
      <span>Reveal Plant Answer</span>
    `;
  } else {
    card.classList.remove('is-hidden');
    card.classList.add('is-revealed');
    btn.classList.add('revealed');
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Plant Revealed (Click to Hide)</span>
    `;
  }
}

// Modal helpers for editing custom plant
function openEditCustomPlantModal() {
  const modal = document.getElementById('editPlantModal');
  if (modal) modal.classList.add('open');
}

function closeEditCustomPlantModal() {
  const modal = document.getElementById('editPlantModal');
  if (modal) modal.classList.remove('open');
}

function closeGridModal() {
  const modal = document.getElementById('gridModal');
  if (modal) modal.classList.remove('open');
}

function saveCustomPlantDetails() {
  const title = document.getElementById('editPTitle').value;
  const name = document.getElementById('editPName').value;
  const sci = document.getElementById('editPSci').value;
  const clue = document.getElementById('editPClue').value;
  const benefit = document.getElementById('editPBenefit').value;
  const fact = document.getElementById('editPFact').value;
  const img = document.getElementById('editPImg').value;

  if (title) document.getElementById('customPlantTitle').textContent = title;
  if (name) document.getElementById('customPlantName').textContent = name;
  if (sci) document.getElementById('customPlantSci').textContent = sci;
  if (clue) document.getElementById('customPlantClue').textContent = clue;
  if (benefit) document.getElementById('customPlantBenefit').textContent = benefit;
  if (fact) document.getElementById('customPlantFact').textContent = fact;
  if (img) document.getElementById('customPlantImg').src = img;

  closeEditCustomPlantModal();
}

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationApp();
});
