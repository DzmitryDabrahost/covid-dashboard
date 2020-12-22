import './css/style.css';
import './css/components/mainContent/content.css';
import './css/components/mainContent/datapopup.css';
import './css/components/mainContent/keyboard.css';

import './js/mapInstance/mapInstance';
import './js/mapInstance/keyboard';
import Country from './js/country';
import searchItem from './js/search';
import getAllDataCases from './js/allGraphs';
import createToggleCheckbox from './js/checkSorted';

const getDataCountry = new Country();
getDataCountry.getDataCountry();
getAllDataCases();
searchItem();
createToggleCheckbox(getDataCountry.allCountry);
