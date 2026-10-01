import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Braces,
  Check,
  ChevronRight,
  Clock3,
  CircleHelp,
  Code2,
  Database,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Image,
  Layers3,
  Lightbulb,
  Monitor,
  Music2,
  Palette,
  Play,
  Server,
  ShoppingBag,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import amandaImage from "./assets/amanda.png";
import appLogo from "./assets/logo.png";
import novaImage from "./assets/novax.png";
import "./App.css";

const topics = [
  { label: "HTML, CSS og JavaScript", icon: Code2, color: "mint" },
  { label: "Feilsøking", icon: Lightbulb, color: "yellow" },
  { label: "Server og tjenester", icon: Server, color: "coral" },
  { label: "Programmering og Git", icon: GitBranch, color: "lilac" },
  { label: "Mediekommunikasjon", icon: Image, color: "coral" },
  { label: "Operativsystemer", icon: Monitor, color: "blue" },
  { label: "Databaser", icon: Database, color: "lilac" },
];

const tasks = [
  {
    title: "Bygg din første nettside",
    topic: "HTML, CSS og JavaScript",
    description: "Sett sammen HTML-elementer til et ryddig profilkort.",
    level: "Nybegynner",
    minutes: 10,
    xp: 25,
    icon: Braces,
    color: "mint",
  },
  {
    title: "Finn feilen i koden",
    topic: "Feilsøking",
    description: "Tre små feil står mellom deg og en fungerende side.",
    level: "Litt øvet",
    minutes: 12,
    xp: 35,
    icon: Lightbulb,
    color: "yellow",
  },
  {
    title: "Koble opp en server",
    topic: "Server og tjenester",
    description: "Velg riktige steg for å få en lokal tjeneste på nett.",
    level: "Nybegynner",
    minutes: 8,
    xp: 20,
    icon: Server,
    color: "coral",
  },
  {
    title: "Versjoner koden din med Git",
    topic: "Programmering og Git",
    description: "Øv på å lagre endringer og følge utviklingen i et prosjekt.",
    level: "Nybegynner",
    minutes: 10,
    xp: 25,
    icon: GitBranch,
    color: "lilac",
  },
  {
    title: "Planlegg en enkel database",
    topic: "Databaser",
    description: "Sorter informasjon i tabeller og finn gode felter for hver type data.",
    level: "Nybegynner",
    minutes: 12,
    xp: 30,
    icon: Database,
    color: "blue",
  },
  {
    title: "Gi bildene gode beskrivelser",
    topic: "Mediekommunikasjon",
    description: "Skriv alternativtekst som gjør medieinnhold mer tilgjengelig.",
    level: "Nybegynner",
    minutes: 8,
    xp: 20,
    icon: Image,
    color: "coral",
  },
];

const resources = [
  {
    title: "HTML-elementer og semantikk",
    topic: "HTML, CSS og JavaScript",
    description: "En kort guide til å velge riktige elementer og lage struktur som gir mening.",
    content: "Bruk HTML-elementer etter hva innholdet betyr. <header> samler innledende innhold, <nav> markerer navigasjon, og <main> brukes til sidens viktigste innhold. Semantisk HTML gjør siden lettere å forstå for både mennesker og hjelpemidler.",
    format: "MINIGUIDE",
    icon: BookOpen,
    color: "blue",
  },
  {
    title: "Sjekkliste for feilsøking",
    topic: "Feilsøking",
    description: "En ryddig rekkefølge å følge når noe ikke virker som det skal.",
    content: "Start med å gjenskape feilen. Les feilmeldingen, sjekk hva du forventet skulle skje, og endre én ting om gangen. Når du finner løsningen, skriv ned hva som forårsaket feilen slik at du kan kjenne den igjen senere.",
    format: "SJEKKLISTE",
    icon: BadgeCheck,
    color: "mint",
  },
  {
    title: "Nettverk på fem minutter",
    topic: "Server og tjenester",
    description: "Bli kjent med IP-adresser, DNS og hva en server egentlig gjør.",
    content: "En IP-adresse identifiserer en enhet i et nettverk. DNS oversetter domenenavn til IP-adresser, og en server svarer på forespørsler fra andre enheter. Når du åpner en nettside, samarbeider disse delene for å finne og vise innholdet.",
    format: "FAGNOTAT",
    icon: Server,
    color: "coral",
  },
];

const MAX_TASK_TIME_MINUTES = 10;
const MAX_TASK_TIME_SECONDS = MAX_TASK_TIME_MINUTES * 60;
const MAX_TASK_POINTS = 10;

type ChoiceQuestion = {
  question: string;
  topic: string;
  answerType: "choice";
  choices: string[];
  correctIndex: number;
  explanation: string;
};

type TextQuestion = {
  question: string;
  topic: string;
  answerType: "text";
  acceptedAnswers: string[];
  explanation: string;
};

