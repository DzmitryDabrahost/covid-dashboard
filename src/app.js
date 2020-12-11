import './css/style.css';

import getSummaryDataCovid from './js/getSummaryDataCovid';
import Country from './js/country';

const getDataCountry = new Country();
getDataCountry.getDataCountry();

getSummaryDataCovid();
