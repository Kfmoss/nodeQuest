import { useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Database,
  Gamepad2,
  GraduationCap,
  Layers3,
  Lightbulb,
  Monitor,
  Play,
  Server,
  ShoppingBag,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const topics = [
  { label: "HTML, CSS og JavaScript", icon: Code2, color: "mint" },
  { label: "Feilsøking", icon: Lightbulb, color: "yellow" },
  { label: "Server og tjenester", icon: Server, color: "coral" },
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

const quizQuestions = [
  {
    question: "Hva brukes HTML til?",
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
    choices: [
      "Lagrer nettsidens filer på en server",
      "Bestemmer hvordan nettsiden ser ut",
      "Oversetter domenenavn til IP-adresser",
    ],
    correctIndex: 1,
    explanation: "CSS brukes til å style og plassere innhold på nettsiden.",
  },
  {
    question: "Hva hjelper Git deg med?",
    choices: [
      "Å skrive HTML raskere",
      "Å lage bilder til nettsiden",
      "Å holde oversikt over endringer i kode",
    ],
    correctIndex: 2,
    explanation: "Git lagrer versjonshistorikken til prosjektet ditt.",
  },
  {
    question: "Hva er en database først og fremst til for?",
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
    choices: [
      "Gjenta filnavnet til bildet",
      "Beskrive viktig informasjon i bildet",
      "Fortelle hvilken farge bildet har",
    ],
    correctIndex: 1,
    explanation: "Alternativtekst gjør innholdet i viktige bilder tilgjengelig for flere.",
  },
];

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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [points, setPoints] = useState(120);
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
  const correctAnswer = currentQuestion.choices[currentQuestion.correctIndex];
  const isCorrectAnswer = answer === correctAnswer;

  const startTest = () => {
    setView("test");
    setQuestionIndex(0);
    setCorrectAnswers(0);
    setTestComplete(false);
    setAnswer(null);
    setDialog("test");
  };

  const chooseAnswer = (choice: string, index: number) => {
    if (answer !== null) return;
    if (index === currentQuestion.correctIndex) {
      setPoints((current) => current + 10);
      setCorrectAnswers((current) => current + 1);
    }
    setAnswer(choice);
  };

  const nextQuestion = () => {
    if (questionIndex === quizQuestions.length - 1) {
      setTestComplete(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setAnswer(null);
  };

  const closeDialog = () => {
    setDialog(null);
    setSelectedTask(null);
    setSelectedResource(null);
    setAnswer(null);
    setTestComplete(false);
  };

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
            <Gamepad2 size={21} strokeWidth={2.5} />
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
              Temaer <span className="nav-count">05</span>
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
                : view === "test"
                  ? "Lærlingetest"
                  : "Min læringsside"}
            </strong>
          </div>
          <div className="top-actions">
            <div className="level-pill">
              <span className="level-dot" /> NIVÅ <strong>04</strong>
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
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80"
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
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=360&h=360&q=85"
                    alt="Nova, læringsguiden din"
                  />
                  <span className="avatar-status">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </div>
                <div className="hero-copy">
                  <span className="hero-label">HEI, NOVA</span>
                  <h2>
                    Du er bare én oppgave
                    <br />
                    unna en ny streak.
                  </h2>
                  <p>
                    Velg en løype, test det du kan, og samle poeng underveis.
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
                    onClick={() => showTasks()}
                  >
                    <span className="action-icon">
                      <Play size={19} fill="currentColor" />
                    </span>
                    <span className="action-text">
                      <small>VELG BLANT {tasks.length} OPPGAVER</small>
                      <strong>Direkte til oppgavene</strong>
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
                      <i /> 10 min
                    </small>
                    <span className="progress-track">
                      <i />
                    </span>
                  </span>
                  <span className="continue-xp">+25 XP</span>
                  <ChevronRight size={17} />
                </button>
              </section>
              <section className="level-card">
                <div className="level-card-top">
                  <span className="trophy-icon">
                    <Trophy size={18} />
                  </span>
                  <span className="level-chip">NIVÅ 04</span>
                </div>
                <div className="level-card-copy">
                  <strong>Digital oppdager</strong>
                  <span>80 XP igjen til nivå 5</span>
                </div>
                <div className="xp-track">
                  <i />
                </div>
                <div className="xp-caption">
                  <span>420 XP</span>
                  <span>500 XP</span>
                </div>
              </section>
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
                    minutes,
                    xp,
                    icon: Icon,
                    color,
                  }) => (
                    <article className="task-card" key={title}>
                      <div className="task-card-top">
                        <span className={`task-icon ${color}`}>
                          <Icon size={21} />
                        </span>
                        <span className="task-xp">+{xp} XP</span>
                      </div>
                      <p className="task-topic">{topic}</p>
                      <h2>{title}</h2>
                      <p className="task-description">{description}</p>
                      <div className="task-meta">
                        <span>{level}</span>
                        <i />
                        <span>{minutes} min</span>
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
                  <p className="eyebrow">LÆRLINGETEST · FULLFØRT</p>
                  <h2 id="modal-title">Bra jobba!</h2>
                  <p className="modal-lead">
                    Du fikk {correctAnswers} av {quizQuestions.length} riktige og samlet {correctAnswers * 10} poeng.
                  </p>
                  <button className="primary-button" onClick={closeDialog}>
                    Tilbake til oversikten <Check size={16} />
                  </button>
                </>
              ) : (
                <>
                <span className="modal-icon test-modal-icon">
                  <CircleHelp size={22} />
                </span>
                <p className="eyebrow">LÆRLINGETEST · SPØRSMÅL {questionIndex + 1} AV {quizQuestions.length}</p>
                <h2 id="modal-title">{currentQuestion.question}</h2>
                <p className="modal-lead">
                  Velg det alternativet du mener er riktig.
                </p>
                <div className="answer-list">
                  {currentQuestion.choices.map((choice, index) => (
                    <button
                      className={`answer-option ${answer === choice ? (index === currentQuestion.correctIndex ? "is-correct" : "is-wrong") : ""}`}
                      disabled={answer !== null}
                      key={choice}
                      onClick={() => chooseAnswer(choice, index)}
                    >
                      <span className="answer-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {choice}
                      {answer === choice &&
                        (index === currentQuestion.correctIndex ? <Check size={17} /> : <X size={17} />)}
                    </button>
                  ))}
                </div>
                {answer && (
                  <p
                    className={`answer-feedback ${isCorrectAnswer ? "correct" : ""}`}
                  >
                    {isCorrectAnswer
                      ? `Helt riktig! ${currentQuestion.explanation} +10 poeng`
                      : `Ikke helt. ${currentQuestion.explanation}`}
                  </p>
                )}
                {answer && (
                  <div className="quiz-next">
                    <span>{correctAnswers} av {questionIndex + 1} riktige</span>
                    <button className="primary-button" onClick={nextQuestion}>
                      {questionIndex === quizQuestions.length - 1 ? "Se resultat" : "Neste spørsmål"}
                      <ChevronRight size={16} />
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
                  {selectedTask.topic.toUpperCase()} · {selectedTask.minutes}{" "}
                  MIN
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
                    Belønning <strong>+{selectedTask.xp} XP</strong>
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
