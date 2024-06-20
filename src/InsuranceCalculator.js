import React, { useState } from 'react';
import './App.css'; // Nutzen Sie die vorhandene App.css-Datei

const carData = {
  Audi: ['A3', 'A4', 'A6', 'Q5', 'Q7'],
  BMW: ['X1', 'X3', 'X5', 'M3', 'M4'],
  Mercedes: ['A-Class', 'C-Class', 'E-Class', 'GLE', 'GLS'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Polo', 'Jetta'],
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Yaris'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
  Ford: ['Fiesta', 'Focus', 'Mustang', 'Escape', 'Explorer'],
  Nissan: ['Altima', 'Sentra', 'Maxima', 'Rogue', 'Pathfinder'],
};

const carValues = {'A3': 30000, 'A4': 35000, 'A6': 40000, 'Q5': 45000, 'Q7': 50000, 'X1': 32000, 'X3': 37000, 'X5': 42000, 'M3': 48000, 'M4': 52000, 'A-Class': 28000, 'C-Class': 33000, 'E-Class': 38000, 'GLE': 45000, 'GLS': 50000, 'Golf': 25000, 'Passat': 30000, 'Tiguan': 35000, 'Polo': 20000, 'Jetta': 28000, 'Corolla': 22000, 'Camry': 30000, 'RAV4': 28000, 'Highlander': 35000, 'Yaris': 18000, 'Civic': 24000, 'Accord': 30000, 'CR-V': 32000, 'Pilot': 38000, 'Fit': 20000, 'Fiesta': 18000, 'Focus': 22000, 'Mustang': 45000, 'Escape': 30000, 'Explorer': 40000, 'Altima': 26000, 'Sentra': 22000, 'Maxima': 35000, 'Rogue': 28000, 'Pathfinder': 40000,
};


const InsuranceCalculator = () => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('');
  const [leased, setLeased] = useState('');
  const [specialEquipmentValue, setSpecialEquipmentValue] = useState(0); // Default-Wert auf 0 geändert
  const [usage, setUsage] = useState([]);
  const [annualKilometers, setAnnualKilometers] = useState(0); // Default-Wert auf 0 geändert
  // Fahrerdaten
  const [driverAge, setDriverAge] = useState('');
  const [accidentCount, setAccidentCount] = useState(0); // Variable für Unfallanzahl
  const [licenseDate, setLicenseDate] = useState('');
  const [vehicleValue, setVehicleValue] = useState(0);


  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    if (brand.length > 2) {
      const filtered = Object.keys(carData).filter(
        (b) => b.toLowerCase().includes(brand.toLowerCase())
      );
      setFilteredBrands(filtered);
    } else {
      setFilteredBrands([]);
    }
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setFilteredBrands([]);
    setModels(carData[brand] || []);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    // Hier den Wert des ausgewählten Modells setzen
    setVehicleValue(carValues[model] || 0);
  };

  const handleUsageChange = (e) => {
    const value = e.target.value;
    setUsage((prev) =>
      prev.includes(value) ? prev.filter((u) => u !== value) : [...prev, value]
    );
  };

  const isFormValid = () => {
    const isYearValid = /^\d{4}$/.test(purchaseYear);
    const isSpecialEquipmentValueValid = /^\d+$/.test(specialEquipmentValue);
    const isKilometersValid = /^\d+$/.test(annualKilometers);
    return (
      selectedBrand &&
      selectedModel &&
      isYearValid &&
      leased &&
      isSpecialEquipmentValueValid &&
      usage.length > 0 &&
      isKilometersValid
    );
  };

  const handleNextStep = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isFormValid()) {
      setStep(step + 1);
    }
  };

  // Funktion für die Formatierung von Währung
const formattedCurrency = (amount) => {
  return `${amount.toFixed(2)} CHF`;
};
const calculateInsuranceCost = () => {
  // Basispreis für die Versicherung
  let baseCost = 500; // Beispielbasispreis

  // Faktor basierend auf dem Alter des Fahrers
  const ageFactor = calculateAgeFactor(driverAge);

  // Faktor basierend auf der Anzahl der Unfälle
  const accidentFactor = calculateAccidentFactor(accidentCount);

  // Faktor basierend auf dem Fahrzeugwert
  const vehicleValueFactor = calculateVehicleValueFactor(vehicleValue);

  // Gesamtfaktor
  const totalFactor = ageFactor * accidentFactor * vehicleValueFactor;

  // Berechnen der Versicherungskosten
  const insuranceCost = baseCost * totalFactor;

  return insuranceCost;
};

// Beispiel für die Berechnung des Altersfaktors
const calculateAgeFactor = (age) => {
  if (age < 25) {
    return 1.5; // Beispielhaft erhöhter Faktor für junge Fahrer
  } else {
    return 1.0; // Normaler Faktor für ältere Fahrer
  }
};

// Beispiel für die Berechnung des Unfallfaktors
const calculateAccidentFactor = (accidents) => {
  if (accidents === 0) {
    return 0.8; // Beispielhaft niedrigerer Faktor für keine Unfälle
  } else if (accidents === 1) {
    return 1.2; // Beispielhaft erhöhter Faktor für einen Unfall
  } else {
    return 1.5; // Beispielhaft weiter erhöhter Faktor für mehrere Unfälle
  }
};

