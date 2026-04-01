/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { 
  Lock, 
  Mail, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  Brain, 
  LogOut,
  CheckCircle2,
  Eye,
  History,
  Zap,
  Heart,
  Star,
  FileText,
  Headphones,
  Video,
  RefreshCw,
  Info,
  UserCheck,
  Search,
  ShieldAlert,
  Download,
  PlayCircle
} from "lucide-react";

// --- Types & Data ---

type Category = {
  id: string;
  title: string;
  tag: string;
  description: string;
  howToAsk: string;
  whatToWatch: string;
  facialExpressions: string;
  bodyLanguage: string;
  icon: any;
  questions: string[];
};

const CONTENT: Category[] = [
  {
    id: "guilt",
    title: "Schuldprojektion",
    tag: "TYP 1",
    icon: Brain,
    description: "Bringen Sie ihn dazu, über 'andere' zu sprechen, und beobachten Sie, wie seine Schuldgefühle durchscheinen.",
    howToAsk: "Wählen Sie einen entspannten Moment, z.B. beim Fernsehen oder während einer Autofahrt. Erwähnen Sie ein Thema über Untreue beiläufig, als ob es Sie nicht persönlich betrifft. Bleiben Sie neutral und wertfrei.",
    whatToWatch: "Achten Sie auf plötzliche Stille oder übermäßiges Reden zur Rechtfertigung. Mikroexpressionen: Ein kurzes Zusammenpressen der Lippen oder das Vermeiden von Blickkontakt für 1-2 Sekunden sind starke Indikatoren für inneren Stress.",
    facialExpressions: "Suchen Sie nach 'Mikro-Ekel' (kurzes Rümpfen der Nase) oder 'Angst' (hochgezogene Augenbrauen), wenn das Wort Betrug fällt.",
    bodyLanguage: "Häufiges Berühren des Halses (Beruhigungsgeste) oder das Verschränken der Arme, um eine Barriere aufzubauen.",
    questions: [
      "Was hältst du von dem Promi-Fremdgeh-Skandal in den Nachrichten?",
      "Glaubst du, ein Mann kann fremdgehen und seine Frau trotzdem noch lieben?",
      "Warum glaubst du, betrügen Menschen heutzutage so oft?",
      "Könntest du einen Seitensprung verzeihen, wenn es nur einmal war?",
      "Glaubst du, Routine rechtfertigt es, sich Bestätigung außerhalb zu suchen?",
      "Was würdest du tun, wenn ein Freund dir beichten würde, dass er seine Frau betrügt?",
      "Findest du emotionale Untreue schlimmer als körperliche?",
      "Wo liegt für dich die Grenze bei einer Freundschaft mit einer anderen Frau?",
      "Glaubst du, Geheimnisse halten in manchen Beziehungen die Spannung aufrecht?",
      "Wie würdest du reagieren, wenn du wüsstest, dass ich in der Vergangenheit betrogen wurde?"
    ]
  },
  {
    id: "memory",
    title: "Gedächtnis-Inkonsistenzen",
    tag: "TYP 2",
    icon: History,
    description: "Prüfen Sie, ob seine Geschichten zusammenpassen... ob er Alibis erfindet.",
    howToAsk: "Fragen Sie nach Details zu einem Ereignis, das bereits einige Tage zurückliegt. Tun Sie so, als hätten Sie ein Detail vergessen oder seien einfach nur neugierig auf seinen Tag.",
    whatToWatch: "Lügner müssen sich zwei Versionen merken. Achten Sie auf 'zu viele' Details (Over-Explaining) oder Widersprüche zu früheren Aussagen.",
    facialExpressions: "Häufiges Blinzeln oder das Schließen der Augen für einen Moment länger als normal (Augenblockade), während er nachdenkt.",
    bodyLanguage: "Unruhige Füße oder das 'Zurechtrücken' auf dem Stuhl. Der Körper versucht, der stressigen Situation zu entfliehen.",
    questions: [
      "Kannst du mir nochmal erzählen, wie das Meeting am Donnerstagabend war?",
      "Wer war eigentlich alles dabei, als du meintest, ihr hattet eine Reifenpanne?",
      "Lustig, du sagtest, ihr hättet Pizza gegessen, aber die Kreditkartenabrechnung zeigt etwas anderes...",
      "Wie war eigentlich der Verkehr auf der Strecke, die du gestern gefahren bist?",
      "Du meintest, dein Handy sei leer gewesen, aber du warst vor 10 Minuten online?",
      "Kannst du mir das Foto zeigen, das du bei dem Event gemacht hast?",
      "Was hast du genau gemacht zwischen Feierabend und deiner Ankunft hier?",
      "Du erwähntest, dass XY da war, aber war der nicht eigentlich verreist?",
      "Warum hast du die Version geändert, wer dich nach Hause gefahren hat?",
      "Erinnerst du dich, was du an dem Tag anhattest, als du so spät kamst?"
    ]
  },
  {
    id: "defensive",
    title: "Abwehrreaktionen",
    tag: "TYP 3",
    icon: ShieldCheck,
    description: "Stellen Sie eine 'unschuldige' Frage und sehen Sie, ob er ohne Grund explodiert.",
    howToAsk: "Stellen Sie die Frage direkt, aber mit einer sanften, fast naiven Stimme. Es darf nicht wie ein Verhör klingen, sondern wie eine beiläufige Beobachtung.",
    whatToWatch: "Unverhältnismäßige Wut oder Aggression ist ein massives Warnsignal. Wenn er Sie angreift, versucht er, vom Thema abzulenken.",
    facialExpressions: "Zusammengekniffene Augen, geweitete Nasenflügel und eine angespannte Kiefermuskulatur (Zorn/Angst-Kombination).",
    bodyLanguage: "Eindringen in Ihren persönlichen Bereich oder heftiges Gestikulieren, um Dominanz auszustrahlen und Sie einzuschüchtern.",
    questions: [
      "Mit wem hast du gerade so intensiv bei WhatsApp geschrieben?",
      "Warum hast du eigentlich ein neues Passwort für deinen Laptop?",
      "Mir ist aufgefallen, dass du in letzter Zeit sehr viel am Handy bist, ist alles okay?",
      "Können wir uns mal die Fotos von unserem letzten Urlaub zusammen ansehen?",
      "Warum bist du so gereizt, wenn ich nach deiner Kollegin frage?",
      "Macht es dir was aus, wenn ich kurz dein Handy für einen Anruf benutze?",
      "Warum drehst du das Display immer weg, wenn ich in den Raum komme?",
      "Du wirkst nervös, wenn ich ihren Namen erwähne, woran liegt das?",
      "Warum tust du so, als würde ich dich beschuldigen, wenn ich nur eine Frage stelle?",
      "Glaubst du nicht, dass ich ein Recht habe zu wissen, wo du warst?"
    ]
  },
  {
    id: "emotional",
    title: "Emotionale Distanzierung",
    tag: "TYP 4",
    icon: Heart,
    description: "Prüfen Sie, ob er emotionale Distanz hält, weil er in eine andere Person investiert.",
    howToAsk: "Suchen Sie ein ruhiges Gespräch unter vier Augen. Sprechen Sie von Ihren Gefühlen ('Ich fühle mich...'), anstatt ihn direkt anzuklagen.",
    whatToWatch: "Vermeidet er tiefen Blickkontakt? Wirkt er abwesend oder ungeduldig? Ein unbewusstes Wegrücken des Körpers signalisiert eine Barriere.",
    facialExpressions: "Ein 'leerer' Blick oder das Fehlen von echten emotionalen Reaktionen (Duchenne-Lächeln fehlt).",
    bodyLanguage: "Vermeidung von Berührungen, die früher natürlich waren. Er hält physischen Abstand, auch wenn Sie im selben Raum sind.",
    questions: [
      "Ich habe das Gefühl, du bist in letzter Zeit weit weg, was geht in deinem Kopf vor?",
      "Wann hast du dich das letzte Mal wirklich mit mir verbunden gefühlt?",
      "Fühlst du dich noch so zu mir hingezogen wie früher?",
      "Warum haben wir aufgehört, Pläne für unsere gemeinsame Zukunft zu machen?",
      "Fehlt dir etwas in unserem Intimleben?",
      "Was hat sich an der Art geändert, wie du mich ansiehst?",
      "Verbringst du in letzter Zeit lieber Zeit allein oder mit mir?",
      "Warum teilst du deine Probleme bei der Arbeit nicht mehr mit mir?",
      "Fühlst du dich schuldig, wenn wir Zeit zusammen verbringen?",
      "Was fühlst du, wenn ich dich unerwartet berühre?"
    ]
  },
  {
    id: "indirect",
    title: "Indirektes Geständnis",
    tag: "TYP 5",
    icon: Zap,
    description: "Bringen Sie ihn dazu, 'fast alles zuzugeben', ohne dass er merkt, was er tut.",
    howToAsk: "Nutzen Sie hypothetische Szenarien. Schaffen Sie eine Atmosphäre, in der 'Ehrlichkeit' belohnt wird, um seine Wachsamkeit zu senken.",
    whatToWatch: "Achten Sie auf 'Freudsche Versprecher' oder hypothetische Rechtfertigungen ('Wenn ich es tun würde, dann nur weil...').",
    facialExpressions: "Ein kurzes Absacken der Schultern oder ein tiefer Seufzer (Entlastungsreaktion), wenn er eine Teilwahrheit ausspricht.",
    bodyLanguage: "Das Verbergen der Hände oder das Reiben der Oberschenkel. Der Körper versucht, sich selbst zu beruhigen.",
    questions: [
      "Wenn du ein Geheimnis hättest, das unsere Beziehung zerstören könnte, würdest du es mir sagen?",
      "Glaubst du, es ist möglich, eine Lüge für immer zu verheimlichen?",
      "Was würdest du tun, wenn ich etwas herausfinde, das du mir verheimlichen wolltest?",
      "Warst du jemals versucht, etwas zu tun, das du versprochen hast, nie zu tun?",
      "Was wäre deine Ausrede, wenn du bei einer Lüge erwischt würdest?",
      "Glaubst du, ich bin klug genug, um einen Betrug zu bemerken?",
      "Was hast du am meisten zu verlieren, wenn die Wahrheit ans Licht käme?",
      "Fühlst du dich freier, wenn du nicht bei mir bist?",
      "Glaubst du, Ehrlichkeit ist immer der beste Weg, auch wenn es wehtut?",
      "Wenn wir ganz von vorne anfangen könnten, was würdest du anders machen?"
    ]
  }
];