type QuizQuestion = ChoiceQuestion | TextQuestion;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Hva brukes HTML til?",
    topic: "HTML, CSS og JavaScript",
    answerType: "choice",
    choices: [
      "Å strukturere innhold på en nettside",
      "Å lagre data i en database",
      "Å koble maskinen til internett",
    ],
    correctIndex: 0,
    explanation: "HTML gir innholdet på nettsiden struktur.",
  },
  {
    question: "Hva gjør CSS?",
    topic: "HTML, CSS og JavaScript",
    answerType: "choice",
    choices: [
      "Lagrer nettsidens filer på en server",
      "Bestemmer hvordan nettsiden ser ut",
      "Oversetter domenenavn til IP-adresser",
    ],
    correctIndex: 1,
    explanation: "CSS brukes til å style og plassere innhold på nettsiden.",
  },
  {
    question: "Hva heter verktøyet som brukes til å holde oversikt over endringer i kode?",
    topic: "Programmering og Git",
    answerType: "text",
    acceptedAnswers: ["git", "git versjonskontroll"],
    explanation: "Git lagrer versjonshistorikken til prosjektet ditt.",
  },
  {
    question: "Hva er en database først og fremst til for?",
    topic: "Databaser",
    answerType: "choice",
    choices: [
      "Å lagre og finne igjen informasjon",
      "Å justere fargene på en nettside",
      "Å koble tastaturet til en datamaskin",
    ],
    correctIndex: 0,
    explanation: "Databaser organiserer informasjon slik at den kan lagres og hentes fram.",
  },
  {
    question: "Hva bør alternativteksten til et bilde gjøre?",
    topic: "Mediekommunikasjon",
    answerType: "choice",
    choices: [
      "Gjenta filnavnet til bildet",
      "Beskrive viktig informasjon i bildet",
      "Fortelle hvilken farge bildet har",
    ],
    correctIndex: 1,
    explanation: "Alternativtekst gjør innholdet i viktige bilder tilgjengelig for flere.",
  },
];

const LEVEL_TWO_PASS_PERCENT = 90;
const REQUIRED_CORRECT_FOR_LEVEL_TWO = Math.ceil(
  (quizQuestions.length * LEVEL_TWO_PASS_PERCENT) / 100,
);

