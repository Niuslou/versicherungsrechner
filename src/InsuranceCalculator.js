import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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

const carValues = {
  'A3': 30000, 'A4': 35000, 'A6': 40000, 'Q5': 45000, 'Q7': 50000,
  'X1': 32000, 'X3': 37000, 'X5': 42000, 'M3': 48000, 'M4': 52000,
  'A-Class': 28000, 'C-Class': 33000, 'E-Class': 38000, 'GLE': 45000, 'GLS': 50000,
  'Golf': 25000, 'Passat': 30000, 'Tiguan': 35000, 'Polo': 20000, 'Jetta': 28000,
  'Corolla': 22000, 'Camry': 30000, 'RAV4': 28000, 'Highlander': 35000, 'Yaris': 18000,
  'Civic': 24000, 'Accord': 30000, 'CR-V': 32000, 'Pilot': 38000, 'Fit': 20000,
  'Fiesta': 18000, 'Focus': 22000, 'Mustang': 45000, 'Escape': 30000, 'Explorer': 40000,
  'Altima': 26000, 'Sentra': 22000, 'Maxima': 35000, 'Rogue': 28000, 'Pathfinder': 40000,
};

const InsuranceCalculator = () => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('');
  const [leased, setLeased] = useState('');
  const [specialEquipmentValue, setSpecialEquipmentValue] = useState(0);
  const [usage, setUsage] = useState([]);
  const [annualKilometers, setAnnualKilometers] = useState(0);
  const [driverAge, setDriverAge] = useState('');
  const [accidentCount, setAccidentCount] = useState(0);
  const [licenseDate, setLicenseDate] = useState('');
  const [vehicleValue, setVehicleValue] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    if (brand.length > 2) {
      const filtered = Object.keys(carData).filter((key) =>
        key.toLowerCase().includes(brand.toLowerCase())
      );
      setFilteredBrands(filtered);
    } else {
      setFilteredBrands([]);
    }
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setModels(carData[brand]);
    setFilteredBrands([]);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setVehicleValue(carValues[model]);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCalculateInsurance = () => {
    const cost = calculateInsuranceCost();
    setInsuranceCost(cost);
    setStep(step + 1);
  };

  const calculateInsuranceCost = () => {
    let baseCost = 500; // Beispielbasispreis für die Versicherung

    // Berechnungsfaktoren basierend auf Alter, Unfällen, Fahrzeugwert, etc.
    const ageFactor = driverAge < 25 ? 1.5 : 1.0;
    const accidentFactor = 1 + (accidentCount * 0.1);
    const vehicleValueFactor = vehicleValue / 20000;

    // Gesamtfaktor
    const totalFactor = ageFactor * accidentFactor * vehicleValueFactor;

    // Berechnen der Versicherungskosten
    const insuranceCost = baseCost * totalFactor;

    return insuranceCost;
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Insurance Calculator</Link>
          <ul className="navbar-menu">
            <li className="navbar-item"><Link to="/">Home</Link></li>
            <li className="navbar-item"><a href="#">Link</a></li>
            <li className="navbar-item"><a href="#">Dropdown</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="progress-bar-container">
          <div className={`progress-step ${step >= 1 ? 'completed' : ''}`}>
            <div className="circle">{step > 1 ? <span>&#10003;</span> : <span>1</span>}</div>
            <div className="label">Fahrzeug</div>
          </div>
          <div className={`progress-step ${step >= 2 ? 'completed' : ''}`}>
            <div className="circle">{step > 2 ? <span>&#10003;</span> : <span>2</span>}</div>
            <div className="label">Nutzung</div>
          </div>
          <div className={`progress-step ${step >= 3 ? 'completed' : ''}`}>
            <div className="circle">{step > 3 ? <span>&#10003;</span> : <span>3</span>}</div>
            <div className="label">Fahrer</div>
          </div>
          <div className={`progress-step ${step >= 4 ? 'completed' : ''}`}>
            <div className="circle">{step > 4 ? <span>&#10003;</span> : <span>4</span>}</div>
            <div className="label">Ergebnis</div>
          </div>
        </div>

        {step === 1 && (
          <form>
            <div className="form-group">
              <label htmlFor="brand">Marke</label>
              <input
                type="text"
                id="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                className="form-control"
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
              <label htmlFor="model">Modell</label>
              <select
                id="model"
                value={selectedModel}
                onChange={handleModelChange}
                className="form-control"
              >
                <option value="">Modell auswählen</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="purchaseYear">Baujahr</label>
              <input
                type="number"
                id="purchaseYear"
                value={purchaseYear}
                onChange={(e) => setPurchaseYear(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Leasing</label>
              <div>
                <input
                  type="radio"
                  id="leasedYes"
                  name="leased"
                  value="yes"
                  checked={leased === 'yes'}
                  onChange={(e) => setLeased(e.target.value)}
                />
                <label htmlFor="leasedYes">Ja</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="leasedNo"
                  name="leased"
                  value="no"
                  checked={leased === 'no'}
                  onChange={(e) => setLeased(e.target.value)}
                />
                <label htmlFor="leasedNo">Nein</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialEquipmentValue">Wert der Sonderausstattung</label>
              <input
                type="number"
                id="specialEquipmentValue"
                value={specialEquipmentValue}
                onChange={(e) => setSpecialEquipmentValue(e.target.value)}
                className="form-control"
              />
            </div>

            <Button onClick={handleNextStep}>Weiter</Button>
          </form>
        )}

        {step === 2 && (
          <form>
            <div className="form-group">
              <label htmlFor="usage">Nutzung</label>
              <div>
                <input
                  type="checkbox"
                  id="commuting"
                  value="commuting"
                  checked={usage.includes('commuting')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setUsage((prev) =>
                      checked ? [...prev, value] : prev.filter((u) => u !== value)
                    );
                  }}
                />
                <label htmlFor="commuting">Pendeln</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="business"
                  value="business"
                  checked={usage.includes('business')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setUsage((prev) =>
                      checked ? [...prev, value] : prev.filter((u) => u !== value)
                    );
                  }}
                />
                <label htmlFor="business">Geschäftlich</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="personal"
                  value="personal"
                  checked={usage.includes('personal')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setUsage((prev) =>
                      checked ? [...prev, value] : prev.filter((u) => u !== value)
                    );
                  }}
                />
                <label htmlFor="personal">Privat</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="annualKilometers">Jährliche Kilometerleistung</label>
              <input
                type="number"
                id="annualKilometers"
                value={annualKilometers}
                onChange={(e) => setAnnualKilometers(e.target.value)}
                className="form-control"
              />
            </div>

            <Button onClick={handlePreviousStep}>Zurück</Button>
            <Button onClick={handleNextStep}>Weiter</Button>
          </form>
        )}

        {step === 3 && (
          <form>
            <div className="form-group">
              <label htmlFor="driverAge">Alter des Fahrers</label>
              <input
                type="number"
                id="driverAge"
                value={driverAge}
                onChange={(e) => setDriverAge(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accidentCount">Anzahl der Unfälle in den letzten 5 Jahren</label>
              <input
                type="number"
                id="accidentCount"
                value={accidentCount}
                onChange={(e) => setAccidentCount(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="licenseDate">Datum des Führerscheinerwerbs</label>
              <input
                type="date"
                id="licenseDate"
                value={licenseDate}
                onChange={(e) => setLicenseDate(e.target.value)}
                className="form-control"
              />
            </div>

            <Button onClick={handlePreviousStep}>Zurück</Button>
            <Button onClick={handleCalculateInsurance}>Versicherung berechnen</Button>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2>Ergebnis</h2>
            <p>Die berechneten Versicherungskosten betragen: {insuranceCost.toFixed(2)} €</p>
            <Button onClick={handlePreviousStep}>Zurück</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceCalculator;