const RESOURCES = [
  { 
    title: "49 Unterschwellige Fragen - E-Book", 
    type: "PDF", 
    icon: FileText, 
    size: "2.4 MB", 
    description: "Der vollständige Guide von Michael Wagner mit allen 49 Fragen und psychologischen Analysen." 
  }
];

// --- Components ---

interface LoginProps {
  onLogin: () => void;
  key?: string;
}

const LoginPage = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mitglieder-Login</h1>
          <p className="text-gray-500 mt-2 italic font-serif">49 Unterschwellige Fragen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">E-Mail Adresse</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="ihre@email.de"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">Tipp: 123456 (Test-Zugang)</p>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
          >
            Inhalt freischalten
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2026 Michael Wagner • Beziehungspsychologie</p>
        </div>
      </motion.div>
    </div>
  );
};

interface DashboardProps {
  onLogout: () => void;
  key?: string;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("guilt");
  const [view, setView] = useState<"questions" | "resources">("questions");

  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.text("49 Unterschwellige Fragen", 20, 30);
    
    doc.setFontSize(14);
    doc.text("49 Fragen, die enthüllen, ob er dich betrügt,", 20, 45);
    doc.text("bereits betrogen hat oder darüber nachdenkt", 20, 52);
    
    doc.setFontSize(12);
    doc.text("Von Michael Wagner", 20, 65);
    doc.text("Klinischer Psychologe & Experte für Beziehungsdynamiken", 20, 72);
    
