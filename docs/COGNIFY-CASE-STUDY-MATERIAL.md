# Cognify: Material für die Case Study

_Stand: 26.09.2026. Die Case Study ist auf dieser Grundlage veröffentlicht. Nichts darf über diese Quellen hinausgehen, ohne dass Henri es bestätigt._

## Rahmen

- Hochschule Ansbach, Studiengang VIS, 6. Semester, „Projekt 1“ im Sommersemester 2024. Betreuer: Prof. Florian Machill. Abgabe 01.08.2024.
- Thema laut Deckblatt: Entwurf eines UX/UI-Konzepts und Prototyps für eine E-Learning-Anwendung mit Augmented-Reality-Implementierung.
- Einzelarbeit (Eigenständigkeitserklärung, Dokumentation allein verfasst). Noch von Henri zu bestätigen.
- Vorgehen nach Design Thinking.

## Quellen (privat, nicht im Repo)

Ordner `E:\HS Ansbach Dokumente\Alte Kurse, Abgaben\Projekt1SS24\Projekt1_HenriLoehlein\Abgabe\` (identisch mit `Projekt1_HenriLoehlein.zip`):

| Datei / Ordner | Inhalt |
|---|---|
| `Projektdokumentation_HenriLoehlein_Projekt1.pdf` | 53 Seiten, Hauptquelle für alle Aussagen |
| `UserResearch_…/` | 3 Personas (JPG, 3508 px breit) und 3 Journey Maps (JPG, nur 960 × 540) |
| `Evaluation_…/Nutzer1–6_Evaluation.mp4` | Aufzeichnungen der sechs Usability-Tests (Inhalt noch nicht gesichtet) |
| `Marker/` | Druckvorlagen Herz und Kolosseum (PDF, PSD), Vuforia-Targets, 3D-Modelle (FBX) |
| `Unity_ARAnwendung/CognifyAR_Unity/` | Unity-Projekt mit Vuforia Engine, Build `CognifyAR.apk` |
| `Prototyp_Wireframes/*.fig` | Abgabestand von Hi-Fi (110 MB) und Lo-Fi vom 31.07.2024 |

Figma (Konto henriloehlein, Starter-Plan, lesende MCP-Zugriffe stark begrenzt):

- Hi-Fi: `1MaW028fzI7VRY7NTs6BaA`, rund 120 Frames à 390 × 844
- Lo-Fi: `KYg4gZFrOjdcKPoExk6NMd`, rund 30 Frames à 390 × 844
- `Prototyp_Projekt1SS24` (`iVpxlERpdsdrGTsDI7Kifn`) ist eine Kopie der Hi-Fi-Datei; nur die Farbfelder liegen woanders.

Verwendete Bildquellen: Hi-Fi-Screens und AR-Aufnahmen aus Henris Ordner `C:\Users\henri\Desktop\P1SS24Screens\` (vollständige Originale, die Figma-Datei ist nicht mehr ganz vollständig). Die Lo-Fi-Screens stammen aus einem einzigen Screenshot der ganzen Lo-Fi-Seite (Node `0:1`), lokal zugeschnitten. Bisher verbrauchte lesende Figma-Zugriffe: 5.

Wichtige Hi-Fi-Frames (Node-IDs für spätere Exporte): Willkommensscreen1–4 `4:71`, `7:144`, `9:270`, `9:394` · Jetzt loslegen `11:2` · Log In `11:77` · Registrieren `11:154` · Interessensgebiete `11:240` · MainScreen1 `22:3` · LernenFortsetzenMain `85:16` · NeuesEntdeckenMain `86:293` · Suche `200:1080` · CommunityMain `170:2107` · CommunityFreunde `171:2459` · CommunityForum `173:898` · CommunityGruppen `173:1158` · Fortschritt `186:1065` · Kursfortschritt `192:946` · Erfolge `193:947` · Sozial `198:969` · NeuesIntro (Kurs-Preview mit Lernmethoden) ab `259:1146` · NeuesImKurs ab `103:1152` · KolosseumQuiz ab `122:700` · KolosseumAbschluss `167:901` · Anatomie-Kapitel `93:39`, `154:205`, `154:277`, `154:361` · Settings `25:460` · Barrierefreiheit `62:348` · DarkmodeDark `103:1070`.

## Belegte Inhalte aus der Dokumentation

**Wettbewerbsanalyse.** Serlo, My Daily Input, Studyflix und WDR AR 1933–1945 nach sieben Kriterien bewertet, Netzdiagramm. Ergebnis: Angebote zielen fast nur auf Schule, Studium oder Beruf; AR-Lernapps sind thematisch eng und meist für Kinder. Für Alltagsnutzende mit allgemeinem Wissensdrang wurde kein Angebot gefunden.

**Stakeholder-Analyse und Geschäftsmodell.** Tabelle mit sechs Gruppen; Freemium mit Werbung oder werbefreiem Abo. Eher theoretisch.

**Umfrage (20 Teilnehmende, Google Forms).**
- 80 % nutzen visuelle Medien zum Lernen, 50 % interaktive Lernplattformen.
- 70 % nennen Motivationsprobleme als größtes Hindernis, danach Verständlichkeit (40 %) und Technik (30 %).
- Flüssige Bedienung: 85 % bewerten mit 4 oder 5.
- Community: 60 % halten sie für völlig unwichtig (Wert 1).
- AR-Nutzen im Mittel 3,05 von 5; 11 von 20 nannten konkrete Einsatzideen, meist Visualisierung komplexer Inhalte. Zitat: „mit visueller Darstellung lernt man oft nicht nur auswendig, sondern versteht es wirklich.“

**Personas.** Anna Schmidt (Grundschullehrerin und Mutter, Berlin), Michael Hoffmann (45, Steuerberater, Düsseldorf, Wissensdrang, wenig Zeit), Nicole Lechner (23, Marketingassistentin, Bayreuth, viel Freizeit, Motivationsprobleme). Je eine Journey Map in fünf Phasen.

**Synthese (Leitsatz).** Nutzende legen Wert auf intuitive Bedienung, ansprechende Gestaltung und viele interaktive Funktionen, flexible Nutzung und hochwertige Inhalte.

**Ideenfindung.** Wissenspakete als kompakte Kurse mit Quiz, Video und AR; Community gegen Motivationsprobleme (bewusst trotz geringer Umfragezustimmung); Gamification über Fortschritt, Level und Herausforderungen.

**Lo-Fi.** Willkommensscreens („Lerne, was, wie, wo und mit wem du willst“), Gastzugang, Pflichtauswahl mindestens eines Interessengebiets, Mainscreen nach Jakob’s Law (Logo führt zur Startseite, Profilbild zu Konto und Einstellungen), Fortschrittsleiste mit Freunden, zwei horizontale Kurslisten, Buttons Community und Suche. Ein Tutorial wurde getestet und verworfen.

**Hi-Fi, Änderungen gegenüber Lo-Fi.** Eingabefelder als Textzeilen statt Boxen (außer Suche), deaktivierter Weiter-Pfeil bis alle Bedingungen erfüllt sind, Levelanzeige mit Freunden höher und niedriger, Kurskarten mit Prozentwert statt Balken plus Dauer und Schwierigkeit, kontrastreicheres Farbschema, Kurs-Preview mit Kapitelübersicht und Wahl der Lernmethoden (Text, Darstellungen, Videos, Aufgaben, AR), Erfahrungspunkte-System.

**AR-Umsetzung.** Eigene Unity-App mit Vuforia Engine; gedruckte Bildmarker für Herz und Kolosseum; 3D-Modelle von TurboSquid beziehungsweise einem Modellportal (Quellen in der Dokumentation).

**Evaluation.** Die geplante quantitative Remote-Evaluation scheiterte, weil Figma für Testpersonen ein Konto verlangte. Stattdessen doppelt so viele qualitative Tests: sechs Personen (22 bis 65 Jahre) statt drei, zehn statt fünf Aufgaben, Thinking Aloud, Tablet und gedruckte Marker vor Ort, Abschlussgespräch.

Lösbarkeit je Aufgabe (Mittel aus sechs Bewertungen von 0 bis 10):

| Aufgabe | Ø |
|---|---|
| 1 Konto erstellen, Interessen wählen | 10,0 |
| 2 Kurs Kolosseum mit Quiz | 10,0 |
| 3 Lernmethoden im laufenden Kurs ändern | 5,8 |
| 4 Freunde mit höherem und niedrigerem Level finden | 5,3 |
| 5 Meilensteine finden | 6,2 |
| 6 Position in der globalen Rangliste | 8,5 |
| 7 Profil eines Freundes öffnen | 8,8 |
| 8 Eigene Gruppen finden | 9,2 |
| 9 Themenpräferenzen ändern | 7,0 |
| 10 Darkmode aktivieren | 8,5 |

Abschlussbewertung (Ø von 10): Übersichtlichkeit 8,8 · Bedienbarkeit 8,2 · Optik 9,7 · Lerneffekt 9,5.

Zentrale Befunde: Kurse und Quiz für alle mühelos; die AR-Funktion übersahen fünf von sechs Personen beim Überfliegen der Kurstexte; zu kleine Touch-Ziele (teils Figma-Hitboxen); Lernmethoden im Kurs kaum auffindbar; Swipe-Zurück für Ältere unklar, Wunsch nach Zurück-Pfeil; „Suche“ als globale Suche missverstanden; Jüngere verstanden die Informationsarchitektur deutlich schneller; horizontale Karussells luden zum vertikalen Scrollen ein.

Abgeleitete, damals nicht umgesetzte Optimierungen: Schriftgröße und Touch-Ziele anpassbar beziehungsweise größer, Drei-Punkte-Menü neben dem Kurstitel für Lernmethoden, optionales Tutorial beim ersten Start, Button „Kurssuche“ statt „Suche“.

## Entscheidungen (26.09.2026)

- Die Befunde aus dem Test werden in 3 bis 5 überarbeiteten Screens umgesetzt, klar gekennzeichnet als spätere Überarbeitung.
- Figma: Henri importiert zuerst den Abgabestand (`.fig`) und prüft, ob die Bilder vollständig sind. Danach reparieren wir gezielt.
- Testvideos: Die Kamera steht auf Tischhöhe, die Bildqualität ist gering, in einzelnen Videos sind Gesichter zu sehen, und getestet wurde am Smartphone. Für die Case Study nicht geeignet. AR-Bildmaterial kommt aus den vorhandenen Fotos oder aus neuen Aufnahmen mit der APK.
- Stakeholder-Analyse und Geschäftsmodell fließen nicht in die Case Study ein.

## Hinweise für spätere Arbeit

- Aufgabe 3: Laut Text lösten nur zwei von sechs Personen die Aufgabe, die Einzelwerte ergeben 5,8. Henri hat freigegeben, den Durchschnitt zu zeigen und im Text nur qualitativ zu formulieren („gelang selten auf direktem Weg“).
- Die Figma-Datei ist nicht vollständig, auch nicht im importierten Abgabestand. Maßgeblich sind die Originalscreens aus `P1SS24Screens`.
- Testpersonen nur anonym nennen (Alter und Tätigkeit, keine Vornamen).
- Offen und optional: Abschnitt „Überarbeitung“ mit AR-Karte im Kapitel, Zurück-Pfeil und Drei-Punkte-Menü im Kurs, „Kurssuche“ und größeren Touch-Zielen auf der Startseite, größeren Quiz-Antwortflächen, eventuell einem Tutorial.
