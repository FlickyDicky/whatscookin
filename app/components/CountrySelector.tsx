// components/CountrySelector.tsx
import { useState, useEffect } from 'react';

export interface Country {
    cca2: string;
    name: {
      common: string;
    };
  }

interface CountrySelectorProps {
  onCountrySelect: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Country[] = await response.json();

        const sortedCountries = data.sort((a, b) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        });
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    onCountrySelect(countryCode);
  };

  return (
    <div>
      <select value={selectedCountry} onChange={handleChange} className='w-full select select-bordered' required>
        <option value="" disabled>Select a country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
