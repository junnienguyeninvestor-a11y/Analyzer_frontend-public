import { useState, useEffect } from 'react';

// Simple version that only accepts countries as props
const SimpleCountryClock = ({ countries }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Country to timezone mapping (simplified)
const countryToTimezone = {
  // Africa
  'Algeria': 'Africa/Algiers',
  'Angola': 'Africa/Luanda',
  'Benin': 'Africa/Porto-Novo',
  'Botswana': 'Africa/Gaborone',
  'Burkina Faso': 'Africa/Ouagadougou',
  'Burundi': 'Africa/Bujumbura',
  'Cameroon': 'Africa/Douala',
  'Cape Verde': 'Atlantic/Cape_Verde',
  'Central African Republic': 'Africa/Bangui',
  'Chad': 'Africa/Ndjamena',
  'Comoros': 'Indian/Comoro',
  'Congo (Brazzaville)': 'Africa/Brazzaville',
  'Congo (Kinshasa)': 'Africa/Kinshasa',
  'Djibouti': 'Africa/Djibouti',
  'Egypt': 'Africa/Cairo',
  'Equatorial Guinea': 'Africa/Malabo',
  'Eritrea': 'Africa/Asmara',
  'Eswatini': 'Africa/Mbabane',
  'Ethiopia': 'Africa/Addis_Ababa',
  'Gabon': 'Africa/Libreville',
  'Gambia': 'Africa/Banjul',
  'Ghana': 'Africa/Accra',
  'Guinea': 'Africa/Conakry',
  'Guinea-Bissau': 'Africa/Bissau',
  'Ivory Coast': 'Africa/Abidjan',
  'Kenya': 'Africa/Nairobi',
  'Lesotho': 'Africa/Maseru',
  'Liberia': 'Africa/Monrovia',
  'Libya': 'Africa/Tripoli',
  'Madagascar': 'Indian/Antananarivo',
  'Malawi': 'Africa/Blantyre',
  'Mali': 'Africa/Bamako',
  'Mauritania': 'Africa/Nouakchott',
  'Mauritius': 'Indian/Mauritius',
  'Morocco': 'Africa/Casablanca',
  'Mozambique': 'Africa/Maputo',
  'Namibia': 'Africa/Windhoek',
  'Niger': 'Africa/Niamey',
  'Nigeria': 'Africa/Lagos',
  'Rwanda': 'Africa/Kigali',
  'Sao Tome and Principe': 'Africa/Sao_Tome',
  'Senegal': 'Africa/Dakar',
  'Seychelles': 'Indian/Mahe',
  'Sierra Leone': 'Africa/Freetown',
  'Somalia': 'Africa/Mogadishu',
  'South Africa': 'Africa/Johannesburg',
  'South Sudan': 'Africa/Juba',
  'Sudan': 'Africa/Khartoum',
  'Tanzania': 'Africa/Dar_es_Salaam',
  'Togo': 'Africa/Lome',
  'Tunisia': 'Africa/Tunis',
  'Uganda': 'Africa/Kampala',
  'Zambia': 'Africa/Lusaka',
  'Zimbabwe': 'Africa/Harare',

  // North America
  'Antigua and Barbuda': 'America/Barbados',
  'Bahamas': 'America/Nassau',
  'Barbados': 'America/Barbados',
  'Belize': 'America/Belize',
  'Canada': 'America/Toronto', // varies by region
  'Cuba': 'America/Havana',
  'Dominica': 'America/Dominica',
  'Dominican Republic': 'America/Santo_Domingo',
  'El Salvador': 'America/El_Salvador',
  'Grenada': 'America/Port_of_Spain',
  'Guatemala': 'America/Guatemala',
  'Haiti': 'America/Port-au-Prince',
  'Honduras': 'America/Tegucigalpa',
  'Jamaica': 'America/Jamaica',
  'Mexico': 'America/Mexico_City',
  'Nicaragua': 'America/Managua',
  'Panama': 'America/Panama',
  'Saint Kitts and Nevis': 'America/Port_of_Spain',
  'Saint Lucia': 'America/Port_of_Spain',
  'Saint Vincent and the Grenadines': 'America/Port_of_Spain',
  'Trinidad and Tobago': 'America/Port_of_Spain',
  'United States': 'America/New_York', // or other zones
  "US" : "America/New_York",

  // South America
  'Argentina': 'America/Argentina/Buenos_Aires',
  'Bolivia': 'America/La_P Paz',
  'Brazil': 'America/Sao_Paulo',
  'Chile': 'America/Santiago',
  'Colombia': 'America/Bogota',
  'Ecuador': 'America/Guayaquil',
  'Guyana': 'America/Guyana',
  'Paraguay': 'America/Asuncion',
  'Peru': 'America/Lima',
  'Suriname': 'America/Paramaribo',
  'Venezuela': 'America/Caracas',

  // Europe
  'Albania': 'Europe/Tirane',
  'Andorra': 'Europe/Andorra',
  'Austria': 'Europe/Vienna',
  'Belarus': 'Europe/Minsk',
  'Belgium': 'Europe/Brussels',
  'Bosnia and Herzegovina': 'Europe/Sarajevo',
  'Bulgaria': 'Europe/Sofia',
  'Croatia': 'Europe/Zagreb',
  'Cyprus': 'Asia/Nicosia',
  'Czech Republic': 'Europe/Prague',
  'Denmark': 'Europe/Copenhagen',
  'Estonia': 'Europe/Tallinn',
  'Finland': 'Europe/Helsinki',
  'France': 'Europe/Paris',
  'Germany': 'Europe/Berlin',
  'Greece': 'Europe/Athens',
  'Hungary': 'Europe/Budapest',
  'Iceland': 'Atlantic/Reykjavik',
  'Ireland': 'Europe/Dublin',
  'Italy': 'Europe/Rome',
  'Latvia': 'Europe/Riga',
  'Liechtenstein': 'Europe/Vaduz',
  'Lithuania': 'Europe/Vilnius',
  'Luxembourg': 'Europe/Luxembourg',
  'Malta': 'Europe/Malta',
  'Monaco': 'Europe/Monaco',
  'Montenegro': 'Europe/Podgorica',
  'Netherlands': 'Europe/Amsterdam',
  'North Macedonia': 'Europe/Skopje',
  'Norway': 'Europe/Oslo',
  'Poland': 'Europe/Warsaw',
  'Portugal': 'Europe/Lisbon',
  'Romania': 'Europe/Bucharest',
  'Russia': 'Europe/Moscow', // spans multiple zones
  'San Marino': 'Europe/San_Marino',
  'Serbia': 'Europe/Belgrade',
  'Slovakia': 'Europe/Bratislava',
  'Slovenia': 'Europe/Ljubljana',
  'Spain': 'Europe/Madrid',
  'Sweden': 'Europe/Stockholm',
  'Switzerland': 'Europe/Zurich',
  'Turkey': 'Europe/Istanbul', // also extends into Asia
  'Ukraine': 'Europe/Kiev',
  'United Kingdom': 'Europe/London',
  "UK":"Europe/London",

  // Asia
  'Afghanistan': 'Asia/Kabul',
  'Armenia': 'Asia/Yerevan',
  'Azerbaijan': 'Asia/Baku',
  'Bahrain': 'Asia/Bahrain',
  'Bangladesh': 'Asia/Dhaka',
  'Bhutan': 'Asia/Thimphu',
  'Brunei': 'Asia/Brunei',
  'Cambodia': 'Asia/Phnom_Penh',
  'China': 'Asia/Shanghai',
  'Cyprus': 'Asia/Nicosia',
  'Georgia': 'Asia/Tbilisi',
  'India': 'Asia/Kolkata',
  'Indonesia': 'Asia/Jakarta', // multiple zones
  'Iran': 'Asia/Tehran',
  'Iraq': 'Asia/Baghdad',
  'Israel': 'Asia/Jerusalem',
  'Japan': 'Asia/Tokyo',
  'Jordan': 'Asia/Amman',
  'Kazakhstan': 'Asia/Almaty', // or others
  'Kuwait': 'Asia/Kuwait',
  'Kyrgyzstan': 'Asia/Bishkek',
  'Laos': 'Asia/Vientiane',
  'Lebanon': 'Asia/Beirut',
  'Malaysia': 'Asia/Kuala_Lumpur',
  'Maldives': 'Indian/Maldives',
  'Mongolia': 'Asia/Ulaanbaatar',
  'Myanmar': 'Asia/Yangon',
  'Nepal': 'Asia/Kathmandu',
  'North Korea': 'Asia/Pyongyang',
  'Oman': 'Asia/Muscat',
  'Pakistan': 'Asia/Karachi',
  'Palestine': 'Asia/Gaza', // or Jerusalem
  'Philippines': 'Asia/Manila',
  'Qatar': 'Asia/Qatar',
  'Russia': 'Asia/Yekaterinburg', // extends into Asia
  'Saudi Arabia': 'Asia/Riyadh',
  'Singapore': 'Asia/Singapore',
  'South Korea': 'Asia/Seoul',
  'Sri Lanka': 'Asia/Colombo',
  'Syria': 'Asia/Damascus',
  'Taiwan': 'Asia/Taipei',
  'Tajikistan': 'Asia/Dushanbe',
  'Thailand': 'Asia/Bangkok',
  'Timor-Leste': 'Asia/Dili',
  'Turkey': 'Europe/Istanbul', // spans into Europe
  'Turkmenistan': 'Asia/Ashgabat',
  'United Arab Emirates': 'Asia/Dubai',
  'Uzbekistan': 'Asia/Tashkent',
  'Vietnam': 'Asia/Ho_Chi_Minh',
  'Yemen': 'Asia/Aden',

  // Oceania
  'Australia': 'Australia/Sydney', // various zones
  'Fiji': 'Pacific/Fiji',
  'Kiribati': 'Pacific/Kiritimati',
  'Marshall Islands': 'Pacific/Majuro',
  'Micronesia': 'Pacific/Palau',
  'Nauru': 'Pacific/Nauru',
  'New Zealand': 'Pacific/Auckland',
  'Palau': 'Pacific/Palau',
  'Papua New Guinea': 'Pacific/Port_Moresby',
  'Samoa': 'Pacific/Apia',
  'Solomon Islands': 'Pacific/Guadalcanal',
  'Tonga': 'Pacific/Tongatapu',
  'Tuvalu': 'Pacific/Funafuti',
  'Vanuatu': 'Pacific/Efate',

  // Middle East
  'Bahrain': 'Asia/Bahrain',
  'Iran': 'Asia/Tehran',
  'Iraq': 'Asia/Baghdad',
  'Israel': 'Asia/Jerusalem',
  'Jordan': 'Asia/Amman',
  'Kuwait': 'Asia/Kuwait',
  'Lebanon': 'Asia/Beirut',
  'Oman': 'Asia/Muscat',
  'Qatar': 'Asia/Qatar',
  'Saudi Arabia': 'Asia/Riyadh',
  'Syria': 'Asia/Damascus',
  'United Arab Emirates': 'Asia/Dubai',
  'Yemen': 'Asia/Aden',

  // Additional countries and territories can be added similarly
};



  const countryFlags = {
    'US': '🇺🇸', 'UK': '🇬🇧', 'Japan': '🇯🇵', 'India': '🇮🇳',
    'Australia': '🇦🇺', 'Germany': '🇩🇪', 'France': '🇫🇷',
    'China': '🇨🇳', 'Brazil': '🇧🇷', 'Russia': '🇷🇺',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timezone) => {
    if (!Intl || !Intl.DateTimeFormat) return '--:--:--';
    
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(currentTime);
    } catch {
      return 'Invalid Timezone';
    }
  };

        const timezone = countryToTimezone[countries] || 'UTC';
        
        return (
          <div key={countries} 
          // style={{
          //   backgroundColor: '#fff',
          //   borderRadius: '10px',
          //   padding: '20px',
          //   minWidth: '200px',
          //   textAlign: 'center',
          //   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          // }}
          >
            {/* <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {countryFlags[countries] || '🌐'}
            </div> */}
            <div style={{ 
              fontSize: '0.9rem', 
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: '#2c3e50',
            }}>
              {formatTime(timezone)}
            </div>
            <div style={{ 
              fontSize: '0.7rem', 
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}>
              {countries}
            </div>
            <div style={{ 
              fontSize: '0.7rem', 
              color: '#666',
              marginBottom: '15px',
            }}>
              {timezone}
            </div>
            
          </div>
        );

};

export default SimpleCountryClock;

// Usage:
// <SimpleCountryClock countries={['US', 'Japan', 'Germany']} />