// Beispiel für die Berechnung des Fahrzeugwertfaktors
const calculateVehicleValueFactor = (value) => {
  if (value < 20000) {
    return 0.8; // Beispielhaft niedrigerer Faktor für günstige Fahrzeuge
  } else if (value >= 20000 && value < 40000) {
    return 1.0; // Normaler Faktor für mittelpreisige Fahrzeuge
  } else {
    return 1.2; // Beispielhaft erhöhter Faktor für teure Fahrzeuge
  }
};

const calculateInsurance = (e) => {
  e.preventDefault(); // Verhindert die Standardformularübermittlung
  if (isFormValid()) {
    const insuranceCost = calculateInsuranceCost();
    alert(`Die geschätzten Versicherungskosten betragen: ${formattedCurrency(insuranceCost)}`);
  }
};



  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="insurance-calculator">
      <div className="progress-bar">
        <div className={`step ${step === 1 ? 'active' : ''}`}>1. Fahrzeugdaten</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>2. Fahrerdaten</div>
      </div>
      {step === 1 && (
        <div>
          <h1>Autoversicherungsrechner</h1>
          <form className="insurance-form" onSubmit={handleNextStep}>
            <div className="form-group">
              <label htmlFor="brand">Automarke:</label>
              <input
                type="text"
                id="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                placeholder="Geben Sie eine Marke ein"
              />
              {filteredBrands.length > 0 && (
                <ul className="autocomplete-list">
                  {filteredBrands.map((brand) => (
                    <li key={brand} onClick={() => handleBrandSelect(brand)}>
                      {brand}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="model">Automodell:</label>
              <select id="model" value={selectedModel} onChange={handleModelChange}>
                <option value="">Wählen Sie ein Modell</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="purchaseYear">Kaufjahr:</label>
              <input
                type="text"
                id="purchaseYear"
                value={purchaseYear}
                onChange={(e) => setPurchaseYear(e.target.value)}
                placeholder="JJJJ"
              />
            </div>
            <div className="form-group">
              <label>Ist das Fahrzeug geleast?</label>
              <div className="radio-buttons">
                <input
                  type="radio"
                  id="leasedYes"
                  name="leased"
                  value="Ja"
                  onChange={(e) => setLeased(e.target.value)}
                />
                <label htmlFor="leasedYes">Ja</label>
                <input
                  type="radio"
                  id="leasedNo"
                  name="leased"
                  value="Nein"
                  onChange={(e) => setLeased(e.target.value)}
                />
                <label htmlFor="leasedNo">Nein</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="specialEquipmentValue">Wert der Sonderausstattung (in CHF):</label>
              <input
                type="text"
                id="specialEquipmentValue"
                value={specialEquipmentValue}
                onChange={(e) => setSpecialEquipmentValue(parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Wie nutzen Sie Ihr Fahrzeug?</label>
              <div className="checkboxes">
                <input
                  type="checkbox"
                  id="business"
                  value="geschäftlich"
                  onChange={handleUsageChange}
                />
                <label htmlFor="business">geschäftlich</label>
                <input
                  type="checkbox"
                  id="private"
                  value="privat"
                  onChange={handleUsageChange}
                />
                <label htmlFor="private">privat</label>
                <input
                  type="checkbox"
                  id="commute"
                  value="arbeitsweg"
                  onChange={handleUsageChange}
                />
                <label htmlFor="commute">arbeitsweg</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="annualKilometers">Kilometer pro Jahr:</label>
              <input
                type="range"
                id="annualKilometers"
                min="0"
                max="50"
                step="1"
                value={annualKilometers / 1000} // Divide by 1000 to display correctly
                onChange={(e) => setAnnualKilometers(parseInt(e.target.value) * 1000)}
              />
              <span className="range-value">{annualKilometers.toLocaleString()} km</span>
            </div>
            <button type="submit" disabled={!isFormValid()} className="btn btn-primary">
              Weiter
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
  <div>
    <h1>Fahrerdaten</h1>
    <form className="insurance-form" onSubmit={handleNextStep}>
      <div className="form-group">
        <label htmlFor="driverAge">Alter des Fahrers:</label>
        <input
          type="text"
          id="driverAge"
          value={driverAge}
          onChange={(e) => setDriverAge(e.target.value)}
          placeholder="Alter in Jahren"
        />
      </div>
      <div className="form-group">
        <label htmlFor="accidentsCount">Anzahl der Unfälle in den letzten 3 Jahren:</label>
        <input
          type="text"
          id="accidentsCount"
          value={accidentCount}
          onChange={(e) => setAccidentCount(e.target.value)}
          placeholder="Anzahl der Unfälle"
        />
      </div>
      <div className="form-group">
        <label htmlFor="licenseDate">Datum der Fahrprüfung:</label>
        <input
          type="text"
          id="licenseDate"
          value={licenseDate}
          onChange={(e) => setLicenseDate(e.target.value)}
          placeholder="DD.MM.YYYY"
        />
      </div>
      <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
        Zurück 
      </button>
      <button onClick={calculateInsurance} disabled={!isFormValid()} className="btn btn-primary">
        Versicherung berechnen
      </button>

    </form>
  </div>
)}

    </div>
  );
};

export default InsuranceCalculator;
