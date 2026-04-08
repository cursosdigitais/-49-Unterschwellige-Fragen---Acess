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
    tag: "KAPITEL 1",
    icon: Brain,
    description: "In der Psychoanalyse beschreibt \"Projektion\" einen Abwehrmechanismus, bei dem eine Person ihre eigenen inakzeptablen Gefühle, Wünsche oder Taten auf andere überträgt. Ein Mann, der betrügt, trägt eine enorme unbewusste Schuld in sich. Wenn er mit dem Thema Untreue bei anderen konfrontiert wird, passiert eines von zwei Dingen: • Übermäßige Rechtfertigung: Er verteidigt den Betrüger, um unbewusst seine eigenen Taten zu legitimieren (\"Naja, vielleicht war seine Frau auch furchtbar zu ihm\"). • Überkompensation: Er verurteilt den Betrüger extrem aggressiv und künstlich, um sich selbst als moralisch überlegen darzustellen und jeden Verdacht von sich abzulenken.",
    howToAsk: "Streuen Sie diese Fragen beiläufig ein – beim Fernsehen, beim Abendessen oder wenn Sie von Freunden erzählen.",
    whatToWatch: "Ein treuer Mann wird diese Fragen objektiv, vielleicht sogar etwas desinteressiert beantworten. Er muss nicht lange nachdenken. Ein untreuer Mann wird zögern. Sein Gehirn rechnet in Millisekunden durch: \"Warum fragt sie das? Weiß sie etwas? Was ist die sicherste Antwort?\" Wenn er anfängt, hypothetische Betrüger vehement zu verteidigen oder extrem nervös wird, schlägt sein Gewissen Alarm.",
    facialExpressions: "Achten Sie auf plötzliches Verstummen, nervöses Räuspern oder das Vermeiden von Augenkontakt (Mikroexpressionen der Scham).",
    bodyLanguage: "Vermeiden von Augenkontakt. Wenn er anfängt, hypothetische Betrüger vehement zu verteidigen oder extrem nervös wird, schlägt sein Gewissen Alarm.",
    questions: [
      "1. \"Ich habe heute gelesen, dass [Prominenter X] seine Frau betrogen hat. Warum werfen Männer, die alles haben, das einfach so weg?\"",
      "2. \"Sarah hat mir erzählt, dass ihr Kollege eine Affäre hat. Glaubst du, es ist überhaupt möglich, jemanden zu lieben und ihn trotzdem zu betrügen?\"",
      "3. \"In diesem Film geht es ja um einen Seitensprung. Denkst du, der Partner spürt das immer, auch wenn es keine Beweise gibt?\"",
      "4. \"Was würdest du eigentlich tun, wenn ein guter Freund von dir seine Freundin betrügt? Würdest du ihn decken?\"",
      "5. \"Glaubst du, dass Menschen, die einmal betrügen, es immer wieder tun werden?\"",
      "6. \"Ich habe mich neulich gefragt: Was ist für dich eigentlich schlimmer – emotionaler Betrug oder rein körperlicher?\"",
      "7. \"Denkst du, Monogamie ist für uns Menschen eigentlich natürlich, oder zwingen wir uns nur dazu?\"",
      "8. \"Wenn jemand einen Fehler macht und fremdgeht, es aber sofort bereut... sollte er es beichten und die Beziehung riskieren, oder schweigen, um den anderen nicht zu verletzen?\"",
      "9. \"Verstehst du Männer, die sagen, sie sind 'aus Versehen' in eine Affäre gerutscht?\"",
      "10. \"Glaubst du, dass eine Beziehung nach einem Betrug jemals wieder so werden kann wie vorher?\""
    ]
  },
  {
    id: "memory",
    title: "Erinnerungsinkonsistenzen",
    tag: "KAPITEL 2",
    icon: History,
    description: "Die Wahrheit zu sagen, ist einfach. Die Erinnerung wird einfach aus dem Gedächtnis abgerufen. Zu lügen erfordert jedoch massive Gehirnleistung. Ein Lügner muss eine falsche Realität erschaffen, sich an jedes Detail dieser Realität erinnern und sicherstellen, dass sie nicht mit früheren Aussagen kollidiert. Das nennt man \"Cognitive Load\". Wenn Sie unerwartet nach kleinen Details fragen, bricht das Lügenkonstrukt oft zusammen.",
    howToAsk: "Diese Fragen zielen auf seine \"Alibis\" ab. Wenn er angeblich lange im Büro war, beim Sport oder mit Freunden unterwegs, stellen Sie diese Fragen ein oder zwei Tage später, ganz beiläufig.",
    whatToWatch: "Achten Sie auf Over-Explaining (übermäßiges Erklären). Ein Lügner gibt oft viel zu viele ungefragte Details preis, um seine Geschichte glaubhaft zu machen. Ein weiteres massives Warnsignal ist Wut. Wenn er sagt: \"Warum verhörst du mich?! Kann ich nicht einmal in Ruhe ein Bier trinken gehen?!\", dann ist das keine normale Reaktion auf die Frage nach einem Parkplatz. Es ist die Panik eines Mannes, dessen Lügengebäude wackelt.",
    facialExpressions: "Achten Sie auf Over-Explaining (übermäßiges Erklären). Ein Lügner gibt oft viel zu viele ungefragte Details preis.",
    bodyLanguage: "Wut. Wenn er sagt: \"Warum verhörst du mich?! Kann ich nicht einmal in Ruhe ein Bier trinken gehen?!\", dann ist das keine normale Reaktion auf die Frage nach einem Parkplatz.",
    questions: [
      "11. \"Du warst ja gestern so spät noch im Büro. Hat es da eigentlich auch so stark geregnet wie hier?\"",
      "12. \"Wie geht es eigentlich [Name des Kollegen/Freundes, mit dem er angeblich war]? Hat er immer noch Stress mit seiner Freundin?\"",
      "13. \"Was habt ihr gestern Abend eigentlich gegessen, als ihr unterwegs wart? Ich brauche Inspiration für heute Abend.\"",
      "14. \"Du hast gestern gar nicht erzählt, wer beim Männerabend alles dabei war. War [Name] auch da?\"",
      "15. \"Als du gestern vom Sport kamst, sahst du gar nicht so erschöpft aus wie sonst. Habt ihr ein neues Training gemacht?\"",
      "16. \"Ich habe gestern versucht, dich um [Uhrzeit] anzurufen, aber es ging direkt die Mailbox ran. Hattet ihr da gerade das Meeting?\"",
      "17. \"Wo genau habt ihr gestern eigentlich geparkt? Ich muss da morgen auch hin und suche einen guten Parkplatz.\"",
      "18. \"Du hast erzählt, der Film im Kino war gut. Wie endete er eigentlich genau? Ich will ihn mir nicht ansehen, bin aber neugierig.\"",
      "19. \"Wer hat gestern eigentlich die Rechnung übernommen, als ihr etwas trinken wart?\"",
      "20. \"Du riechst in letzter Zeit nach der Arbeit immer so frisch. Habt ihr eine neue Seife im Büro-Waschraum?\""
    ]
  },
  {
    id: "defensive",
    title: "Abwehrreaktionen",
    tag: "KAPITEL 3",
    icon: ShieldCheck,
    description: "Ein Mann mit reinem Gewissen interpretiert alltägliche Fragen als genau das: alltägliche Fragen. Ein Mann, der etwas verheimlicht, hat einen hypersensiblen Bedrohungs-Sensor. Er interpretiert jede Frage zu seinen Gewohnheiten als potenziellen Angriff oder als Beweis dafür, dass Sie ihm auf der Spur sind. Er reagiert unverhältnismäßig defensiv.",
    howToAsk: "Diese Fragen zielen auf Veränderungen in seiner Routine ab – insbesondere auf sein Smartphone-Verhalten und sein Aussehen, die klassischen Indikatoren für Untreue.",
    whatToWatch: "Wenn ein treuer Mann genervt ist, sagt er vielleicht: \"Schatz, ich bin einfach müde, lass mich kurz in Ruhe.\" Er ist entspannt, nur erschöpft. Ein untreuer Mann wird persönlich und angreifend. Er wird versuchen, Ihnen ein schlechtes Gewissen einzureden: \"Du kontrollierst mich! Du bist paranoid! Ich habe überhaupt keine Privatsphäre mehr in diesem Haus!\" Diese aggressive Abwehr ist ein klassisches Ablenkungsmanöver.",
    facialExpressions: "Achten Sie auf den Unterschied zwischen normaler Müdigkeit und defensivem Ärger.",
    bodyLanguage: "Aggressive Abwehr: \"Du kontrollierst mich! Du bist paranoid! Ich habe überhaupt keine Privatsphäre mehr in diesem Haus!\"",
    questions: [
      "21. \"Du hast dein Handy-Passwort geändert, oder? Ich wollte nur kurz nach dem Wetter schauen.\"",
      "22. \"Mir ist aufgefallen, dass du dein Handy in letzter Zeit immer mit ins Badezimmer nimmst. Erwartest du einen wichtigen Anruf?\"",
      "23. \"Du hast dir neue Hemden gekauft und achtest extrem auf deine Frisur in letzter Zeit. Gibt es einen neuen Dresscode bei der Arbeit?\"",
      "24. \"Dein Handy hat gerade vibriert und du hast so schnell draufgeschaut. Alles in Ordnung, oder gibt es einen Notfall?\"",
      "25. \"Warum legst du dein Handy eigentlich immer mit dem Display nach unten auf den Tisch?\"",
      "26. \"Du bist in letzter Zeit oft so in Gedanken versunken, wenn du am Handy tippst. Mit wem schreibst du denn so intensiv?\"",
      "27. \"Ich habe gesehen, dass du eine neue App für Nachrichten hast (z.B. Telegram/Signal). Wofür brauchst du die?\"",
      "28. \"Du gehst in letzter Zeit viel öfter ins Fitnessstudio als früher. Was hat dich so motiviert?\"",
      "29. \"Du wirkst in letzter Zeit oft so gestresst, wenn du von der Arbeit kommst, aber du willst nie darüber reden. Warum schließt du mich da aus?\"",
      "30. \"Mir ist aufgefallen, dass du deinen WhatsApp-Zuletzt-Online-Status verborgen hast. Hat das einen bestimmten Grund?\""
    ]
  },
  {
    id: "emotional",
    title: "Emotionale Distanz",
    tag: "KAPITEL 4",
    icon: Heart,
    description: "Emotionale Energie ist eine endliche Ressource. Wenn ein Mann diese Energie in eine andere Frau investiert (sei es durch eine physische Affäre oder eine emotionale), muss er sie zwangsläufig von Ihnen abziehen. Zudem führt die unbewusste Schuld oft dazu, dass er sich emotional distanziert, weil echte Intimität mit Ihnen ihn an seinen Verrat erinnern würde.",
    howToAsk: "Diese Fragen sind tiefgründiger. Sie erfordern einen ruhigen Moment. Sie testen seine Fähigkeit, emotionale Nähe zuzulassen und in die gemeinsame Zukunft zu blicken.",
    whatToWatch: "Ein Mann, der eine Affäre hat, wird bei diesen Fragen extrem ausweichend reagieren. Er wird Floskeln verwenden (\"Alles ist gut, mach dir keine Sorgen\", \"Wir sind halt beide gestresst\"). Achten Sie auf seine Körpersprache: Wendet er sich von Ihnen ab? Kann er Ihnen bei diesen Fragen in die Augen sehen? Wenn er die Schuld für die Distanz sofort auf Sie schiebt (\"Du nörgelst ja nur noch\"), ist das ein Zeichen dafür, dass er seine eigene emotionale Abwesenheit rechtfertigen will.",
    facialExpressions: "Kann er Ihnen bei diesen Fragen in die Augen sehen?",
    bodyLanguage: "Wendet er sich von Ihnen ab? Schiebt er die Schuld für die Distanz sofort auf Sie (\"Du nörgelst ja nur noch\")?",
    questions: [
      "31. \"Wenn du an unsere Zukunft in fünf Jahren denkst, was siehst du da genau?\"",
      "32. \"Hast du manchmal das Gefühl, dass wir uns in letzter Zeit emotional ein wenig voneinander entfernt haben?\"",
      "33. \"Was ist eigentlich deine schönste Erinnerung an uns aus den letzten paar Monaten?\"",
      "34. \"Gibt es etwas in unserer Beziehung, das dir im Moment fehlt oder das du dir anders wünschst?\"",
      "35. \"Ich habe das Gefühl, wir reden kaum noch über tiefe Dinge. Beschäftigt dich etwas, das du mir nicht sagen möchtest?\"",
      "36. \"Wenn du unsere Beziehung mit einem Wort beschreiben müsstest, wie sie genau jetzt in diesem Moment ist, welches wäre das?\"",
      "37. \"Fühlst du dich eigentlich noch genauso zu mir hingezogen wie am Anfang?\"",
      "38. \"Gibt es Momente, in denen du dich in unserer Beziehung gefangen oder eingeengt fühlst?\"",
      "39. \"Wenn wir ein Problem hätten, von dem du wüsstest, dass es mich sehr verletzen würde – würdest du es mir sagen oder es für dich behalten?\"",
      "40. \"Hast du das Gefühl, dass wir noch ein Team sind, oder kämpft gerade jeder für sich allein?\""
    ]
  },
  {
    id: "indirect",
    title: "Indirektes Geständnis",
    tag: "KAPITEL 5",
    icon: Zap,
    description: "Menschen wollen ihre Geheimnisse instinktiv teilen – der Druck, eine Lüge aufrechtzuerhalten, ist enorm. Wenn Sie eine Atmosphäre schaffen, die völlig frei von Urteilen wirkt, wiegen Sie ihn in falscher Sicherheit. Er glaubt, er spricht über ein abstraktes Konzept, lässt dabei aber seinen Filter fallen und verrät seine wahren Gedanken und Taten.",
    howToAsk: "Diese Fragen sind hochstrategisch. Stellen Sie sie in Momenten größter Entspannung (z.B. bei einem Glas Wein auf dem Balkon). Ihr Tonfall muss absolut ruhig, philosophisch und nicht anklagend sein.",
    whatToWatch: "Hören Sie hier ganz genau hin. Normalisiert er das Betrügen? Sagt er Dinge wie: \"Naja, Männer sind halt Jäger\" oder \"Manchmal passiert es einfach, ohne dass es etwas bedeutet\"? Das ist eine Vorab-Rechtfertigung für seine eigenen Taten. Besonders Frage 43 ist ein Meisterstück: Wenn er zugibt, dass er \"fast\" betrogen hätte oder \"in Versuchung\" war, ist dies in der klinischen Psychologie oft ein verschleiertes Geständnis.",
    facialExpressions: "Achten Sie auf seine Reaktion bei Frage 43.",
    bodyLanguage: "Lassen des Filters. Er glaubt, er spricht über ein abstraktes Konzept, verrät dabei aber seine wahren Gedanken.",
    questions: [
      "41. \"Glaubst du, dass es Situationen gibt, in denen ein Seitensprung einer Beziehung sogar helfen kann, weil man merkt, was man am anderen hat?\"",
      "42. \"Wenn du dich jemals in eine andere Frau verlieben würdest, wie würdest du es mir sagen?\"",
      "43. \"Hand aufs Herz: Warst du in unserer Beziehung schon mal in einer Situation, in der du in Versuchung warst, aber widerstanden hast?\"",
      "44. \"Was denkst du, ist der Hauptgrund, warum selbst glückliche Paare manchmal betrügen?\"",
      "45. \"Glaubst du, dass Männer und Frauen aus unterschiedlichen Gründen fremdgehen?\"",
      "46. \"Wenn jemand betrügt, denkst du, es ist immer eine bewusste Entscheidung, oder kann es einfach 'passieren'?\"",
      "47. \"Könntest du mit einer Lüge leben, wenn du wüsstest, dass die Wahrheit mich zerstören würde?\"",
      "48. \"Glaubst du, dass Geheimnisse eine Beziehung auf Dauer vergiften, auch wenn der andere sie nie herausfindet?\"",
      "49. \"Wenn du die Zeit zurückdrehen könntest, gibt es etwas in unserer Beziehung, das du anders machen würdest?\""
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
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - 2 * margin;
    let y = 30;

    const addText = (text: string, fontSize: number, isBold = false, spacing = 7) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin, y);
        y += spacing;
      });
      y += 2; // Extra spacing after block
    };

    // Page 1
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("49 Unterschwellige Fragen", margin, y);
    y += 12;

    doc.setFontSize(14);
    doc.setFont("helvetica", "italic");
    doc.text("49 Fragen, die enthüllen, ob er dich betrügt, bereits betrogen hat oder darüber nachdenkt", margin, y, { maxWidth: contentWidth });
    y += 15;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Von Michael Wagner", margin, y);
    y += 7;
    doc.text("Klinischer Psychologe & Experte für Beziehungsdynamiken", margin, y);
    y += 15;

    addText("Einleitung: Die Macht der Wahrheit", 16, true);
    addText("Hallo. Mein Name ist Michael Wagner. In den letzten zehn Jahren saßen über 4.000 Klienten in meiner Praxis. Die meisten von ihnen waren Frauen – Frauen wie Sie. Frauen, die nachts wach liegen, auf die Decke starren und dieses kalte, unerbittliche Ziehen in der Magengrube spüren. Dieses Bauchgefühl, das flüstert: Etwas stimmt nicht.", 10);
    addText("Ich kenne den Schmerz der Ungewissheit. Es ist eine psychologische Folter. Es ist nicht einmal der Betrug selbst, der Sie in den Wahnsinn treibt – es ist das Gaslighting. Es ist das Gefühl, den eigenen Sinnen nicht mehr trauen zu können. Sie spüren die emotionale Distanz, die veränderten Gewohnheiten, das plötzliche Bewachen des Smartphones. Doch wenn Sie ihn darauf ansprechen, werden Sie als \"paranoid\", \"eifersüchtig\" oder \"verrückt\" abgestempelt.", 10);
    addText("Warum direkte Konfrontation NIEMALS funktioniert", 12, true);
    addText("Lassen Sie mich Ihnen als Psychologe ein Geheimnis über die männliche Psyche verraten: Männer, die betrügen, sind auf den Krieg vorbereitet.", 10);
    addText("Wenn Sie ihn direkt fragen: \"Betrügst du mich?\", aktivieren Sie sofort seine Amygdala – das Angstzentrum im Gehirn. Er geht in den Kampf-oder-Flucht-Modus. Er hat sich diese Szene bereits hundertmal im Kopf ausgemalt. Er hat seine Alibis parat. Er wird empört reagieren, den Spieß umdrehen und Sie in die Defensive drängen.", 10);

    // Page 2
    doc.addPage();
    y = 20;
    addText("Auch das heimliche Überprüfen von Handys ist ein verlorener Kampf. Untreue Männer von heute nutzen versteckte Apps, löschen Chatverläufe oder haben Zweithandys. Wenn Sie schnüffeln und nichts finden, fühlen Sie sich schuldig. Wenn Sie erwischt werden, hat er den perfekten Grund, sich als Opfer Ihrer \"Kontrollsucht\" darzustellen.", 10);
    addText("Die Lösung: Unterschwellige Fragen", 14, true);
    addText("Um die Wahrheit herauszufinden, müssen wir seine Abwehrmechanismen umgehen. Wir müssen unter dem Radar seines Bewusstseins fliegen. Hier kommt das Konzept der Unterschwelligen Fragen ins Spiel.", 10);
    addText("Diese Fragen klingen wie beiläufiger Smalltalk. Sie wirken unschuldig. Doch psychologisch gesehen sind sie hochpräzise Werkzeuge. Sie zwingen sein Gehirn, Informationen zu verarbeiten, die bei einem untreuen Mann unweigerlich zu kognitiver Dissonanz, Stressreaktionen oder Mikroexpressionen führen. Ein treuer Mann wird diese Fragen völlig entspannt und logisch beantworten. Ein untreuer Mann wird stolpern.", 10);
    addText("In diesem Buch gebe ich Ihnen 49 dieser Fragen an die Hand. Sie werden lernen, nicht nur zuzuhören, was er sagt, sondern zu beobachten, wie er es sagt. Es ist an der Zeit, dass Sie die Kontrolle zurückgewinnen. Ohne Paranoia. Ohne unbegründete Vorwürfe. Nur mit der kühlen, scharfsinnigen Macht der Psychologie.", 10);
    addText("Kapitel 1: TYP 1 - Fragen, die Schuldprojektion aktivieren", 16, true);

    // Page 3
    doc.addPage();
    y = 20;
    addText("Die Psychologie dahinter: Projektion", 12, true);
    addText("In der Psychoanalyse beschreibt \"Projektion\" einen Abwehrmechanismus, bei dem eine Person ihre eigenen inakzeptablen Gefühle, Wünsche oder Taten auf andere überträgt. Ein Mann, der betrügt, trägt eine enorme unbewusste Schuld in sich. Wenn er mit dem Thema Untreue bei anderen konfrontiert wird, passiert eines von zwei Dingen:", 10);
    addText("• Übermäßige Rechtfertigung: Er verteidigt den Betrüger, um unbewusst seine eigenen Taten zu legitimieren (\"Naja, vielleicht war seine Frau auch furchtbar zu ihm\").", 10);
    addText("• Überkompensation: Er verurteilt den Betrüger extrem aggressiv und künstlich, um sich selbst als moralisch überlegen darzustellen und jeden Verdacht von sich abzulenken.", 10);
    addText("Streuen Sie diese Fragen beiläufig ein – beim Fernsehen, beim Abendessen oder wenn Sie von Freunden erzählen. Achten Sie auf plötzliches Verstummen, nervöses Räuspern oder das Vermeiden von Augen-kontakt (Mikroexpressionen der Scham).", 10);
    addText("1. \"Ich habe heute gelesen, dass [Prominenter X] seine Frau betrogen hat. Warum werfen Männer, die alles haben, das einfach so weg?\"", 10, true);
    addText("2. \"Sarah hat mir erzählt, dass ihr Kollege eine Affäre hat. Glaubst du, es ist überhaupt möglich, jemanden zu lieben und ihn trotzdem zu betrügen?\"", 10, true);
    addText("3. \"In diesem Film geht es ja um einen Seitensprung. Denkst du, der Partner spürt das immer, auch wenn es keine Beweise gibt?\"", 10, true);
    addText("4. \"Was würdest du eigentlich tun, wenn ein guter Freund von dir seine Freundin betrügt? Würdest du ihn decken?\"", 10, true);

    // Page 4
    doc.addPage();
    y = 20;
    addText("5. \"Glaubst du, dass Menschen, die einmal betrügen, es immer wieder tun werden?\"", 10, true);
    addText("6. \"Ich habe mich neulich gefragt: Was ist für dich eigentlich schlimmer – emotionaler Betrug oder rein körperlicher?\"", 10, true);
    addText("7. \"Denkst du, Monogamie ist für uns Menschen eigentlich natürlich, oder zwingen wir uns nur dazu?\"", 10, true);
    addText("8. \"Wenn jemand einen Fehler macht und fremdgeht, es aber sofort bereut... sollte er es beichten und die Beziehung riskieren, oder schweigen, um den anderen nicht zu verletzen?\"", 10, true);
    addText("9. \"Verstehst du Männer, die sagen, sie sind 'aus Versehen' in eine Affäre gerutscht?\"", 10, true);
    addText("10. \"Glaubst du, dass eine Beziehung nach einem Betrug jemals wieder so werden kann wie vorher?\"", 10, true);
    addText("Wie Sie seine Reaktion lesen:", 12, true);
    addText("Ein treuer Mann wird diese Fragen objektiv, vielleicht sogar etwas desinteressiert beantworten. Er muss nicht lange nachdenken. Ein untreuer Mann wird zögern. Sein Gehirn rechnet in Millisekunden durch: \"Warum fragt sie das? Weiß sie etwas? Was ist die sicherste Antwort?\" Wenn er anfängt, hypothetische Betrüger vehement zu verteidigen oder extrem nervös wird, schlägt sein Gewissen Alarm.", 10);
    addText("Kapitel 2: TYP 2 - Fragen, die Erinnerungsinkonsistenzen aktivieren", 16, true);

    // Page 5
    doc.addPage();
    y = 20;
    addText("Die Psychologie dahinter: Kognitive Belastung (Cognitive Load)", 12, true);
    addText("Die Wahrheit zu sagen, ist einfach. Die Erinnerung wird einfach aus dem Gedächtnis abgerufen. Zu lügen erfordert jedoch massive Gehirnleistung. Ein Lügner muss eine falsche Realität erschaffen, sich an jedes Detail dieser Realität erinnern und sicherstellen, dass sie nicht mit früheren Aussagen kollidiert. Das nennt man \"Cognitive Load\". Wenn Sie unerwartet nach kleinen Details fragen, bricht das Lügenkonstrukt oft zusammen.", 10);
    addText("Diese Fragen zielen auf seine \"Alibis\" ab. Wenn er angeblich lange im Büro war, beim Sport oder mit Freunden unterwegs, stellen Sie diese Fragen ein oder zwei Tage später, ganz beiläufig.", 10);
    addText("11. \"Du warst ja gestern so spät noch im Büro. Hat es da eigentlich auch so stark geregnet wie hier?\"", 10, true);
    addText("12. \"Wie geht es eigentlich [Name des Kollegen/Freundes, mit dem er angeblich war]? Hat er immer noch Stress mit seiner Freundin?\"", 10, true);
    addText("13. \"Was habt ihr gestern Abend eigentlich gegessen, als ihr unterwegs wart? Ich brauche Inspiration für heute Abend.\"", 10, true);
    addText("14. \"Du hast gestern gar nicht erzählt, wer beim Männerabend alles dabei war. War [Name] auch da?\"", 10, true);
    addText("15. \"Als du gestern vom Sport kamst, sahst du gar nicht so erschöpft aus wie sonst. Habt ihr ein neues Training gemacht?\"", 10, true);

    // Page 6
    doc.addPage();
    y = 20;
    addText("16. \"Ich habe gestern versucht, dich um [Uhrzeit] anzurufen, aber es ging direkt die Mailbox ran. Hattet ihr da gerade das Meeting?\"", 10, true);
    addText("17. \"Wo genau habt ihr gestern eigentlich geparkt? Ich muss da morgen auch hin und suche einen guten Parkplatz.\"", 10, true);
    addText("18. \"Du hast erzählt, der Film im Kino war gut. Wie endete er eigentlich genau? Ich will ihn mir nicht ansehen, bin aber neugierig.\"", 10, true);
    addText("19. \"Wer hat gestern eigentlich die Rechnung übernommen, als ihr etwas trinken wart?\"", 10, true);
    addText("20. \"Du riechst in letzter Zeit nach der Arbeit immer so frisch. Habt ihr eine neue Seife im Büro-Waschraum?\"", 10, true);
    addText("Wie Sie die Anzeichen erkennen:", 12, true);
    addText("Achten Sie auf Over-Explaining (übermäßiges Erklären). Ein Lügner gibt oft viel zu viele ungefragte Details preis, um seine Geschichte glaubhaft zu machen. Ein weiteres massives Warnsignal ist Wut. Wenn er sagt: \"Warum verhörst du mich?! Kann ich nicht einmal in Ruhe ein Bier trinken gehen?!\", dann ist das keine normale Reaktion auf die Frage nach einem Parkplatz. Es ist die Panik eines Mannes, dessen Lügengebäude wackelt.", 10);
    addText("Kapitel 3: TYP 3 - Fragen, die eine Abwehrreaktion aktivieren", 16, true);

    // Page 7
    doc.addPage();
    y = 20;
    addText("Die Psychologie dahinter: Der Bedrohungs-Sensor", 12, true);
    addText("Ein Mann mit reinem Gewissen interpretiert alltägliche Fragen als genau das: alltägliche Fragen. Ein Mann, der etwas verheimlicht, hat einen hypersensiblen Bedrohungs-Sensor. Er interpretiert jede Frage zu seinen Gewohnheiten als potenziellen Angriff oder als Beweis dafür, dass Sie ihm auf der Spur sind. Er reagiert unverhältnismäßig defensiv.", 10);
    addText("Diese Fragen zielen auf Veränderungen in seiner Routine ab – insbesondere auf sein Smartphone-Verhalten und sein Aussehen, die klassischen Indikatoren für Untreue.", 10);
    addText("21. \"Du hast dein Handy-Passwort geändert, oder? Ich wollte nur kurz nach dem Wetter schauen.\"", 10, true);
    addText("22. \"Mir ist aufgefallen, dass du dein Handy in letzter Zeit immer mit ins Badezimmer nimmst. Erwartest du einen wichtigen Anruf?\"", 10, true);
    addText("23. \"Du hast dir neue Hemden gekauft und achtest extrem auf deine Frisur in letzter Zeit. Gibt es einen neuen Dresscode bei der Arbeit?\"", 10, true);
    addText("24. \"Dein Handy hat gerade vibriert und du hast so schnell draufgeschaut. Alles in Ordnung, oder gibt es einen Notfall?\"", 10, true);
    addText("25. \"Warum legst du dein Handy eigentlich immer mit dem Display nach unten auf den Tisch?\"", 10, true);
    addText("26. \"Du bist in letzter Zeit oft so in Gedanken versunken, wenn du am Handy tippst. Mit wem schreibst du denn so intensiv?\"", 10, true);

    // Page 8
    doc.addPage();
    y = 20;
    addText("27. \"Ich habe gesehen, dass du eine neue App für Nachrichten hast (z.B. Telegram/Signal). Wofür brauchst du die?\"", 10, true);
    addText("28. \"Du gehst in letzter Zeit viel öfter ins Fitnessstudio als früher. Was hat dich so motiviert?\"", 10, true);
    addText("29. \"Du wirkst in letzter Zeit oft so gestresst, wenn du von der Arbeit kommst, aber du willst nie darüber reden. Warum schließt du mich da aus?\"", 10, true);
    addText("30. \"Mir ist aufgefallen, dass du deinen WhatsApp-Zuletzt-Online-Status verborgen hast. Hat das einen bestimmten Grund?\"", 10, true);
    addText("Der Unterschied zwischen normaler Müdigkeit und defensivem Ärger:", 12, true);
    addText("Wenn ein treuer Mann genervt ist, sagt er vielleicht: \"Schatz, ich bin einfach müde, lass mich kurz in Ruhe.\" Er ist entspannt, nur erschöpft. Ein untreuer Mann wird persönlich und angreifend. Er wird versuchen, Ihnen ein schlechtes Gewissen einzureden: \"Du kontrollierst mich! Du bist paranoid! Ich habe überhaupt keine Privatsphäre mehr in diesem Haus!\" Diese aggressive Abwehr ist ein klassisches Ablenkungsmanöver.", 10);
    addText("Kapitel 4: TYP 4 - Fragen, die emotionale Distanz aufdecken", 16, true);

    // Page 9
    doc.addPage();
    y = 20;
    addText("Die Psychologie dahinter: Begrenzte emotionale Bandbreite", 12, true);
    addText("Emotionale Energie ist eine endliche Ressource. Wenn ein Mann diese Energie in eine andere Frau investiert (sei es durch eine physische Affäre oder eine emotionale), muss er sie zwangsläufig von Ihnen abziehen. Zudem führt die unbewusste Schuld oft dazu, dass er sich emotional distanziert, weil echte Intimität mit Ihnen ihn an seinen Verrat erinnern würde.", 10);
    addText("Diese Fragen sind tiefgründiger. Sie erfordern einen ruhigen Moment. Sie testen seine Fähigkeit, emotionale Nähe zuzulassen und in die gemeinsame Zukunft zu blicken.", 10);
    addText("31. \"Wenn du an unsere Zukunft in fünf Jahren denkst, was siehst du da genau?\"", 10, true);
    addText("32. \"Hast du manchmal das Gefühl, dass wir uns in letzter Zeit emotional ein wenig voneinander entfernt haben?\"", 10, true);
    addText("33. \"Was ist eigentlich deine schönste Erinnerung an uns aus den letzten paar Monaten?\"", 10, true);
    addText("34. \"Gibt es etwas in unserer Beziehung, das dir im Moment fehlt oder das du dir anders wünschst?\"", 10, true);
    addText("35. \"Ich habe das Gefühl, wir reden kaum noch über tiefe Dinge. Beschäftigt dich etwas, das du mir nicht sagen möchtest?\"", 10, true);
    addText("36. \"Wenn du unsere Beziehung mit einem Wort beschreiben müsstest, wie sie genau jetzt in diesem Moment ist, welches wäre das?\"", 10, true);

    // Page 10
    doc.addPage();
    y = 20;
    addText("37. \"Fühlst du dich eigentlich noch genauso zu mir hingezogen wie am Anfang?\"", 10, true);
    addText("38. \"Gibt es Momente, in denen du dich in unserer Beziehung gefangen oder eingeengt fühlst?\"", 10, true);
    addText("39. \"Wenn wir ein Problem hätten, von dem du wüsstest, dass es mich sehr verletzen würde – würdest du es mir sagen oder es für dich behalten?\"", 10, true);
    addText("40. \"Hast du das Gefühl, dass wir noch ein Team sind, oder kämpft gerade jeder für sich allein?\"", 10, true);
    addText("Wie Sie seine Antworten analysieren:", 12, true);
    addText("Ein Mann, der eine Affäre hat, wird bei diesen Fragen extrem ausweichend reagieren. Er wird Floskeln verwenden (\"Alles ist gut, mach dir keine Sorgen\", \"Wir sind halt beide gestresst\"). Achten Sie auf seine Körpersprache: Wendet er sich von Ihnen ab? Kann er Ihnen bei diesen Fragen in die Augen sehen? Wenn er die Schuld für die Distanz sofort auf Sie schiebt (\"Du nörgelst ja nur noch\"), ist das ein Zeichen dafür, dass er seine eigene emotionale Abwesenheit rechtfertigen will.", 10);
    addText("Kapitel 5: TYP 5 - Fragen, die ein indirektes Geständnis aktivieren", 16, true);

    // Page 11
    doc.addPage();
    y = 20;
    addText("Die Psychologie dahinter: Die Illusion der Sicherheit", 12, true);
    addText("Menschen wollen ihre Geheimnisse instinktiv teilen – der Druck, eine Lüge aufrechtzuerhalten, ist enorm. Wenn Sie eine Atmosphäre schaffen, die völlig frei von Urteilen wirkt, wiegen Sie ihn in falscher Sicherheit. Er glaubt, er spricht über ein abstraktes Konzept, lässt dabei aber seinen Filter fallen und verrät seine wahren Gedanken und Taten.", 10);
    addText("Diese Fragen sind hochstrategisch. Stellen Sie sie in Momenten größter Entspannung (z.B. bei einem Glas Wein auf dem Balkon). Ihr Tonfall muss absolut ruhig, philosophisch und nicht anklagend sein.", 10);
    addText("41. \"Glaubst du, dass es Situationen gibt, in denen ein Seitensprung einer Beziehung sogar helfen kann, weil man merkt, was man am anderen hat?\"", 10, true);
    addText("42. \"Wenn du dich jemals in eine andere Frau verlieben würdest, wie würdest du es mir sagen?\"", 10, true);
    addText("43. \"Hand aufs Herz: Warst du in unserer Beziehung schon mal in einer Situation, in der du in Versuchung warst, aber widerstanden hast?\"", 10, true);
    addText("44. \"Was denkst du, ist der Hauptgrund, warum selbst glückliche Paare manchmal betrügen?\"", 10, true);
    addText("45. \"Glaubst du, dass Männer und Frauen aus unterschiedlichen Gründen fremdgehen?\"", 10, true);
    addText("46. \"Wenn jemand betrügt, denkst du, es ist immer eine bewusste Entscheidung, oder kann es einfach 'passieren'?\"", 10, true);

    // Page 12
    doc.addPage();
    y = 20;
    addText("47. \"Könntest du mit einer Lüge leben, wenn du wüsstest, dass die Wahrheit mich zerstören würde?\"", 10, true);
    addText("48. \"Glaubst du, dass Geheimnisse eine Beziehung auf Dauer vergiften, auch wenn der andere sie nie herausfindet?\"", 10, true);
    addText("49. \"Wenn du die Zeit zurückdrehen könntest, gibt es etwas in unserer Beziehung, das du anders machen würdest?\"", 10, true);
    addText("Die ultimativen Anzeichen für Untreue:", 12, true);
    addText("Hören Sie hier ganz genau hin. Normalisiert er das Betrügen? Sagt er Dinge wie: \"Naja, Männer sind halt Jäger\" oder \"Manchmal passiert es einfach, ohne dass es etwas bedeutet\"? Das ist eine Vorab-Rechtfertigung für seine eigenen Taten.", 10);
    addText("Besonders Frage 43 ist ein Meisterstück: Wenn er zugibt, dass er \"fast\" betrogen hätte oder \"in Versuchung\" war, ist dies in der klinischen Psychologie oft ein verschleiertes Geständnis. Er testet das Wasser, um zu sehen, wie Sie reagieren. Er gibt einen kleinen Teil der Wahrheit preis, um sein Gewissen zu erleichtern, ohne die vollen Konsequenzen tragen zu müssen.", 10);
    addText("Schlussfolgerung: Was nun?", 16, true);
    addText("Sie haben die Fragen gestellt. Sie haben seine Reaktionen, sein Zögern, seine Wut oder seine Ausflüchte beobachtet. Vielleicht hat sich Ihr schlimmster Verdacht erhärtet. Vielleicht haben Sie aber auch erkannt, dass seine Antworten aufrichtig waren und die Distanz andere Gründe hat.", 10);
    addText("Egal, wie das Ergebnis ausfällt: Sie haben jetzt den ultimativen Preis gewonnen. Sie haben die Wahrheit. Und mit der Wahrheit kommt der Frieden. Sie sind nicht mehr das Opfer Ihrer eigenen kreisenden Gedanken. Sie sind wieder die Herrin über Ihre Realität.", 10);

    // Page 13
    doc.addPage();
    y = 20;
    addText("Wenn die Zeichen auf Betrug stehen:", 12, true);
    addText("• Keine Panikreaktionen: Konfrontieren Sie ihn nicht sofort weinend oder schreiend. Er wird alles abstreiten.", 10);
    addText("• Fakten sammeln: Nutzen Sie Ihr neues Wissen, um gezielt (und legal) nach handfesten Beweisen zu suchen, falls Sie diese für Ihren eigenen Abschluss brauchen.", 10);
    addText("• Sichern Sie sich ab: Denken Sie an Ihre Finanzen, Ihre Wohnsituation und Ihre Kinder. Handeln Sie strategisch, nicht emotional.", 10);
    addText("• Suchen Sie sich Hilfe: Vertrauen Sie sich einer guten Freundin an oder suchen Sie professionelle psychologische oder rechtliche Beratung. Sie müssen da nicht alleine durch.", 10);
    addText("Wenn die Zeichen auf Treue stehen:", 12, true);
    addText("• Heilen Sie Ihre Angst: Erkennen Sie an, dass Ihr Bauchgefühl diesmal vielleicht durch eigene Unsicherheiten, vergangene Traumata oder allgemeinen Beziehungsstress ausgelöst wurde.", 10);
    addText("• Offene Kommunikation: Sprechen Sie die emotionale Distanz an, ohne ihn des Betrugs zu beschuldigen. Sagen Sie: \"Ich fühle mich in letzter Zeit weit weg von dir. Wie können wir wieder näher zusammenrücken?\"", 10);
    addText("• Vertrauen neu aufbauen: Vertrauen ist eine Entscheidung. Wenn er Ihnen keinen Grund gibt, an ihm zu zweifeln, erlauben Sie sich selbst, die Kontrollmechanismen loszulassen und die Beziehung wieder zu genießen.", 10);
    addText("Denken Sie immer daran: Ihr Wert als Frau wird nicht durch das Verhalten eines Mannes definiert. Ein Betrug ist niemals Ihre Schuld – es ist eine bewusste Entscheidung, die er getroffen hat, basierend auf seinen eigenen Defiziten. Sie sind stark, Sie sind scharfsinnig, und Sie haben das Recht auf eine Liebe, die ehrlich, loyal und transparent ist.", 10);
    addText("Ihr Michael Wagner", 10, true);

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
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Flipbook Preview */}
                <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 px-4 pt-2">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Interaktive Vorschau
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Flipbook Modus</span>
                  </div>
                  <iframe 
                    allowFullScreen={true} 
                    allow="clipboard-write" 
                    scrolling="no" 
                    className="fp-iframe w-full rounded-2xl" 
                    style={{ border: "1px solid #f3f4f6", height: "500px" }} 
                    src="https://heyzine.com/flip-book/32748b4d89.html"
                  ></iframe>
                </div>

                {/* Download Card */}
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{RESOURCES[0].title}</h2>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                    {RESOURCES[0].description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center justify-center gap-8 border border-gray-100 max-w-md mx-auto">
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
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3 group mx-auto"
                  >
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    Offline-Version herunterladen (PDF)
                  </button>
                  
                  <p className="mt-6 text-xs text-gray-400">
                    Diskretion garantiert • Sicherer Download • PDF Format
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