    // Content
    doc.setFontSize(16);
    doc.text("Einleitung: Die Macht der Wahrheit", 20, 90);
    
    doc.setFontSize(10);
    const introText = `Hallo. Mein Name ist Michael Wagner. In den letzten zehn Jahren saßen über 4.000 Klienten in meiner Praxis. Die meisten von ihnen waren Frauen – Frauen wie Sie. Frauen, die nachts wach liegen, auf die Decke starren und dieses kalte, unerbittliche Ziehen in der Magengrube spüren. Dieses Bauchgefühl, das flüstert: Etwas stimmt nicht.

Ich kenne den Schmerz der Ungewissheit. Es ist eine psychologische Folter. Es ist nicht einmal der Betrug selbst, der Sie in den Wahnsinn treibt – es ist das Gaslighting. Es ist das Gefühl, den eigenen Sinnen nicht mehr trauen zu können. Sie spüren die emotionale Distanz, die veränderten Gewohnheiten, das plötzliche Bewachen des Smartphones. Doch wenn Sie ihn darauf ansprechen, werden Sie als "paranoid", "eifersüchtig" oder "verrückt" abgestempelt.

Warum direkte Konfrontation NIEMALS funktioniert
Lassen Sie mich Ihnen als Psychologe ein Geheimnis über die männliche Psyche verraten: Männer, die betrügen, sind auf den Krieg vorbereitet. Wenn Sie ihn direkt fragen: "Betrügst du mich?", aktivieren Sie sofort seine Amygdala – das Angstzentrum im Gehirn. Er geht in den Kampf-oder-Flucht-Modus. Er hat sich diese Szene bereits hundertmal im Kopf ausgemalt. Er hat seine Alibis parat. Er wird empört reagieren, den Spieß umdrehen und Sie in die Defensive drängen.`;

