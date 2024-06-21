Versicherungsrechner
Dies ist eine einfache React-Anwendung zur Berechnung der Versicherungskosten basierend auf verschiedenen Benutzereingaben. Die App ermöglicht es den Benutzern, Details zu ihrem Fahrzeug, der Nutzung und den Fahrinformationen einzugeben, um ihre Versicherungskosten zu schätzen.

Inhaltsverzeichnis
Funktionen
Installation
Verwendung
Komponenten
Styling
Funktionen
Schritt-für-Schritt-Formular: Ein mehrstufiges Formular zum Sammeln von Informationen über das Fahrzeug, die Nutzung und den Fahrer.
Autocomplete-Marken-Auswahl: Autocomplete-Funktionalität zur Auswahl von Automarken.
Dynamische Modellauswahl: Dynamisches Dropdown-Menü zur Auswahl von Automodellen basierend auf der ausgewählten Marke.
Berechnung der Versicherungskosten: Berechnet die Versicherungskosten basierend auf den Benutzereingaben.
Responsive Design: Mobile-optimiert für verschiedene Geräte.
Installation
Klonen Sie das Repository:

bash
Code kopieren
git clone https://github.com/IhrBenutzername/versicherungsrechner.git
Navigieren Sie in das Projektverzeichnis:

bash
Code kopieren
cd versicherungsrechner
Installieren Sie die Abhängigkeiten:

bash
Code kopieren
npm install
Starten Sie die Anwendung:

bash
Code kopieren
npm start
Verwendung
Starten Sie die Anwendung und öffnen Sie den Browser unter http://localhost:3000.
Navigieren Sie zur Startseite und klicken Sie auf "Berechnung starten".
Füllen Sie die Formulare in den einzelnen Schritten aus:
Schritt 1: Fahrzeugdetails eingeben.
Schritt 2: Nutzungsdetails eingeben.
Schritt 3: Fahrerdetails eingeben.
Schritt 4: Versicherungskosten anzeigen.
Komponenten
App.js: Hauptkomponente, die den Router und die Routen definiert.
Home.js: Startseite der Anwendung.
InsuranceCalculator.js: Mehrstufiges Formular zur Eingabe der Versicherungsdaten.
App.js
Die App-Komponente ist die Hauptkomponente der Anwendung, die die Navigation zwischen den Seiten ermöglicht.

Home.js
Die Home-Komponente ist die Startseite der Anwendung, die eine Einführung und einen Button zum Starten der Berechnung enthält.

InsuranceCalculator.js
Die InsuranceCalculator-Komponente ist das mehrstufige Formular, in dem die Benutzer ihre Informationen eingeben. Sie enthält die Logik zur Berechnung der Versicherungskosten.

Styling
Die Anwendung verwendet CSS für das Styling. Die wichtigsten Styles sind in der Datei App.css definiert.

Wichtige CSS-Klassen
navbar: Stilisiert die Navigationsleiste.
container: Zentriert den Inhalt und setzt die maximale Breite.
home-container: Stilisiert den Hauptinhalt der Startseite.
form-group: Stilisiert die Formulareingaben.
progress-bar-container: Stilisiert die Fortschrittsanzeige des mehrstufigen Formulars.
button: Stilisiert die Schaltflächen.







