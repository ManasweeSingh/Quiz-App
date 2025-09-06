/* Quiz Enhancements: Previous, Skip, Timer, Progress, Difficulty, Highscore */
(function(){
  const qs = window.questions || null;
  let totalQ = (qs && qs.length) || 1;
  let current = 0;
  let perQuestionTime = 60; // seconds
  let timerInterval = null;
  let timeLeft = perQuestionTime;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const skipBtn = document.getElementById('skip-btn');
  const submitBtn = document.getElementById('submit-btn');
  const curSpan = document.getElementById('current-q');
  const totSpan = document.getElementById('total-q');
  const progress = document.getElementById('quiz-progress');
  const timeSpan = document.getElementById('time-left');
  const diffSelect = document.getElementById('difficulty-select');
  const highScoreEl = document.getElementById('highscore-value');

  // Load/save highscore
  const HS_KEY = 'quiz_highscore_v1';
  function loadHighScore(){ return parseInt(localStorage.getItem(HS_KEY) || '0'); }
  function saveHighScore(v){ localStorage.setItem(HS_KEY, v); }
  highScoreEl.textContent = loadHighScore();

  // Timer functions
  function startTimer(seconds){
    stopTimer();
    timeLeft = seconds;
    timeSpan.textContent = formatTime(timeLeft);
    timerInterval = setInterval(()=>{
      timeLeft--;
      timeSpan.textContent = formatTime(timeLeft);
      if(timeLeft<=0){ goNext(); }
    },1000);
  }
  function stopTimer(){ if(timerInterval) clearInterval(timerInterval); }
  function formatTime(s){
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return mm+':'+ss;
  }

  // UI updater
  function updateUI(){
    curSpan.textContent = current+1;
    totSpan.textContent = totalQ;
    progress.value = ((current+1)/totalQ)*100;
    startTimer(perQuestionTime);

    // If your app defines showQuestion, call it
    if(typeof window.showQuestion === 'function'){
      window.showQuestion(current);
    }
  }

  // Navigation
  function goPrev(){ if(current>0) current--; updateUI(); }
  function goNext(){ if(current<totalQ-1) current++; else handleSubmit(); updateUI(); }
  function handleSkip(){ current++; updateUI(); }
  function handleSubmit(){
    stopTimer();
    let score = 0;
    if(typeof window.evaluateQuiz === 'function'){
      score = window.evaluateQuiz();
    } else {
      score = Math.floor(Math.random()*101);
    }
    const prev = loadHighScore();
    if(score > prev){ saveHighScore(score); highScoreEl.textContent = score; }
    alert(`Your score: ${score}\nHigh score: ${Math.max(score, prev)}`);
  }

  // Difficulty filter
  diffSelect.addEventListener('change', ()=>{
    if(window.questions && Array.isArray(window.questions)){
      if(diffSelect.value === 'all'){ 
        window.questions = window._original_questions || window.questions; 
      } else {
        window._original_questions = window._original_questions || window.questions.slice();
        window.questions = window._original_questions.filter(q => q.difficulty === diffSelect.value);
      }
      totalQ = window.questions.length;
      current = 0;
      updateUI();
    }
  });

  // Attach events
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  skipBtn.addEventListener('click', handleSkip);
  submitBtn.addEventListener('click', handleSubmit);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') goPrev();
    if(e.key === 'ArrowRight') goNext();
    if(e.key.toLowerCase() === 's') handleSkip();
  });

  // Start first question
  updateUI();
})();
