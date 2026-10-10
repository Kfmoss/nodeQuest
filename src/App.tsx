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
import moto1Image from "./assets/moto1.png";
import moto2Image from "./assets/moto2.png";
import moto3Image from "./assets/moto3.png";
import moto4Image from "./assets/moto4.png";
import moto5Image from "./assets/moto5.png";
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

const motorcycles = [
  { id: "moto1", name: "Moto 1", style: "Touring", description: "En komfortabel turkamerat for de lange veiene.", price: 10, image: moto1Image, alt: "Rød touringmotorsykkel" },
  { id: "moto2", name: "Moto 2", style: "Cruiser", description: "Klassisk cruiser med blanke detaljer og god stil.", price: 20, image: moto2Image, alt: "Gul cruisermotorsykkel" },
  { id: "moto3", name: "Moto 3", style: "Sport", description: "En lett og rask sportssykkel med blå detaljer.", price: 30, image: moto3Image, alt: "Blå og hvit sportssykkel" },
  { id: "moto4", name: "Moto 4", style: "Racing", description: "En gul racermodell for deg som liker fart.", price: 40, image: moto4Image, alt: "Gul racermotorsykkel" },
  { id: "moto5", name: "Moto 5", style: "Custom", description: "En mørkegrønn custom med et helt eget uttrykk.", price: 50, image: moto5Image, alt: "Mørkegrønn custommotorsykkel" },
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

type Css1Exercise = {
  title: string;
  description: string;
  instructions?: string[];
  resources?: { label: string; url: string }[];
};

type AssessmentAttempt = {
  id: number;
  completedAt: string;
  correctAnswers: number;
  points: number;
  passed: boolean;
};

type SavedStudentProgress = {
  points: number;
  totalPointsEarned: number;
  assessmentHistory: AssessmentAttempt[];
  ownedMotorcycles: string[];
  playerLevel: number;
  bestAssessmentScore: number;
  assessmentPassed: boolean;
  purchased: boolean;
};

type AuthenticatedStudent = {
  id: number | string;
  brukernavn: string;
  etternavn: string;
  klasse: string;
  email: string;
};

type LoginResponse = {
  success: true;
  token: string;
  user: AuthenticatedStudent;
};

const isLoginResponse = (value: unknown): value is LoginResponse => {
  if (typeof value !== "object" || value === null || !("user" in value)) {
    return false;
  }

  const user = value.user;
  return (
    "success" in value &&
    value.success === true &&
    "token" in value &&
    typeof value.token === "string" &&
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    (typeof user.id === "number" || typeof user.id === "string") &&
    "brukernavn" in user &&
    typeof user.brukernavn === "string" &&
    "etternavn" in user &&
    typeof user.etternavn === "string" &&
    "klasse" in user &&
    typeof user.klasse === "string" &&
    "email" in user &&
    typeof user.email === "string"
  );
};

const css1Exercises: Css1Exercise[] = [
  {
    title: "CSS colors and fonts",
    description:
      "Skriv CSS-kode som endrer stylingen på overskriftene h2, h3, h4, h5 og h6. Hver overskrift i HTML-dokumentet forteller hvilken styling den skal ha. Du velger selv styling på h1.",
    instructions: [
      "h2: rød tekst.",
      "h3: blå tekst og skriftstørrelse 30px.",
      "h4: rosa tekst.",
      "h5: valgfri tekstfarge og skriftstørrelse 2em.",
      "h6: gul tekst og skriftstørrelse 3rem.",
    ],
  },
  {
    title: "Bakgrunner og CSS",
    description:
      "En bakgrunn er området bak et element. Den kan være ensfarget, et bilde eller en kombinasjon av begge. Bruk CSS-egenskapen background-color til å endre bakgrunnsfargen på et element eller hele nettsiden.",
    resources: [
      {
        label: "Les om CSS og bakgrunner på W3Schools",
        url: "https://www.w3schools.com/css/css_background.asp",
      },
    ],
  },
  {
    title: "CSS colors, fonts and text",
    description:
      "Ta utgangspunkt i HTML-koden fra lenken. Skriv CSS-kode som gir nettsiden resultatet fra oppgavearket.",
    instructions: [
      "Bruk background-color, font-family, text-decoration og text-align.",
      "På overskriften h1 skal du bruke font-family: Papyrus.",
    ],
    resources: [
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/61cfb97a0317532d00f32cb9b87ff452",
      },
      { label: "David Bau Color Tool", url: "http://davidbau.com/colors/" },
    ],
  },
  {
    title: "CSS Box Model",
    description:
      "Gjenskap nettsiden fra oppgavearket ved å bruke prinsippene i CSS Box Model.",
    instructions: [
      "Bruk HTML-dokumentet fra lenken som utgangspunkt.",
      "Skriv all CSS i en egen fil som heter styles.css. Ikke legg CSS-kode i HTML-dokumentet.",
    ],
    resources: [
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/25b07426d8042eb0fc5ec18f60163147",
      },
    ],
  },
  {
    title: "Arv og spesifisitet",
    description:
      "Ta utgangspunkt i HTML-koden fra lenken, og gjør oppgavene i styles.css.",
    instructions: [
      "a) Angi font-family, font-size og color på body. Hvilke elementer arver disse egenskapene?",
      "b) Gi body en lys blå background-color. Arves bakgrunnsfargen? Hvorfor eller hvorfor ikke?",
      "c) Legg border og litt padding på .info-boks. Hvorfor påvirker ikke disse egenskapene h2 eller p direkte?",
      "d) Overstyr arv i .fremhev ved å endre color til rød og border-color til samme rødfarge. Hvorfor ble ikke teksten i de andre seksjonene rød?",
      "e) Sett font-size: 0.9em på alle footer-elementer. Hva er forskjellen mellom em og px med tanke på arv?",
      "f) Skriv en regel som bare gjør avsnittet i header (klassen .intro) grønt. Hvordan hjelper spesifisitet deg med å overstyre arv?",
    ],
    resources: [
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/a922b6a9f445f8518331485f23800adf",
      },
    ],
  },
  {
    title: "Bakgrunnsbilde",
    description:
      "Legg til et bakgrunnsbilde på nettsiden og kontroller hvordan bildet vises, slik at resultatet ligner referansebildet i oppgavearket.",
    instructions: [
      "Last ned ZIP-filen «CSS-oppgave - Background Image», pakk den ut, og legg HTML-, CSS- og JPG-filene i en arbeidsmappe.",
      "I styles.css legger du til et bakgrunnsbilde på body.",
      "Bruk background-image, background-size, background-position, background-repeat og background-attachment.",
    ],
  },
  {
    title: "Plasser sitat i fire hjørner",
    description:
      "Fordel sitatet i fire bokser, én i hvert hjørne av nettsiden, kun ved å bruke CSS. Boksene skal beholde plasseringen når skjermen eller nettleservinduet endrer størrelse.",
    instructions: [
      "Bruk den oppgitte HTML-koden, og skriv all CSS i en ny fil som heter styles.css.",
      "Bruk fixed positioning, bredde 25 %, rammer i fire ulike farger, og 5px margin og padding på boksene.",
      "Sentrer lenken øverst på siden.",
    ],
    resources: [
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/e7e5f578da45bb31f9673d94529fb473",
      },
    ],
  },
  {
    title: "Float",
    description:
      "Bruk float i CSS til å plassere bilder ved siden av teksten. Det første bildet skal flyte til venstre for teksten, og det andre til høyre.",
    resources: [
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/1c343dd7d158c7ef4853184e7b23ad0b",
      },
      {
        label: "CSS-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/286e28f36ad91df41975f6d749e01fc1",
      },
    ],
  },
  {
    title: "Horisontal navigasjonsmeny",
    description:
      "Gjenskap den horisontale navigasjonsmenyen øverst på nettsiden ved å bruke CSS. Oppgaven handler om styling av lister og float.",
    resources: [
      {
        label: "Les om styling av lister i CSS",
        url: "https://www.w3schools.com/css/css_list.asp",
      },
      {
        label: "HTML-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/17da7a039684e55f75ab1177a88256dd",
      },
      {
        label: "CSS-kode til oppgaven",
        url: "https://gist.github.com/olec-im-bfk/f085934988c033e72f2be43388d4efe6",
      },
    ],
  },
];

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