    const splitText = doc.splitTextToSize(introText, 170);
    doc.text(splitText, 20, 100);
    
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Kapitel 1: TYP 1 - Fragen, die Schuldprojektion aktivieren", 20, 30);
    
    doc.setFontSize(10);
    const chapter1Text = `Die Psychologie dahinter: Projektion
In der Psychoanalyse beschreibt "Projektion" einen Abwehrmechanismus, bei dem eine Person ihre eigenen inakzeptablen Gefühle, Wünsche oder Taten auf andere überträgt. Ein Mann, der betrügt, trägt eine enorme unbewusste Schuld in sich. Wenn er mit dem Thema Untreue bei anderen konfrontiert wird, passiert eines von zwei Dingen:

1. Übermäßige Rechtfertigung: Er verteidigt den Betrüger, um unbewusst seine eigenen Taten zu legitimieren.
2. Überkompensation: Er verurteilt den Betrüger extrem aggressiv und künstlich, um sich selbst als moralisch überlegen darzustellen.

Fragen:
1. "Ich habe heute gelesen, dass [Prominenter X] seine Frau betrogen hat. Warum werfen Männer, die alles haben, das einfach so weg?"
2. "Sarah hat mir erzählt, dass ihr Kollege eine Affäre hat. Glaubst du, es ist überhaupt möglich, jemanden zu lieben und ihn trotzdem zu betrügen?"
3. "In diesem Film geht es ja um einen Seitensprung. Denkst du, der Partner spürt das immer, auch wenn es keine Beweise gibt?"
4. "Was würdest du eigentlich tun, wenn ein guter Freund von dir seine Freundin betrügt? Würdest du ihn decken?"`;

    const splitChapter1 = doc.splitTextToSize(chapter1Text, 170);
    doc.text(splitChapter1, 20, 40);
    
