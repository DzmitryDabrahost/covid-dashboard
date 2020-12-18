import './css/style.css';
import './css/components/mainContent/content.css';
import './css/components/mainContent/datapopup.css';

import './js/mapInstance/mapInstance';
import Country from './js/country';
import searchItem from './js/search';

const getDataCountry = new Country();
getDataCountry.getDataCountry();
searchItem();
