import './css/style.css';

import getSummaryDataCovid from './js/getSummaryDataCovid';
import Country from './js/country';
import searchItem from './js/search';
import checkCountryClicked from './js/hundlerCountry';
import rightColumnClickedHundler from './js/rightHundler';

const getDataCountry = new Country();
getDataCountry.getDataCountry();
const allCountry = getDataCountry.allCountry;

getSummaryDataCovid(allCountry);
searchItem();
checkCountryClicked(allCountry);
rightColumnClickedHundler(allCountry);