const getStudentProfileStorageKey = (studentName: string, studentClass: string) => {
  const normalizedName = studentName
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("nb-NO");
  const normalizedClass = studentClass
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("nb-NO");

  return `nodequest:profile:${encodeURIComponent(normalizedName)}:${encodeURIComponent(normalizedClass)}`;
};

function App() {
  const today = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authToken, setAuthToken] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [view, setView] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentAttempt[]>([]);
  const [ownedMotorcycles, setOwnedMotorcycles] = useState<string[]>([]);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [bestAssessmentScore, setBestAssessmentScore] = useState(0);
  const [assessmentPassed, setAssessmentPassed] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (!studentName || !studentClass) return;

    const storageKey = getStudentProfileStorageKey(studentName, studentClass);
    const progress: SavedStudentProgress = {
      points,
      totalPointsEarned,
      assessmentHistory,
      ownedMotorcycles,
      playerLevel,
      bestAssessmentScore,
      assessmentPassed,
      purchased,
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      return;
    }
  }, [
    assessmentHistory,
    assessmentPassed,
    bestAssessmentScore,
    ownedMotorcycles,
    playerLevel,
    points,
    purchased,
    studentClass,
    studentName,
    totalPointsEarned,
  ]);

  const showTasks = (topic = "Alle oppgaver") => {
    setSelectedTopic(topic);
    setCatalogTab("tasks");
    setView("tasks");
  };

  const buyMotorcycle = (motorcycle: (typeof motorcycles)[number]) => {
    if (ownedMotorcycles.includes(motorcycle.id) || points < motorcycle.price)
      return;
    setPoints((current) => current - motorcycle.price);
    setOwnedMotorcycles((current) => [...current, motorcycle.id]);
  };

  const visibleTasks =
    selectedTopic === "Alle oppgaver"
      ? tasks
      : tasks.filter((task) => task.topic === selectedTopic);
  const showCss1 = selectedTopic === "Alle oppgaver" || selectedTopic === "HTML, CSS og JavaScript";
  const visibleTaskCount = visibleTasks.length + Number(showCss1);
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
      setTotalPointsEarned((current) => current + score);
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
      setAssessmentHistory((history) => [
        ...history,
        {
          id: Date.now(),
          completedAt: new Date().toISOString(),
          correctAnswers,
          points: quizPoints,
          passed,
        },
      ]);
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

  const startStudentSession = (user: AuthenticatedStudent, token: string) => {
    const name = `${user.brukernavn} ${user.etternavn}`;
    const storageKey = getStudentProfileStorageKey(name, user.klasse);
    const legacyStorageKey = `nodequest:profile:${name.toLocaleLowerCase("nb-NO")}`;
    setPoints(0);
    setTotalPointsEarned(0);
    setAssessmentHistory([]);
    setOwnedMotorcycles([]);
    setPlayerLevel(1);
    setBestAssessmentScore(0);
    setAssessmentPassed(false);
    setPurchased(false);

    try {
      const saved =
        window.localStorage.getItem(storageKey) ??
        window.localStorage.getItem(legacyStorageKey);
      if (saved) {
        const progress = JSON.parse(saved) as Partial<SavedStudentProgress>;
        setPoints(progress.points ?? 0);
        setTotalPointsEarned(progress.totalPointsEarned ?? 0);
        setAssessmentHistory(
          Array.isArray(progress.assessmentHistory)
            ? progress.assessmentHistory
            : [],
        );
        setOwnedMotorcycles(
          Array.isArray(progress.ownedMotorcycles)
            ? progress.ownedMotorcycles
            : [],
        );
        setPlayerLevel(progress.playerLevel ?? 1);
        setBestAssessmentScore(progress.bestAssessmentScore ?? 0);
        setAssessmentPassed(progress.assessmentPassed ?? false);
        setPurchased(progress.purchased ?? false);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }

    setStudentName(name);
    setStudentClass(user.klasse);
    setAuthToken(token);
  };

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("student-password") ?? "");

    if (authMode === "register") {
      const passwordConfirmation = String(
        formData.get("student-password-confirmation") ?? "",
      );
      if (password !== passwordConfirmation) {
        setAuthError(
          "Passordene er ikke like. Kontroller at du har skrevet dem riktig.",
        );
        return;
      }

      const firstName = String(formData.get("student-first-name") ?? "")
        .trim()
        .replace(/\s+/g, " ");
      const lastName = String(formData.get("student-last-name") ?? "")
        .trim()
        .replace(/\s+/g, " ");
      const className = String(formData.get("student-class") ?? "");
      const email = String(formData.get("student-email") ?? "").trim();

      setIsAuthenticating(true);
      try {
        const registerResponse = await fetch(
          "https://api.nodequest.org/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              brukernavn: firstName,
              etternavn: lastName,
              klasse: className,
              email,
              passord: password,
            }),
          },
        );

        if (!registerResponse.ok) {
          setAuthError(
            registerResponse.status === 409
              ? "Det finnes allerede en konto med dette navnet eller denne e-postadressen. Prøv å logge inn."
              : `Registreringen mislyktes (HTTP ${registerResponse.status}). Prøv igjen senere.`,
          );
          return;
        }

        const registrationResult: unknown = await registerResponse.json();
        if (
          typeof registrationResult !== "object" ||
          registrationResult === null ||
          !("success" in registrationResult) ||
          registrationResult.success !== true
        ) {
          setAuthError(
            "Registreringen kunne ikke bekreftes av serveren. Prøv igjen senere.",
          );
          return;
        }

        const loginResponse = await fetch("https://api.nodequest.org/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: email, passord: password }),
        });
        if (!loginResponse.ok) {
          setAuthMode("login");
          setAuthError(
            "Kontoen ble opprettet, men automatisk innlogging mislyktes. Logg inn med e-postadressen og passordet ditt.",
          );
          return;
        }

        const loginResult: unknown = await loginResponse.json();
        if (!isLoginResponse(loginResult)) {
          setAuthMode("login");
          setAuthError(
            "Kontoen ble opprettet, men serveren sendte et ugyldig innloggingssvar. Prøv å logge inn.",
          );
          return;
        }

        startStudentSession(loginResult.user, loginResult.token);
      } catch {
        setAuthError(
          "Fikk ikke kontakt med serveren. Kontroller nettforbindelsen og prøv igjen.",
        );
      } finally {
        setIsAuthenticating(false);
      }
      return;
    }

    const identifier = String(formData.get("student-identifier") ?? "").trim();
    setIsAuthenticating(true);
    try {
      const response = await fetch("https://api.nodequest.org/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, passord: password }),
      });

      if (!response.ok) {
        setAuthError(
          response.status === 401
            ? "E-post/brukernavn eller passord stemmer ikke."
            : `Innloggingen mislyktes (HTTP ${response.status}). Prøv igjen senere.`,
        );
        return;
      }

      const result: unknown = await response.json();
      if (!isLoginResponse(result)) {
        setAuthError(
          "Innloggingsserveren sendte et ugyldig svar. Prøv igjen senere.",
        );
        return;
      }

      startStudentSession(result.user, result.token);
    } catch {
      setAuthError(
        "Fikk ikke kontakt med innloggingsserveren. Kontroller nettforbindelsen og prøv igjen.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!studentName || !authToken) {
    return (
      <main className="student-gate">
        <section className="student-gate-panel" aria-labelledby="student-gate-title">
          <a className="brand student-gate-brand" href="#start" aria-label="nodeQuest">
            <span className="brand-mark">
              <img src={appLogo} alt="" />
            </span>
            <span>
              node<span>Quest</span>
            </span>
          </a>
          <p className="eyebrow">
            <span className="eyebrow-line" /> KLAR FOR Å STARTE?
          </p>
          <h1 id="student-gate-title">
            {authMode === "login" ? "LOGG INN PÅ NODEQUEST" : "REGISTRER DEG"}
          </h1>
          <p className="student-gate-copy">
            {authMode === "login"
              ? "Logg inn for å ta kartleggingstester og fortsette læringsløypa."
              : "Registrer deg for å få tilgang til kartleggingstester og resten av læringsløypa. Passordet lagres sikkert på serveren."}
          </p>
          <div className="auth-mode-switch" aria-label="Velg handling" role="group">
            <button
              type="button"
              aria-pressed={authMode === "login"}
              className={authMode === "login" ? "is-active" : ""}
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
            >
              Logg inn
            </button>
            <button
              type="button"
              aria-pressed={authMode === "register"}
              className={authMode === "register" ? "is-active" : ""}
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
              }}
            >
              Registrer deg
            </button>
          </div>
          <form className="student-registration-form" onSubmit={handleAuthSubmit}>
            <div className="student-registration-fields">
              {authMode === "register" ? (
                <>
                  <div className="student-registration-field">
                    <label htmlFor="student-first-name">NAVN</label>
                    <input
                      autoFocus
                      autoComplete="given-name"
                      id="student-first-name"
                      name="student-first-name"
                      placeholder="NAVN"
                      required
                    />
                  </div>
                  <div className="student-registration-field">
                    <label htmlFor="student-last-name">ETTERNAVN</label>
                    <input
                      autoComplete="family-name"
                      id="student-last-name"
                      name="student-last-name"
                      placeholder="ETTERNAVN"
                      required
                    />
                  </div>
                  <div className="student-registration-field">
                    <label htmlFor="student-class">KLASSE</label>
                    <select
                      id="student-class"
                      name="student-class"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Velg klasse
                      </option>
                      <option value="VG1">VG1</option>
                      <option value="VG2">VG2</option>
                    </select>
                  </div>
                  <div className="student-registration-field">
                    <label htmlFor="student-email">E-POSTADRESSE</label>
                    <input
                      autoComplete="email"
                      id="student-email"
                      name="student-email"
                      placeholder="navn@eksempel.no"
                      type="email"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="student-registration-field">
                  <label htmlFor="student-identifier">E-POST ELLER BRUKERNAVN</label>
                  <input
                    autoFocus
                    autoComplete="username"
                    id="student-identifier"
                    name="student-identifier"
                    required
                  />
                </div>
              )}
              <div className="student-registration-field">
                <label htmlFor="student-password">PASSORD</label>
                <input
                  autoComplete={
                    authMode === "register" ? "new-password" : "current-password"
                  }
                  id="student-password"
                  name="student-password"
                  type="password"
                  required
                />
              </div>
              {authMode === "register" && (
                <div className="student-registration-field">
                  <label htmlFor="student-password-confirmation">
                    BEKREFT PASSORD
                  </label>
                  <input
                    autoComplete="new-password"
                    id="student-password-confirmation"
                    name="student-password-confirmation"
                    type="password"
                    required
                  />
                </div>
              )}
            </div>
            {authError && (
              <p className="student-password-error" role="alert">
                {authError}
              </p>
            )}
            <button
              className="primary-button"
              type="submit"
              disabled={isAuthenticating}
            >
              {isAuthenticating
                ? authMode === "login"
                  ? "Logger inn..."
                  : "Oppretter konto..."
                : authMode === "login"
                  ? "Logg inn og start"
                  : "Opprett konto og start"}
              {!isAuthenticating && <ChevronRight size={18} />}
            </button>
          </form>
        </section>
      </main>
    );
  }

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

        <div className={`sidebar-scroll ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="nav-section">
            <p className="nav-heading">Læringsløype</p>
            <button
              className={`nav-item ${view === "home" ? "is-active" : ""}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setView("home");
                setMobileMenuOpen((isOpen) => !isOpen);
              }}
            >
              <Layers3 size={17} />
              <span>Oversikt</span>
            </button>
          </div>

          <div
            className={`nav-section mobile-nav-section ${mobileMenuOpen ? "is-open" : ""}`}
            id="mobile-navigation"
            aria-hidden={!mobileMenuOpen}
            inert={!mobileMenuOpen}
          >
            <button
              className={`mobile-nav-item ${view === "css1" ? "is-active" : ""}`}
              onClick={() => setView("css1")}
            >
              <span className="nav-icon blue">
                <Code2 size={16} />
              </span>
              <span>CSS1</span>
            </button>
            <button
              className={`mobile-nav-item ${view === "test" ? "is-active" : ""}`}
              onClick={startTest}
            >
              <span className="nav-icon lilac">
                <GraduationCap size={16} />
              </span>
              <span>Ta en kartleggingstest</span>
            </button>
            <button
              className={`mobile-nav-item ${view === "tasks" && selectedTopic === "Alle oppgaver" ? "is-active" : ""}`}
              onClick={() => showTasks()}
            >
              <span className="nav-icon yellow">
                <Zap size={16} />
              </span>
              <span>Alle oppgaver</span>
            </button>
            {topics.map(({ label, icon: Icon, color }) => (
              <button
                className={`mobile-nav-item ${view === "tasks" && selectedTopic === label ? "is-active" : ""}`}
                key={label}
                onClick={() => showTasks(label)}
              >
                <span className={`nav-icon ${color}`}>
                  <Icon size={16} />
                </span>
                <span>{label}</span>
              </button>
            ))}
            <button
              className={`mobile-nav-item ${view === "nova" ? "is-active" : ""}`}
              onClick={() => setView("nova")}
            >
              <span className="nav-icon mint">
                <Sparkles size={16} />
              </span>
              <span>Nova</span>
            </button>
          </div>

          <div className="nav-section desktop-nav-section">
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

          <div className="nav-section desktop-nav-section">
            <p className="nav-heading">Tren på</p>
            <button
              className={`nav-item ${view === "css1" ? "is-active" : ""}`}
              onClick={() => setView("css1")}
            >
              <span className="nav-icon blue">
                <Code2 size={15} />
              </span>
              <span>CSS1</span>
            </button>
            <button
              className={`nav-item ${view === "test" ? "is-active" : ""}`}
              onClick={startTest}
            >
              <span className="nav-icon lilac">
                <GraduationCap size={15} />
              </span>
              <span>Kartleggingstest</span>
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

      </aside>

      <main id="hjem" className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>VG1 &amp; VG2</span>
            <ChevronRight size={14} />
            <strong>
              {view === "tasks"
                ? "Oppgaver"
                : view === "shop"
                  ? "Butikk"
                  : view === "profile"
                    ? "Elevprofil"
                    : view === "nova"
                      ? "Om Nova"
                      : view === "test"
                        ? "Kartleggingstest"
                        : view === "css1"
                          ? "CSS1"
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
            <button className="shop-button" onClick={() => setView("shop")}>
              <ShoppingBag size={16} /> Butikk
            </button>
            <button
              className="profile-button"
              aria-label={`Elevprofil for ${studentName}`}
              onClick={() => setView("profile")}
            >
              <span>{studentName}</span>
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
                  <span>{studentName}?</span>
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
                      <strong>Ta en kartleggingstest</strong>
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
        ) : view === "shop" ? (
          <section className="catalog-page shop-page">
            <button className="back-link" onClick={() => setView("home")}>
              <ArrowLeft size={15} /> Til oversikten
            </button>
            <div className="catalog-heading shop-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-line" /> NODEQUEST-BUTIKKEN</p>
                <h1>Motorsykkelbutikken</h1>
                <p className="welcome-copy">Bruk poengene dine til å hente en ny motorsykkel til garasjen.</p>
              </div>
              <div className="shop-balance">
                <span>DIN SALDO</span>
                <strong><span className="coin">✦</span> {points} poeng</strong>
              </div>
            </div>
            <div className="moto-grid">
              {motorcycles.map((motorcycle) => {
                const owned = ownedMotorcycles.includes(motorcycle.id);
                const canAfford = points >= motorcycle.price;
                return (
                  <article className="moto-card" key={motorcycle.id}>
                    <div className="moto-image">
                      <img src={motorcycle.image} alt={motorcycle.alt} />
                      <span>{motorcycle.style}</span>
                    </div>
                    <div className="moto-card-body">
                      <div>
                        <p className="moto-number">GARASJE · {motorcycle.id.toUpperCase()}</p>
                        <h2>{motorcycle.name}</h2>
                        <p className="moto-description">{motorcycle.description}</p>
                      </div>
                      <div className="moto-card-footer">
                        <strong><span className="coin">✦</span> {motorcycle.price}</strong>
                        <button
                          className="moto-buy-button"
                          disabled={owned || !canAfford}
                          onClick={() => buyMotorcycle(motorcycle)}
                        >
                          {owned ? "Kjøpt" : canAfford ? "Kjøp" : "For få poeng"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : view === "profile" ? (
          <section className="catalog-page profile-page">
            <button className="back-link" onClick={() => setView("home")}>
              <ArrowLeft size={15} /> Til oversikten
            </button>
            <div className="catalog-heading profile-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-line" /> ELEVPROFIL</p>
                <h1>{studentName}</h1>
                <p className="welcome-copy">Klasse {studentClass}</p>
                <p className="welcome-copy">
                  Oversikt over kartlegginger, opptjente poeng og kjøp.
                </p>
              </div>
            </div>

            <div className="profile-stats" aria-label="Elevens oversikt">
              <div className="profile-stat">
                <span>FULLFØRTE TESTER</span>
                <strong>{assessmentHistory.length}</strong>
              </div>
              <div className="profile-stat">
                <span>POENG OPPTJENT</span>
                <strong>{totalPointsEarned}</strong>
              </div>
              <div className="profile-stat">
                <span>POENGSALDO</span>
                <strong>{points}</strong>
              </div>
            </div>

            <section className="profile-section" aria-labelledby="profile-tests-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">TESTHISTORIKK</p>
                  <h2 id="profile-tests-title">Kartleggingstester</h2>
                </div>
              </div>
              {assessmentHistory.length ? (
                <div className="profile-list">
                  {[...assessmentHistory].reverse().map((attempt) => (
                    <article className="profile-list-item" key={attempt.id}>
                      <span className="profile-list-icon test-history-icon">
                        <GraduationCap size={21} />
                      </span>
                      <span className="profile-list-copy">
                        <strong>Kartleggingstest</strong>
                        <small>
                          {new Intl.DateTimeFormat("nb-NO", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(attempt.completedAt))}
                        </small>
                      </span>
                      <span className="profile-list-result">
                        <strong>{attempt.correctAnswers} av {quizQuestions.length} riktige</strong>
                        <small>{attempt.points} poeng</small>
                      </span>
                      <span className={`profile-result-badge ${attempt.passed ? "is-passed" : ""}`}>
                        {attempt.passed ? "Bestått" : "Øv mer"}
                      </span>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="profile-empty">Ingen kartleggingstester er fullført ennå.</p>
              )}
            </section>

            <section className="profile-section" aria-labelledby="profile-purchases-title">
              <div className="section-title">
                <div>
                  <p className="eyebrow">BUTIKK</p>
                  <h2 id="profile-purchases-title">Kjøpte varer</h2>
                </div>
              </div>
              {ownedMotorcycles.length || purchased ? (
                <div className="profile-list">
                  {motorcycles.filter((motorcycle) => ownedMotorcycles.includes(motorcycle.id)).map((motorcycle) => (
                    <article className="profile-list-item" key={motorcycle.id}>
                      <img className="profile-purchase-image" src={motorcycle.image} alt={motorcycle.alt} />
                      <span className="profile-list-copy">
                        <strong>{motorcycle.name}</strong>
                        <small>{motorcycle.style} · {motorcycle.description}</small>
                      </span>
                      <span className="profile-purchase-price">Kjøpt for {motorcycle.price} poeng</span>
                    </article>
                  ))}
                  {purchased && (
                    <article className="profile-list-item" key="stjernehimmel-tema">
                      <span className="profile-list-icon theme-purchase-icon">
                        <Sparkles size={21} />
                      </span>
                      <span className="profile-list-copy">
                        <strong>Stjernehimmel-tema</strong>
                        <small>Profiltema</small>
                      </span>
                      <span className="profile-purchase-price">Kjøpt for 80 poeng</span>
                    </article>
                  )}
                </div>
              ) : (
                <p className="profile-empty">Ingen varer er kjøpt ennå.</p>
              )}
            </section>
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
        ) : view === "css1" ? (
          <section className="catalog-page css1-page">
            <button
              className="back-link"
              onClick={() => showTasks("HTML, CSS og JavaScript")}
            >
              <ArrowLeft size={15} /> Til HTML, CSS og JavaScript
            </button>
            <div className="catalog-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> PRAKTISK CSS-TEST
                </p>
                <h1>CSS1</h1>
                <p className="welcome-copy">
                  Ni oppgaver om CSS. Følg instruksjonene og bruk ressursene
                  underveis.
                </p>
              </div>
              <div className="catalog-stats">
                <span>
                  <Code2 size={17} /> <strong>{css1Exercises.length}</strong>{" "}
                  oppgaver
                </span>
              </div>
            </div>
            <section className="css1-intro" aria-labelledby="css1-intro-title">
              <h2 id="css1-intro-title">Hvorfor jobber vi med CSS?</h2>
              <p>
                Når vi lager nettsider, er HTML grunnmuren som bygger opp
                innholdet – tekst, bilder, overskrifter og lenker. Men uten CSS
                blir nettsiden likevel ganske kjedelig og utydelig. CSS
                (Cascading Style Sheets) er språket vi bruker for å bestemme
                hvordan en nettside ser ut: farger, skrifttyper, plassering av
                elementer og hvordan siden oppfører seg på ulike skjermer. Å
                lære CSS handler derfor ikke bare om “pynt”, men om
                kommunikasjon og tilpasning. En god nettside skal ikke bare
                fungere, den skal være forståelig, brukervennlig og tilpasset
                den gruppen mennesker den er laget for. I dette prosjektet skal
                dere derfor jobbe med hvordan dere kan bruke CSS til å gjøre en
                idé tydeligere og enklere å oppleve.
              </p>
            </section>
            <section className="css1-method" aria-labelledby="css1-method-title">
              <h2 id="css1-method-title">Hvordan skal du jobbe med CSS?</h2>
              <h3>Grunnleggende CSS</h3>
              <p>
                Når vi arbeider med CSS (<em>Cascading Style Sheets</em>), kan
                vi plassere stilreglene våre på tre forskjellige steder:{" "}
                <strong>inline</strong>, <strong>intern</strong> og{" "}
                <strong>ekstern</strong>.
              </p>
              <p className="css1-method-list-title">
                De tre plasseringene for CSS:
              </p>
              <ul>
                <li>
                  <a href="https://schoolvg1.vercel.app/css.html#inline">
                    Inline
                  </a>{" "}
                  – stil direkte på et enkelt HTML-element.
                </li>
                <li>
                  <a href="https://schoolvg1.vercel.app/css.html#internal">
                    Intern
                  </a>{" "}
                  – stil i en <code>&lt;style&gt;</code>-tagg i{" "}
                  <code>&lt;head&gt;</code>.
                </li>
                <li>
                  <a href="https://schoolvg1.vercel.app/css.html#external">
                    Ekstern
                  </a>{" "}
                  – stil i en separat <code>.css</code>-fil koblet inn med{" "}
                  <code>&lt;link&gt;</code>.
                </li>
              </ul>
            </section>
            <section className="css1-method" aria-labelledby="css1-selectors-title">
              <h2 id="css1-selectors-title">CSS-velgere</h2>
              <p>
                En CSS-selektor er starten på en CSS-regel. Ordet selektor
                betyr egentlig «velger». Den brukes til å peke ut hvilke deler
                av en nettside (HTML-elementer) som skal få en bestemt stil.
                Når du lager en regel i CSS, sier selektoren altså til
                nettleseren: «Dette er de elementene du skal endre stilen på.»
              </p>
            </section>
            <ol className="css1-exercise-list">
              {css1Exercises.map((exercise, index) => (
                <li className="css1-exercise" key={exercise.title}>
                  <article aria-labelledby={`css1-exercise-${index + 1}`}>
                    <div className="css1-exercise-number">
                      Oppgave {index + 1}
                    </div>
                    <h2 id={`css1-exercise-${index + 1}`}>{exercise.title}</h2>
                    <p>{exercise.description}</p>
                    {exercise.instructions && (
                      <ul>
                        {exercise.instructions.map((instruction) => (
                          <li key={instruction}>{instruction}</li>
                        ))}
                      </ul>
                    )}
                    {exercise.resources && (
                      <div className="css1-resources">
                        <strong>Nyttige ressurser</strong>
                        <ul>
                          {exercise.resources.map(({ label, url }) => (
                            <li key={url}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {label} <ArrowUpRight size={14} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ol>
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
                      : visibleTaskCount}
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
                Oppgaver <span>{visibleTaskCount}</span>
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
                {showCss1 && (
                  <article className="task-card css1-task-card">
                    <div className="task-card-top">
                      <span className="task-icon blue">
                        <Code2 size={21} />
                      </span>
                      <span className="task-xp resource-format">9 oppgaver</span>
                    </div>
                    <p className="task-topic">HTML, CSS og JavaScript</p>
                    <h2>CSS1</h2>
                    <p className="task-description">
                      En praktisk CSS-test med ni oppgaver om farger,
                      bakgrunner, Box Model, arv, float og navigasjon.
                    </p>
                    <div className="task-meta">
                      <span>Praktisk test</span>
                      <i />
                      <span>9 oppgaver</span>
                    </div>
                    <button
                      className="task-open"
                      onClick={() => setView("css1")}
                    >
                      Åpne CSS1 <ArrowUpRight size={15} />
                    </button>
                  </article>
                )}
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
              <h1>Kartleggingstest</h1>
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
          <button onClick={() => setView("shop")}>
            <ShoppingBag size={14} /> Butikk
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