function App() {
  const today = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  const [view, setView] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState("Alle oppgaver");
  const [catalogTab, setCatalogTab] = useState<"tasks" | "resources">("tasks");
  const [dialog, setDialog] = useState<"test" | "store" | null>(null);
  const [selectedTask, setSelectedTask] = useState<
    (typeof tasks)[number] | null
  >(null);
  const [selectedResource, setSelectedResource] = useState<
    (typeof resources)[number] | null
  >(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [draftAnswer, setDraftAnswer] = useState("");
  const [answerWasCorrect, setAnswerWasCorrect] = useState<boolean | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [quizPoints, setQuizPoints] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(MAX_TASK_TIME_SECONDS);
  const [timeExpired, setTimeExpired] = useState(false);
  const questionDeadline = useRef<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [missedTopics, setMissedTopics] = useState<string[]>([]);
  const [recommendedTasks, setRecommendedTasks] = useState<
    (typeof tasks)[number][]
  >([]);
  const [recommendationMessage, setRecommendationMessage] = useState("");
  const [points, setPoints] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [bestAssessmentScore, setBestAssessmentScore] = useState(0);
  const [assessmentPassed, setAssessmentPassed] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const showTasks = (topic = "Alle oppgaver") => {
    setSelectedTopic(topic);
    setCatalogTab("tasks");
    setView("tasks");
  };

  const visibleTasks =
    selectedTopic === "Alle oppgaver"
      ? tasks
      : tasks.filter((task) => task.topic === selectedTopic);
  const visibleResources =
    selectedTopic === "Alle oppgaver"
      ? resources
      : resources.filter((resource) => resource.topic === selectedTopic);
  const currentQuestion = quizQuestions[questionIndex];
  const isCorrectAnswer = answerWasCorrect === true;
  const formattedTime = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (
      dialog !== "test" ||
      testComplete ||
      answer !== null ||
      timeExpired
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      const deadline = questionDeadline.current;
      if (deadline === null) return;

      const secondsLeft = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      );
      setRemainingSeconds(secondsLeft);

      if (secondsLeft === 0) {
        questionDeadline.current = null;
        setTimeExpired(true);
        setAnswerWasCorrect(false);
        setEarnedPoints(0);
        setMissedTopics((current) => [...current, currentQuestion.topic]);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, [answer, currentQuestion.topic, dialog, testComplete, timeExpired]);

  useEffect(() => {
    if (
      !testComplete ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    confetti({
      particleCount: 110,
      spread: 76,
      startVelocity: 38,
      gravity: 0.9,
      origin: { x: 0.5, y: 0.62 },
      colors: ["#c8f37b", "#c7c9f8", "#72dc77", "#f4e79f", "#ff887a"],
    });
  }, [testComplete]);

  const startTest = () => {
    setView("test");
    setQuestionIndex(0);
    setCorrectAnswers(0);
    setTestComplete(false);
    setMissedTopics([]);
    setAnswer(null);
    setDraftAnswer("");
    setAnswerWasCorrect(null);
    setEarnedPoints(0);
    setQuizPoints(0);
    setRemainingSeconds(MAX_TASK_TIME_SECONDS);
    setTimeExpired(false);
    setAssessmentPassed(false);
    questionDeadline.current = Date.now() + MAX_TASK_TIME_SECONDS * 1000;
    setDialog("test");
  };

  const chooseAnswer = (response: string, isCorrect: boolean) => {
    if (answer !== null || timeExpired || questionDeadline.current === null)
      return;

    const secondsLeft = Math.max(
      0,
      Math.ceil((questionDeadline.current - Date.now()) / 1000),
    );
    if (secondsLeft === 0) {
      setRemainingSeconds(0);
      setTimeExpired(true);
      setAnswerWasCorrect(false);
      setEarnedPoints(0);
      setMissedTopics((current) => [...current, currentQuestion.topic]);
      questionDeadline.current = null;
      return;
    }

    questionDeadline.current = null;
    setRemainingSeconds(secondsLeft);
    setAnswerWasCorrect(isCorrect);
    const score = isCorrect
      ? Math.ceil((MAX_TASK_POINTS * secondsLeft) / MAX_TASK_TIME_SECONDS)
      : 0;
    setEarnedPoints(score);

    if (isCorrect) {
      setCorrectAnswers((current) => current + 1);
      setQuizPoints((current) => current + score);
      setPoints((current) => current + score);
    } else {
      setMissedTopics((current) => [...current, currentQuestion.topic]);
    }
    setAnswer(response);
  };

  const nextQuestion = () => {
    if (questionIndex === quizQuestions.length - 1) {
      const passed = correctAnswers >= REQUIRED_CORRECT_FOR_LEVEL_TWO;
      const practiceTopics = [...new Set(missedTopics)];
      const matchedTasks = practiceTopics
        .map((topic) => tasks.find((task) => task.topic === topic))
        .filter((task): task is (typeof tasks)[number] => task !== undefined);
      const nextRecommendations = matchedTasks.length
        ? matchedTasks
        : tasks.filter((task) => task.topic === "Server og tjenester");

      setRecommendedTasks(nextRecommendations);
      setRecommendationMessage(
        matchedTasks.length
          ? "Nova har funnet oppgaver i temaene du kan øve litt mer på."
          : "Full pott! Nova foreslår et nytt tema du kan utforske videre.",
      );
      setBestAssessmentScore((best) => Math.max(best, correctAnswers));
      setAssessmentPassed(passed);
      if (passed) setPlayerLevel((level) => Math.max(level, 2));
      setTestComplete(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setAnswer(null);
    setDraftAnswer("");
    setAnswerWasCorrect(null);
    setEarnedPoints(0);
    setRemainingSeconds(MAX_TASK_TIME_SECONDS);
    setTimeExpired(false);
    questionDeadline.current = Date.now() + MAX_TASK_TIME_SECONDS * 1000;
  };

  const closeDialog = () => {
    if (dialog === "test" && testComplete) setView("home");
    setDialog(null);
    setSelectedTask(null);
    setSelectedResource(null);
    setAnswer(null);
    setTestComplete(false);
    questionDeadline.current = null;
  };

  const openTask = (task: (typeof tasks)[number]) => {
    setView("home");
    setDialog(null);
    setSelectedTask(task);
  };

  const recommendationReason = (task: (typeof tasks)[number]) =>
    missedTopics.includes(task.topic)
      ? `Kartleggingen viser at du kan øve mer på ${task.topic.toLowerCase()}.`
      : `Et nytt tema å utforske etter den gode innsatsen din.`;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#hjem"
          onClick={() => setView("home")}
          aria-label="nodeQuest hjem"
        >
          <span className="brand-mark">
            <img src={appLogo} alt="" />
          </span>
          <span>
            node<span>Quest</span>
          </span>
        </a>

        <div className="sidebar-scroll">
          <div className="nav-section">
            <p className="nav-heading">Læringsløype</p>
            <button
              className={`nav-item ${view === "home" ? "is-active" : ""}`}
              onClick={() => setView("home")}
            >
              <Layers3 size={17} />
              <span>Oversikt</span>
            </button>
          </div>

          <div className="nav-section">
            <p className="nav-heading">
              Temaer <span className="nav-count">{String(topics.length).padStart(2, "0")}</span>
            </p>
            {topics.map(({ label, icon: Icon, color }) => (
              <button
                className={`nav-item ${view === "tasks" && selectedTopic === label ? "is-active" : ""}`}
                key={label}
                onClick={() => showTasks(label)}
              >
                <span className={`nav-icon ${color}`}>
                  <Icon size={15} />
                </span>
                <span>{label}</span>
                <ChevronRight className="nav-chevron" size={14} />
              </button>
            ))}
          </div>

          <div className="nav-section">
            <p className="nav-heading">Tren på</p>
            <button
              className={`nav-item ${view === "test" ? "is-active" : ""}`}
              onClick={startTest}
            >
              <span className="nav-icon lilac">
                <GraduationCap size={15} />
              </span>
              <span>Lærlingetest</span>
            </button>
            <button
              className={`nav-item ${view === "tasks" && selectedTopic === "Alle oppgaver" ? "is-active" : ""}`}
              onClick={() => showTasks()}
            >
              <span className="nav-icon yellow">
                <Zap size={15} />
              </span>
              <span>Alle oppgaver</span>
            </button>
            <button
              className={`nav-item ${view === "nova" ? "is-active" : ""}`}
              onClick={() => setView("nova")}
            >
              <span className="nav-icon mint">
                <Sparkles size={15} />
              </span>
              <span>Nova</span>
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="streak-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <strong>Fin flyt!</strong>
            <span>Du har øvd 3 dager på rad</span>
          </div>
          <ArrowUpRight size={16} />
        </div>
      </aside>

      <main id="hjem" className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>VG1 &amp; VG2</span>
            <ChevronRight size={14} />
            <strong>
              {view === "tasks"
                ? "Oppgaver"
                : view === "nova"
                  ? "Om Nova"
                  : view === "test"
                    ? "Lærlingetest"
                    : "Min læringsside"}
            </strong>
          </div>
          <div className="top-actions">
            <div className="level-pill">
              <span className="level-dot" /> NIVÅ <strong>{String(playerLevel).padStart(2, "0")}</strong>
            </div>
            <div className="points-pill">
              <span className="coin">✦</span>
              <span>POENG</span>
              <strong>{points}</strong>
            </div>
            <button className="shop-button" onClick={() => setDialog("store")}>
              <ShoppingBag size={16} /> Butikk
            </button>
            <button className="profile-button" aria-label="Elevprofil">
              <img
                src={novaImage}
                alt=""
              />
              <span>Nova</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </header>

        {view === "home" ? (
          <section className="dashboard">
            <div className="welcome-row">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> {today.toUpperCase()}
                </p>
                <h1>
                  Klar for neste nivå,
                  <br />
                  <span>Nova?</span>
                </h1>
                <p className="welcome-copy">
                  Små steg bygger stor kompetanse. Hva har du lyst til å
                  utforske i dag?
                </p>
              </div>
              <div className="daily-badge">
                <span className="badge-spark">
                  <Sparkles size={20} />
                </span>
                <span>
                  <strong>DAGENS MÅL</strong>
                  <small>1 av 3 oppgaver fullført</small>
                </span>
                <div className="badge-progress">
                  <i />
                </div>
              </div>
            </div>

            <div className="hero-board">
              <div className="board-grid" aria-hidden="true" />
              <div className="hero-kicker">
                <span className="live-dot" /> DITT NESTE OPPDRAG
              </div>
              <div className="hero-content">
                <div className="avatar-wrap">
                  <span className="avatar-spark spark-one">
                    <Sparkles size={16} />
                  </span>
                  <span className="avatar-spark spark-two">
                    <span>✳</span>
                  </span>
                  <img
                    className="hero-avatar"
                    src={novaImage}
                    alt="Nova, læringsguiden din"
                  />
                  <span className="avatar-status">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </div>
                <div className="hero-copy">
                  <span className="hero-label">HEI, NOVA</span>
                  <h2>
                    {recommendedTasks.length
                      ? "Jeg har funnet noe for deg!"
                      : "Hei, jeg er Nova."}
                  </h2>
                  <p>
                    {recommendedTasks.length
                      ? recommendationMessage
                      : "Jeg viser deg oppgaver og ressurser som hjelper deg å bli tryggere i IT og medier."}
                  </p>
                </div>
                <div className="hero-actions">
                  <button
                    className="action-card test-card"
                    onClick={startTest}
                  >
                    <span className="action-icon">
                      <GraduationCap size={21} />
                    </span>
                    <span className="action-text">
                      <small>FINN UT HVA DU KAN</small>
                      <strong>Ta en lærlingetest</strong>
                    </span>
                    <ArrowUpRight className="action-arrow" size={18} />
                  </button>
                  <button
                    className="action-card tasks-card"
                    onClick={() =>
                      recommendedTasks.length
                        ? openTask(recommendedTasks[0])
                        : showTasks()
                    }
                  >
                    <span className="action-icon">
                      <Play size={19} fill="currentColor" />
                    </span>
                    <span className="action-text">
                      <small>
                        {recommendedTasks.length
                          ? "NOVAS ANBEFALING"
                          : `VELG BLANT ${tasks.length} OPPGAVER`}
                      </small>
                      <strong>
                        {recommendedTasks.length
                          ? "Start med dette forslaget"
                          : "Se alle oppgavene"}
                      </strong>
                    </span>
                    <ArrowUpRight className="action-arrow" size={18} />
                  </button>
                </div>
              </div>
              <div className="board-foot">
                <span>
                  <Zap size={14} /> LÆR. PRØV. MESTRE.
                </span>
                <span>
                  01 <i /> 03
                </span>
              </div>
            </div>

            {recommendedTasks.length > 0 && (
              <section className="recommendation-section" aria-labelledby="recommendations-title">
                <div className="recommendation-heading">
                  <img src={novaImage} alt="" />
                  <div>
                    <p className="eyebrow">NOVA ANBEFALER</p>
                    <h2 id="recommendations-title">Oppgaver som passer for deg</h2>
                    <p>{recommendationMessage}</p>
                  </div>
                </div>
                <div className="recommendation-list">
                  {recommendedTasks.map((task) => {
                    const Icon = task.icon;
                    return (
                      <button
                        className="recommendation-card"
                        key={task.title}
                        onClick={() => openTask(task)}
                      >
                        <span className={`task-icon ${task.color}`}>
                          <Icon size={20} />
                        </span>
                        <span className="recommendation-card-copy">
                          <small>{task.topic} · Maks. {MAX_TASK_TIME_MINUTES} min</small>
                          <strong>{task.title}</strong>
                          <span>{recommendationReason(task)}</span>
                        </span>
                        <ArrowUpRight size={17} />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <div className="below-grid">
              <section className="continue-section">
                <div className="section-title">
                  <div>
                    <p className="eyebrow">FORTSETT DER DU SLAPP</p>
                    <h2>Plukk opp tråden</h2>
                  </div>
                  <button className="text-link" onClick={() => showTasks()}>
                    Se alle oppgaver <ArrowUpRight size={15} />
                  </button>
                </div>
                <button
                  className="continue-card"
                  onClick={() => setSelectedTask(tasks[0])}
                >
                  <span className="continue-icon">
                    <Code2 size={20} />
                  </span>
                  <span className="continue-info">
                    <strong>Bygg din første nettside</strong>
                    <small>
                      <span>HTML, CSS og JavaScript</span>
                      <i /> Maks. {MAX_TASK_TIME_MINUTES} min
                    </small>
                    <span className="progress-track">
                      <i />
                    </span>
                  </span>
                  <span className="continue-xp">Maks. {MAX_TASK_POINTS} poeng</span>
                  <ChevronRight size={17} />
                </button>
              </section>
              <section className="level-card">
                <div className="level-card-top">
                  <span className="trophy-icon">
                    <Trophy size={18} />
                  </span>
                  <span className="level-chip">NIVÅ {String(playerLevel).padStart(2, "0")}</span>
                </div>
                <div className="level-card-copy">
                  <strong>{playerLevel === 1 ? "Digital oppdager" : "Teknologisk utforsker"}</strong>
                  <span>
                    {playerLevel >= 2
                      ? "Kartlegging bestått"
                      : `${bestAssessmentScore} av ${quizQuestions.length} riktige · ${LEVEL_TWO_PASS_PERCENT} % for nivå 2`}
                  </span>
                </div>
                <div className="xp-track" role="progressbar" aria-label="Kartleggingsresultat mot nivå 2" aria-valuemin={0} aria-valuemax={quizQuestions.length} aria-valuenow={bestAssessmentScore}>
                  <i style={{ width: `${(bestAssessmentScore / quizQuestions.length) * 100}%` }} />
                </div>
                <div className="xp-caption">
                  <span>{bestAssessmentScore} av {quizQuestions.length} riktige</span>
                  <span>{LEVEL_TWO_PASS_PERCENT} % kreves</span>
                </div>
              </section>
            </div>
          </section>
        ) : view === "nova" ? (
          <section className="nova-page">
            <button className="back-link" onClick={() => setView("home")}>
              <ArrowLeft size={15} /> Til oversikten
            </button>
            <div className="nova-story-hero">
              <div className="nova-portraits" aria-label="Nova og Amanda">
                <div className="nova-character nova-character-nova">
                  <img src={novaImage} alt="Nova" />
                  <span>Nova</span>
                </div>
                <div className="nova-character nova-character-amanda">
                  <img src={amandaImage} alt="Amanda" />
                  <span>Amanda</span>
                </div>
              </div>
              <div className="nova-story-copy">
                <p className="eyebrow"><span className="eyebrow-line" /> HISTORIEN MIN</p>
                <h1>Hei, jeg er Nova.</h1>
                <p className="nova-intro">
                  På fritiden liker jeg å høre på musikk, game og spille sjakk.
                  Musikk hjelper meg å koble av, gaming tar meg med inn i nye
                  verdener, og sjakk får meg til å tenke flere trekk fram.
                </p>
                <p>
                  En dag viste jeg Amanda hvordan teknologien fungerer. Hun
                  syntes det var spennende å se hvordan alt henger sammen, og
                  fikk lyst til å prøve selv. Nå liker vi å utforske nye ting
                  sammen.
                </p>
                <p>
                  Jeg valgte informatikk og medie fordi jeg synes det er gøy å
                  lage ting selv. Jeg liker spesielt godt å lage logoer og se
                  en idé bli til noe andre kan bruke.
                </p>
                <p>
                  Samtidig lærer jeg ferdigheter som kan åpne døra til en jobb
                  i IT-bransjen. I framtiden håper jeg å jobbe med teknologi og
                  kreative digitale løsninger.
                </p>
                <button className="primary-button nova-cta" onClick={() => showTasks()}>
                  Bli med på en oppgave <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
            <section className="nova-interests" aria-labelledby="nova-interests-title">
              <div className="nova-section-heading">
                <p className="eyebrow">NÅR JEG IKKE KODER</p>
                <h2 id="nova-interests-title">Ting jeg liker</h2>
              </div>
              <div className="nova-interest-grid">
                <article className="nova-interest music-interest">
                  <span><Music2 size={21} /></span>
                  <h3>Musikk</h3>
                  <p>En god spilleliste gjør nesten alt litt bedre.</p>
                </article>
                <article className="nova-interest gaming-interest">
                  <span><Gamepad2 size={21} /></span>
                  <h3>Gaming</h3>
                  <p>Jeg liker å utforske verdener og løse utfordringer.</p>
                </article>
                <article className="nova-interest chess-interest">
                  <span><Brain size={21} /></span>
                  <h3>Sjakk</h3>
                  <p>Det er gøy å planlegge, tenke smart og lære av hvert trekk.</p>
                </article>
                <article className="nova-interest design-interest">
                  <span><Palette size={21} /></span>
                  <h3>Logodesign</h3>
                  <p>Jeg liker å gjøre ideer om til tydelige visuelle uttrykk.</p>
                </article>
              </div>
            </section>
            <div className="nova-shared-reading">
              <BookOpen size={22} />
              <div>
                <p className="eyebrow">NOE VI BEGGE LIKER</p>
                <p><strong>Fantasy og science fiction.</strong> Vi liker historier med nye verdener, framtidsteknologi og oppfinnelser.</p>
              </div>
            </div>
            <div className="nova-future">
              <Code2 size={21} />
              <p><strong>Drømmen min?</strong> Å bruke kreativitet og teknologi i en jobb i IT-bransjen.</p>
            </div>
          </section>
        ) : view === "tasks" ? (
          <section className="catalog-page">
            <button className="back-link" onClick={() => setView("home")}>
              <ArrowLeft size={15} /> Til oversikten
            </button>
            <div className="catalog-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> LÆRINGSLØYPE
                </p>
                <h1>
                  {catalogTab === "resources"
                    ? "Ressurser"
                    : selectedTopic === "Alle oppgaver"
                    ? "Oppgaver"
                    : selectedTopic}
                </h1>
                <p className="welcome-copy">
                  {catalogTab === "resources"
                    ? "Korte guider og fagnotater du kan slå opp når du trenger dem."
                    : "Velg en oppgave og bygg ferdighetene dine, ett oppdrag om gangen."}
                </p>
              </div>
              <div className="catalog-stats">
                <span>
                  <BookOpen size={17} />{" "}
                  <strong>
                    {catalogTab === "resources"
                      ? visibleResources.length
                      : visibleTasks.length}
                  </strong>{" "}
                  {catalogTab === "resources" ? "ressurser" : "oppgaver"}
                </span>
                <span>
                  <Trophy size={17} /> Poeng for innsats
                </span>
              </div>
            </div>
            <div className="catalog-tabs">
              <button
                className={catalogTab === "tasks" ? "tab-active" : ""}
                onClick={() => setCatalogTab("tasks")}
              >
                Oppgaver <span>{visibleTasks.length}</span>
              </button>
              <button
                className={catalogTab === "resources" ? "tab-active" : ""}
                onClick={() => setCatalogTab("resources")}
              >
                Ressurser <span>{visibleResources.length}</span>
              </button>
            </div>
            {catalogTab === "tasks" ? visibleTasks.length ? (
              <div className="task-grid">
                {visibleTasks.map(
                  ({
                    title,
                    topic,
                    description,
                    level,
                    icon: Icon,
                    color,
                  }) => (
                    <article className="task-card" key={title}>
                      <div className="task-card-top">
                        <span className={`task-icon ${color}`}>
                          <Icon size={21} />
                        </span>
                        <span className="task-xp">Maks. {MAX_TASK_POINTS} poeng</span>
                      </div>
                      <p className="task-topic">{topic}</p>
                      <h2>{title}</h2>
                      <p className="task-description">{description}</p>
                      <div className="task-meta">
                        <span>{level}</span>
                        <i />
                        <span>Maks. tid: {MAX_TASK_TIME_MINUTES} min</span>
                      </div>
                      <button
                        className="task-open"
                        onClick={() =>
                          setSelectedTask(
                            tasks.find((task) => task.title === title) ?? null,
                          )
                        }
                      >
                        Åpne oppgave <ArrowUpRight size={15} />
                      </button>
                    </article>
                  ),
                )}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">
                  <BookOpen size={23} />
                </span>
                <h2>Flere oppdrag er på vei</h2>
                <p>
                  Det finnes ingen oppgaver i dette temaet ennå. Velg et annet
                  tema mens vi fyller på.
                </p>
                <button className="text-link" onClick={() => showTasks()}>
                  Se alle oppgaver <ArrowUpRight size={15} />
                </button>
              </div>
            ) : visibleResources.length ? (
              <div className="task-grid resource-grid">
                {visibleResources.map(({ title, topic, description, format, icon: Icon, color }) => (
                  <article className="task-card" key={title}>
                    <div className="task-card-top">
                      <span className={`task-icon ${color}`}><Icon size={21} /></span>
                      <span className="task-xp resource-format">{format}</span>
                    </div>
                    <p className="task-topic">{topic}</p>
                    <h2>{title}</h2>
                    <p className="task-description">{description}</p>
                    <div className="task-meta"><BookOpen size={13} /><span>Fagressurs</span></div>
                    <button className="task-open" onClick={() => setSelectedResource(resources.find((resource) => resource.title === title) ?? null)}>
                      Les ressursen <ArrowUpRight size={15} />
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><BookOpen size={23} /></span>
                <h2>Flere ressurser er på vei</h2>
                <p>Det finnes ingen ressurser i dette temaet ennå. Velg et annet tema mens vi fyller på.</p>
                <button className="text-link" onClick={() => setSelectedTopic("Alle oppgaver")}>Se alle ressurser <ArrowUpRight size={15} /></button>
              </div>
            )}
            <div className="resource-note">
              <span>
                <Lightbulb size={17} />
              </span>
              <p>
                <strong>Lærer du best på din måte?</strong> Oppgavene er laget
                for å kunne bygges ut med nye temaer, ressurser og nivåer.
              </p>
              <BadgeCheck size={18} />
            </div>
          </section>
        ) : (
          <section className="catalog-page">
            <button className="back-link" onClick={() => setView("home")}>
              <ArrowLeft size={15} /> Til oversikten
            </button>
            <div className="empty-state test-intro">
              <span className="empty-icon">
                <GraduationCap size={24} />
              </span>
              <p className="eyebrow">KARTLEGG KOMPETANSEN DIN</p>
              <h1>Lærlingetest</h1>
              <p>
                En liten smakebit på fagstoffet. Svar på spørsmålet og se hva du
                kan.
              </p>
              <button
                className="primary-button"
                onClick={startTest}
              >
                <Play size={16} fill="currentColor" /> Start testen
              </button>
            </div>
          </section>
        )}
        <footer className="app-footer">
          <span>
            nodeQuest <i /> Lær gjennom å gjøre
          </span>
          <button onClick={() => setDialog("store")}>
            <CircleHelp size={14} /> Hjelp
          </button>
          <ArrowDownRight size={14} />
        </footer>
      </main>

      {(dialog || selectedTask || selectedResource) && (
        <div className="modal-backdrop" onClick={closeDialog}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeDialog}
              aria-label="Lukk"
            >
              <X size={19} />
            </button>
            {dialog === "test" ? (
              testComplete ? (
                <>
                  <span className="modal-icon test-modal-icon">
                    <Trophy size={22} />
                  </span>
                  <p className="eyebrow">KARTLEGGING · FULLFØRT</p>
                  <h2 id="modal-title">{assessmentPassed ? "Du er på nivå 2!" : "Bra jobba!"}</h2>
                  <p className="modal-lead">
                    Du fikk {correctAnswers} av {quizQuestions.length} riktige og samlet {quizPoints} poeng.
                  </p>
                  <p className={`level-result ${assessmentPassed ? "passed" : ""}`} role="status">
                    {assessmentPassed
                      ? "Du svarte riktig på minst 90 % av kartleggingen. Nivå 2 er låst opp!"
                      : `Du trenger minst ${REQUIRED_CORRECT_FOR_LEVEL_TWO} av ${quizQuestions.length} riktige (${LEVEL_TWO_PASS_PERCENT} %) for å nå nivå 2.`}
                  </p>
                  <div className="result-recommendations">
                    <strong>{recommendationMessage}</strong>
                    {recommendedTasks.map((task) => {
                      const Icon = task.icon;
                      return (
                        <button
                          className="result-recommendation"
                          key={task.title}
                          onClick={() => openTask(task)}
                        >
                          <span className={`task-icon ${task.color}`}>
                            <Icon size={17} />
                          </span>
                          <span>
                            <small>{task.topic} · Maks. {MAX_TASK_TIME_MINUTES} min</small>
                            <b>{task.title}</b>
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      );
                    })}
                  </div>
                  <button className="primary-button" onClick={closeDialog}>
                    Tilbake til oversikten <Check size={16} />
                  </button>
                </>
              ) : (
                <>
                <span className="modal-icon test-modal-icon">
                  <CircleHelp size={22} />
                </span>
                <p className="eyebrow">OPPGAVE {questionIndex + 1} AV {quizQuestions.length}</p>
                <h2 className="question-title" id="modal-title">{currentQuestion.question}</h2>
                <p className="modal-lead">
                  Velg riktig svar eller skriv inn svaret ditt. Feil svar gir 0 poeng.
                </p>
                <div className={`question-timer ${remainingSeconds <= 60 ? "is-warning" : ""}`}>
                  <div className="timer-label"><span><Clock3 size={18} /> Maks. tid for poeng</span><strong>{formattedTime}</strong></div>
                  <div className="timer-track" role="progressbar" aria-label="Tid igjen" aria-valuemin={0} aria-valuemax={MAX_TASK_TIME_SECONDS} aria-valuenow={remainingSeconds}>
                    <span style={{ width: `${(remainingSeconds / MAX_TASK_TIME_SECONDS) * 100}%` }} />
                  </div>
                  <span className="timer-hint">Riktig svar gir opptil {MAX_TASK_POINTS} poeng, avhengig av tiden du bruker.</span>
                </div>
                {currentQuestion.answerType === "choice" ? (
                  <div className="answer-list">
                    {currentQuestion.choices.map((choice, index) => (
                      <button
                        className={`answer-option ${answer === choice ? (index === currentQuestion.correctIndex ? "is-correct" : "is-wrong") : ""}`}
                        disabled={answer !== null || timeExpired}
                        key={choice}
                        onClick={() => chooseAnswer(choice, index === currentQuestion.correctIndex)}
                      >
                        <span className="answer-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {choice}
                        {answer === choice &&
                          (index === currentQuestion.correctIndex ? <Check size={18} /> : <X size={18} />)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form className="text-answer-form" onSubmit={(event) => {
                    event.preventDefault();
                    const response = draftAnswer.trim();
                    if (!response) return;
                    const isCorrect = currentQuestion.acceptedAnswers.some(
                      (accepted) => accepted.localeCompare(response, "nb-NO", { sensitivity: "base" }) === 0,
                    );
                    chooseAnswer(response, isCorrect);
                  }}>
                    <label htmlFor="written-answer">Skriv svaret</label>
                    <input
                      id="written-answer"
                      autoComplete="off"
                      value={draftAnswer}
                      onChange={(event) => setDraftAnswer(event.target.value)}
                      disabled={answer !== null || timeExpired}
                      placeholder="Skriv svaret ditt her"
                    />
                    <button className="primary-button" type="submit" disabled={!draftAnswer.trim() || answer !== null || timeExpired}>
                      Svar <Check size={18} />
                    </button>
                  </form>
                )}
                {(answer !== null || timeExpired) && (
                  <p
                    className={`answer-feedback ${isCorrectAnswer ? "correct" : ""}`}
                    role="status"
                  >
                    {timeExpired
                      ? `Tiden er ute. Du får 0 poeng. ${currentQuestion.explanation}`
                      : isCorrectAnswer
                        ? `Helt riktig! ${currentQuestion.explanation} Du får ${earnedPoints} poeng.`
                        : `Feil svar. Du får 0 poeng. ${currentQuestion.explanation}`}
                  </p>
                )}
                {(answer !== null || timeExpired) && (
                  <div className="quiz-next">
                    <span>{correctAnswers} riktige · {quizPoints} poeng</span>
                    <button className="primary-button" onClick={nextQuestion}>
                      {questionIndex === quizQuestions.length - 1 ? "Se resultat" : "Til neste oppgave"}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
              )
            ) : dialog === "store" ? (
              <>
                <span className="modal-icon store-modal-icon">
                  <ShoppingBag size={21} />
                </span>
                <p className="eyebrow">NODEQUEST-BUTIKKEN</p>
                <h2 id="modal-title">Gjør læringsløypa til din</h2>
                <p className="modal-lead">
                  Bruk poengene du har tjent på små oppgraderinger.
                </p>
                <div className="store-item">
                  <span className="store-art">
                    <Sparkles size={24} />
                  </span>
                  <span>
                    <strong>Stjernehimmel-tema</strong>
                    <small>Et nytt uttrykk for profilen din</small>
                  </span>
                  <button
                    disabled={purchased || points < 80}
                    onClick={() => {
                      setPoints((current) => current - 80);
                      setPurchased(true);
                    }}
                  >
                    {purchased ? "Kjøpt" : "✦ 80"}
                  </button>
                </div>
                {purchased && (
                  <p className="answer-feedback correct">
                    Temaet er låst opp. Godt brukt!
                  </p>
                )}
                <div className="store-balance">
                  <span>Din saldo</span>
                  <strong>✦ {points} poeng</strong>
                </div>
              </>
            ) : selectedTask ? (
              <>
                <span className="modal-icon task-modal-icon">
                  <selectedTask.icon size={21} />
                </span>
                <p className="eyebrow">
                  {selectedTask.topic.toUpperCase()} · MAKS. TID {MAX_TASK_TIME_MINUTES} MIN
                </p>
                <h2 id="modal-title">{selectedTask.title}</h2>
                <p className="modal-lead">{selectedTask.description}</p>
                <div className="task-goal">
                  <strong>
                    <Lightbulb size={16} /> Dette skal du øve på
                  </strong>
                  <p>
                    Bruk fagbegrepene riktig, prøv deg fram, og tenk gjennom
                    hvorfor løsningen fungerer. Du kan gå tilbake til oppgaven
                    når som helst.
                  </p>
                </div>
                <div className="modal-footer">
                  <span>
                    Poeng ved riktig svar <strong>inntil {MAX_TASK_POINTS} poeng</strong>
                  </span>
                  <button className="primary-button" onClick={closeDialog}>
                    Klart <Check size={16} />
                  </button>
                </div>
              </>
            ) : selectedResource ? (
              <>
                <span className="modal-icon task-modal-icon">
                  <selectedResource.icon size={21} />
                </span>
                <p className="eyebrow">
                  {selectedResource.format} · {selectedResource.topic.toUpperCase()}
                </p>
                <h2 id="modal-title">{selectedResource.title}</h2>
                <p className="modal-lead">{selectedResource.description}</p>
                <div className="task-goal">
                  <strong>
                    <BookOpen size={16} /> Kort fortalt
                  </strong>
                  <p>{selectedResource.content}</p>
                </div>
                <div className="modal-footer">
                  <span>Ressurs <strong>{selectedResource.format}</strong></span>
                  <button className="primary-button" onClick={closeDialog}>
                    Ferdig <Check size={16} />
                  </button>
                </div>
              </>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
