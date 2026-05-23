(function () {
  'use strict';

  // ─── Quiz Data ───────────────────────────────────────────────────────────────

  const QUESTIONS = [
    {
      id: 1,
      text: 'What best describes your current situation?',
      options: [
        { label: 'I have pain or an injury affecting my training',      issueTag: 'has_issue',  pts: 3 },
        { label: 'Nagging discomfort — still training, but managing it', issueTag: 'managing',   pts: 2 },
        { label: 'I want to optimize and prevent injury',               issueTag: 'no_issue',   pts: 1 },
        { label: 'Post-surgery or returning from a significant injury', issueTag: 'has_issue',  pts: 3 },
      ],
    },
    {
      id: 2,
      text: 'Do you have a competition on your calendar?',
      options: [
        { label: 'Yes, within the next 8 weeks',      pts: 4 },
        { label: 'Yes, within the next 3–6 months',   pts: 3 },
        { label: 'Yes, more than 6 months out',       pts: 2 },
        { label: 'No competition planned',            pts: 1 },
      ],
    },
    {
      id: 3,
      text: 'How is your training currently affected?',
      options: [
        { label: 'Significantly reduced volume or pulling lifts',      pts: 3 },
        { label: 'Modifying some movements but staying consistent',    pts: 2 },
        { label: 'Minimal impact — mostly managing discomfort',        pts: 1 },
        { label: 'Not training at all right now',                      pts: 3 },
      ],
    },
    {
      id: 4,
      text: 'How long have you been dealing with this?',
      options: [
        { label: 'Less than 2 weeks',    pts: 3 },
        { label: '2–8 weeks',            pts: 2 },
        { label: '2–6 months',           pts: 2 },
        { label: 'More than 6 months',   pts: 1 },
      ],
    },
    {
      id: 5,
      text: 'Primary sport or training style?',
      options: [
        { label: 'Powerlifting',                      tag: 'powerlifting',     pts: 0 },
        { label: 'Strongman',                         tag: 'strongman',        pts: 0 },
        { label: 'Olympic / Weightlifting',           tag: 'weightlifting',    pts: 0 },
        { label: 'General strength / barbell training', tag: 'general-strength', pts: 0 },
      ],
    },
    {
      id: 6,
      text: 'How many days per week do you train?',
      options: [
        { label: '5 or more days per week',   pts: 3 },
        { label: '3–4 days per week',         pts: 2 },
        { label: '1–2 days per week',         pts: 1 },
        { label: 'Not training currently',    pts: 1 },
      ],
    },
    {
      id: 7,
      text: 'Where are you located?',
      options: [
        { label: 'Denver / surrounding area',         tag: 'local',  pts: 0 },
        { label: 'Outside Denver / Colorado',         tag: 'remote', pts: 0 },
      ],
    },
    {
      id: 8,
      text: 'What matters most to you right now?',
      options: [
        { label: 'Get out of pain fast and back to full training',          pts: 2 },
        { label: 'Stay in the program — just manage this smarter',          pts: 2 },
        { label: 'Build a long-term plan to stay healthy through competition', pts: 1 },
        { label: 'Figure out if I even need PT',                            pts: 1 },
      ],
    },
  ];

  // ─── Results Config ──────────────────────────────────────────────────────────

  const RESULTS = {
    // Acute / high-urgency local — eval now
    r1: {
      headline: "You need eyes on this now. Let's get you in.",
      subhead: "Based on your answers, you're dealing with something that needs to be addressed before it pulls you out of training completely.",
      bullets: [
        'Full movement and strength assessment',
        'Same-session treatment',
        'Training plan that keeps you lifting while we fix this',
        'Direct access to Dr. Sam between sessions',
      ],
      primaryLabel: 'Book Your Eval — $225',
      primaryUrl: 'https://l.bttr.to/VBM4z',
      secondaryLabel: 'Not ready? Book a free 15-min call first',
      secondaryUrl: 'https://l.bttr.to/WbxTX',
    },
    // Remote — any issue level
    r2: {
      headline: "You need a plan. Let's build one remotely.",
      subhead: "You're dealing with something real and you're outside Denver. Here's how we work together.",
      bullets: [
        'Video eval to assess movement and loading patterns',
        "Customized training modifications so you don't lose progress",
        'Programming adjustments built around your comp timeline',
        'Ongoing async access to Dr. Sam',
      ],
      primaryLabel: 'Book a Remote Eval',
      primaryUrl: 'https://l.bttr.to/WbxTX',
      secondaryLabel: 'Learn more about remote options',
      secondaryUrl: 'https://drsampt.github.io/services-link-in-bio',
    },
    // Managing discomfort / lower urgency — still needs eval + POC
    r3: {
      headline: "You're managing it. Let's actually fix it.",
      subhead: "You're still training, which is exactly right. But managing discomfort indefinitely isn't a plan — let's build one before this limits your next training block.",
      bullets: [
        'Eval + structured session package',
        'Progressive loading strategy built around your program',
        'Manual therapy and dry needling as needed',
        'HEP and ongoing form check access',
      ],
      primaryLabel: 'Book Your Eval — $225',
      primaryUrl: 'https://l.bttr.to/VBM4z',
      secondaryLabel: 'Talk to Dr. Sam first',
      secondaryUrl: 'https://l.bttr.to/WbxTX',
    },
    // Healthy, training consistently — maintenance is the right fit
    r4: {
      headline: "You're in a good spot. Let's keep you there.",
      subhead: "You don't need intensive rehab right now. You need a system to stay healthy while you keep pushing — one session a month keeps small problems small.",
      bullets: [
        'Monthly check-in structure',
        'Home program and mobility blueprint',
        'Direct access for flare-ups',
        'Proactive catch of issues before they interrupt training',
      ],
      primaryLabel: 'Ask About Maintenance Membership — $330/mo',
      primaryUrl: 'https://l.bttr.to/WbxTX',
      secondaryLabel: 'Grab the free Barbell Mobility Blueprint',
      secondaryUrl: 'https://topperformancept.activehosted.com/f/2',
    },
    // Truly healthy, no issue, low training load — free resources
    r5: {
      headline: 'Start here. No commitment needed.',
      subhead: "Based on your answers you're in a good position. Here are the best free resources to keep it that way.",
      bullets: [
        'Self-assessment tool to identify weak links',
        'Barbell Mobility Blueprint',
        'The Weekly Set — weekly training and rehab tips',
      ],
      primaryLabel: 'Take the Free Self-Assessment',
      primaryUrl: 'https://forms.gle/AZm7DrscgAzqs9iw9',
      secondaryLabel: 'Subscribe to The Weekly Set',
      secondaryUrl: 'https://topperformancept.activehosted.com/f/6',
    },
  };

  // ─── State ───────────────────────────────────────────────────────────────────

  const state = {
    currentStep: 0,
    answers: {},
    score: 0,
    tags: {},
    issueLevel: null, // 'has_issue' | 'managing' | 'no_issue'
  };

  // ─── DOM Refs ────────────────────────────────────────────────────────────────

  const header      = document.getElementById('quiz-header');
  const progressBar = document.getElementById('progress-bar');
  const stepLabel   = document.getElementById('step-label');
  const mainContent = document.getElementById('main-content');

  // ─── Routing Logic ───────────────────────────────────────────────────────────
  //
  // Decision tree:
  //
  //  Remote?                          → r2  (always, regardless of issue)
  //  has_issue OR managing + score≥13 → r1  (urgent eval)
  //  has_issue OR managing + score≥7  → r3  (eval, lower urgency)
  //  has_issue OR managing + score<7  → r3  (still needs eval — something is wrong)
  //  no_issue + trains ≥3x/week      → r4  (maintenance)
  //  no_issue + low training load     → r5  (free resources)
  //
  // Key principle: maintenance (r4) only fires when issueLevel === 'no_issue'.
  // Any athlete reporting pain, injury, or discomfort routes to an eval result.

  function computeResult() {
    const isRemote   = state.tags.location === 'remote';
    const issue      = state.issueLevel;
    const score      = state.score;
    const highVolume = state.tags.trainingVolume === 'high'; // ≥3 days/week

    if (isRemote) return 'r2';

    if (issue === 'has_issue' || issue === 'managing') {
      if (score >= 13) return 'r1';
      return 'r3';
    }

    // no_issue path
    if (highVolume) return 'r4';
    return 'r5';
  }

  // ─── Rendering ───────────────────────────────────────────────────────────────

  function setScreen(html) {
    mainContent.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'screen';
    wrapper.innerHTML = html;
    mainContent.appendChild(wrapper);
  }

  function updateProgress(step) {
    const pct = (step / QUESTIONS.length) * 100;
    progressBar.style.width = pct + '%';
    stepLabel.textContent = 'Step ' + step + ' of ' + QUESTIONS.length;
  }

  function showIntro() {
    header.classList.add('hidden');
    state.currentStep = 0;

    setScreen(`
      <div class="intro-screen">
        <div>
          <div class="intro-logo">Top Performance PT</div>
          <div class="intro-tagline">Rehab for Athletes Who Don't Stop Training</div>
        </div>
        <h1 class="intro-headline">Find out exactly<br><span>what you need</span><br>to keep training.</h1>
        <p class="intro-sub">Answer 8 quick questions. We'll match you to the right care path — no fluff, no wasted time.</p>
        <button class="btn-start" id="btn-start">Start the Quiz →</button>
        <p class="intro-meta">Takes about 90 seconds &nbsp;·&nbsp; Dr. Sam Englander, PT, DPT</p>
      </div>
    `);

    document.getElementById('btn-start').addEventListener('click', function () {
      showQuestion(0);
    });
  }

  function showQuestion(qIndex) {
    const q    = QUESTIONS[qIndex];
    const step = qIndex + 1;

    header.classList.remove('hidden');
    updateProgress(step);
    state.currentStep = step;

    const optionsHtml = q.options.map(function (opt, i) {
      const isSelected = state.answers[qIndex] === i;
      return `<button class="option-btn${isSelected ? ' selected' : ''}" data-index="${i}">${opt.label}</button>`;
    }).join('');

    setScreen(`
      <div class="question-screen">
        <p class="question-text">${q.text}</p>
        <div class="options-list" id="options-list">
          ${optionsHtml}
        </div>
        <div class="nav-row">
          <button class="btn-next${state.answers[qIndex] !== undefined ? ' visible' : ''}" id="btn-next">
            ${step < QUESTIONS.length ? 'Next →' : 'See My Results →'}
          </button>
        </div>
      </div>
    `);

    const optionsList = document.getElementById('options-list');
    const btnNext     = document.getElementById('btn-next');

    optionsList.addEventListener('click', function (e) {
      const btn = e.target.closest('.option-btn');
      if (!btn) return;

      const idx = parseInt(btn.dataset.index, 10);
      state.answers[qIndex] = idx;

      optionsList.querySelectorAll('.option-btn').forEach(function (b, i) {
        b.classList.toggle('selected', i === idx);
      });

      btnNext.classList.add('visible');
    });

    btnNext.addEventListener('click', function () {
      if (state.answers[qIndex] === undefined) return;
      advanceFromQuestion(qIndex);
    });
  }

  function advanceFromQuestion(qIndex) {
    const q   = QUESTIONS[qIndex];
    const opt = q.options[state.answers[qIndex]];

    // Accumulate score
    state.score += opt.pts || 0;

    // Q1: capture issue level — this is the primary routing flag
    if (q.id === 1 && opt.issueTag) {
      state.issueLevel = opt.issueTag;
    }

    // Q5: sport tag
    if (q.id === 5 && opt.tag) {
      state.tags.sport = opt.tag;
    }

    // Q6: training volume flag (used to differentiate r4 vs r5 in no_issue path)
    if (q.id === 6) {
      // Options 0 (5+ days) and 1 (3–4 days) = high volume
      state.tags.trainingVolume = state.answers[qIndex] <= 1 ? 'high' : 'low';
    }

    // Q7: location
    if (q.id === 7 && opt.tag) {
      state.tags.location = opt.tag;
    }

    const next = qIndex + 1;
    if (next < QUESTIONS.length) {
      showQuestion(next);
    } else {
      showResult();
    }
  }

  function showResult() {
    const key = computeResult();
    const r   = RESULTS[key];

    header.classList.remove('hidden');
    progressBar.style.width = '100%';
    stepLabel.textContent = 'Complete';

    const bulletsHtml = r.bullets.map(function (b) {
      return `<li>${b}</li>`;
    }).join('');

    setScreen(`
      <div class="result-screen">
        <div class="result-header">
          <h2 class="result-headline">${r.headline}</h2>
          <div class="result-accent-line"></div>
          <p class="result-subhead">${r.subhead}</p>
        </div>
        <ul class="result-bullets">
          ${bulletsHtml}
        </ul>
        <div class="result-ctas">
          <a href="${r.primaryUrl}" class="btn-primary-cta" target="_blank" rel="noopener noreferrer">${r.primaryLabel}</a>
          <a href="${r.secondaryUrl}" class="btn-secondary-cta" target="_blank" rel="noopener noreferrer">${r.secondaryLabel}</a>
        </div>
        <div class="result-restart">
          <button class="btn-restart" id="btn-restart">Start over</button>
        </div>
        <p class="result-provider">Dr. Sam Englander, PT, DPT &nbsp;·&nbsp; Top Performance PT</p>
      </div>
    `);

    document.getElementById('btn-restart').addEventListener('click', function () {
      resetState();
      showIntro();
    });
  }

  function resetState() {
    state.currentStep = 0;
    state.answers     = {};
    state.score       = 0;
    state.tags        = {};
    state.issueLevel  = null;
    progressBar.style.width = '0%';
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  showIntro();
})();