    doc.save("49_Unterschwellige_Fragen_EBook.pdf");
  };

  const activeCategory = CONTENT.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900">
      {/* Update Banner */}
      <div className="bg-amber-500 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 sticky top-0 z-30">
        <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
        DIESER BEREICH WIRD REGELMÄSSIG MIT NEUEN INHALTEN AKTUALISIERT
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-8 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">49 Unterschwellige Fragen</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Exklusiver Mitgliederbereich</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setView("questions")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "questions" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Fragen-Guide
            </button>
            <button 
              onClick={() => setView("resources")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "resources" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              E-Book Download
            </button>
          </div>

          <button 
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {view === "questions" && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Die 5 Kategorien</h3>
              <nav className="space-y-1">
                {CONTENT.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      activeTab === cat.id 
                      ? "bg-blue-50 text-blue-700" 
                      : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <cat.icon className={`w-4 h-4 ${activeTab === cat.id ? "text-blue-600" : "text-gray-400"}`} />
                    <span className="font-bold text-sm">{cat.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Ihr Experte
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://i.imgur.com/DqCD3M4.jpg" alt="Michael Wagner" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">Michael Wagner</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Psychologe</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "Die Wahrheit ist oft nur eine Frage entfernt. Ich helfe Ihnen, sie zu finden."
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <ShieldCheck className="w-8 h-8 mb-4 text-blue-400" />
            <h4 className="font-bold mb-2">Sicherheits-Hinweis</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Löschen Sie nach jeder Sitzung Ihren Browserverlauf, um volle Diskretion zu wahren.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {view === "questions" && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Category Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <activeCategory.icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{activeCategory.tag}</span>
                      <h1 className="text-4xl font-bold text-gray-900 mt-1">{activeCategory.title}</h1>
                      <p className="text-gray-500 mt-2 text-lg">{activeCategory.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h5 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        Wie man fragt
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{activeCategory.howToAsk}</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                      <h5 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                        <Eye className="w-5 h-5 text-blue-600" />
                        Worauf man achten muss
                      </h5>
                      <p className="text-sm text-blue-800 leading-relaxed">{activeCategory.whatToWatch}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h5 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                        Gesichtsausdrücke
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{activeCategory.facialExpressions}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h5 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                        <Zap className="w-5 h-5 text-blue-600" />
                        Körpersprache
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{activeCategory.bodyLanguage}</p>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Die 10 Fragen dieses Moduls
                  </h3>
                  <div className="grid gap-4">
                    {activeCategory.questions.map((q, idx) => (
                      <div key={idx} className="group p-6 bg-gray-50 hover:bg-white border border-transparent hover:border-blue-100 rounded-2xl transition-all">
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-gray-800 font-bold text-lg mb-2">{q}</p>
                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                              <span className="flex items-center gap-1"><Search className="w-3 h-3" /> Analyse-Modus</span>
                              <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Subliminal-Level: Hoch</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {view === "resources" && (
              <motion.div
                key="resources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
                  <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <FileText className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{RESOURCES[0].title}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {RESOURCES[0].description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 mb-10 flex items-center justify-center gap-8 border border-gray-100">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Format</p>
                      <p className="font-bold text-gray-900">{RESOURCES[0].type}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Größe</p>
                      <p className="font-bold text-gray-900">{RESOURCES[0].size}</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3 group"
                  >
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    E-Book jetzt herunterladen
                  </button>
                  
                  <p className="mt-6 text-xs text-gray-400">
                    Sicherer Download • Virengeprüft • PDF Format
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 text-center border-t border-gray-200 mt-12">
        <p className="text-gray-400 text-sm">
          © 2026 Michael Wagner • Alle Inhalte sind urheberrechtlich geschützt.
        </p>
      </footer>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("member_session");
    if (session) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("member_session", "active");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("member_session");
  };

  return (
    <div className="antialiased">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <LoginPage key="login" onLogin={handleLogin} />
        ) : (
          <Dashboard key="dashboard" onLogout={handleLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}
