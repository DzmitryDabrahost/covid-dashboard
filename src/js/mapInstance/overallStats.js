
function getOverallStats(data) {
    const tabQs = document.querySelectorAll('.tabQ');
    tabQs.forEach((item, i) => item.innerText = data[i]);
}

function getDataByCountry(data) {
    const countriesContainer = document.querySelector('.countriesContainer');
    data.forEach((item, i) => {
        const country = document.createElement('div');
        const countryAttr = document.createElement('div');
        const countryName = document.createElement('div');
        const countryFlag = document.createElement('img');
        countryFlag.setAttribute('src', '');
        countryFlag.src = data[i]['flag'];
        countryFlag.setAttribute('alt', `${data[i]['country']} flag`);
        const countryStats = document.createElement('div');
        countryStats.classList.add('countryStats');
        const countryCases = document.createElement('div');
        const countryDeaths = document.createElement('div');
        const countryRecoveries = document.createElement('div');
        country.classList.add('country');
        countryAttr.classList.add('countryAttr');
        countryName.classList.add('countryName');
        countryFlag.classList.add('countryFlag');
        countryCases.classList.add('countryCases');
        countryDeaths.classList.add('countryDeaths');
        countryRecoveries.classList.add('countryRecoveries');
        countryName.innerText = data[i]['name'];
        countryCases.innerText = `C: ${data[i]['cases']}` || '0';
        countryDeaths.innerText = `D: ${data[i]['deaths']}` || '0';
        countryRecoveries.innerText = `R: ${data[i]['recovered']}` || '0';
        
        countryAttr.append(countryFlag, countryName);
        countryStats.append(countryCases, countryDeaths, countryRecoveries)
        country.append(countryAttr, countryStats);
        countriesContainer.append(country);
    })
    fillPopupWithData(data);
    filterDataByCountry();
}

function fillPopupWithData(data) {
    const country = document.querySelectorAll('.country');
    const popupCountryName = document.querySelector('.dataPopUp__country');
    const dataPopUp = document.querySelector('.dataPopUp');
    const dataItemCases = document.querySelector('.data-item__cases');
    const dataItemDeaths = document.querySelector('.data-item__deaths');
    const dataItemRecoveries = document.querySelector('.data-item__recoveries');
    const dataItemToday = document.querySelector('.data-item__today');
    country.forEach((item, i) => {
        const {cases, deaths, name, recovered, todayCases, todayDeaths, todayRecovered, population} = data[i];
        item.addEventListener('click', () => {
            dataPopUp.classList.add('dataPopUp--active');
            popupCountryName.innerText = item.children[0].innerText;
            dataItemCases.children[0].innerText = `Overall cases: ${cases}`;
            dataItemCases.children[1].innerText = `Today cases: ${todayCases}`;
            dataItemCases.children[2].innerText = `Cases 100k people(cut): ${Math.round(cases / (population / 100000))}`;

            dataItemDeaths.children[0].innerText = `Death cases: ${deaths}`;
            dataItemDeaths.children[1].innerText = `Today Death cases: ${todayDeaths}`;
            dataItemDeaths.children[2].innerText = `Death cases 100k people(cut): ${Math.round(deaths / (population / 100000))}`;

            dataItemRecoveries.children[0].innerText = `Recovery cases: ${recovered}`;
            dataItemRecoveries.children[1].innerText = `Today Recovery cases: ${todayRecovered}`;
            dataItemRecoveries.children[2].innerText = `Recovery cases 100k people(cut): ${Math.round(recovered / (population / 100000))}`;

            dataItemToday.children[0].innerText = `Today Covid cases 100k people(cut): ${Math.round(todayCases / (population / 100000))}`;
            dataItemToday.children[1].innerText = `Today Death cases 100k people(cut): ${Math.round(todayDeaths / (population / 100000))}`;
            dataItemToday.children[2].innerText = `Today Recovery cases 100k people(cut): ${Math.round(todayRecovered / (population / 100000))}`;
        })
    })
    closePopUp(dataPopUp);
}

function closePopUp(dataPopUp) {
    const closePopUp = document.querySelector('.closePopUp');
    closePopUp.addEventListener('click', () => {
        dataPopUp.classList.remove('dataPopUp--active');
    })
}

function openClosePopUpGraphic() {
    const more = document.querySelector('.dataPopUp__bottom');
    const graphic = document.querySelector('.dataPopUp__graphic');
    more.addEventListener('click', () => {
        graphic.classList.toggle('dataPopUp__graphic--active');
        graphic.classList.contains('dataPopUp__graphic--active') ? more.innerText = 'Less' : more.innerText = 'More';
    })
}
openClosePopUpGraphic();


function filterDataByCountry() {
    const searchField = document.querySelector('.searchField');
    const searchForm = document.querySelector('.searchForm');
    const country = document.querySelectorAll('.country');
    const countryName = document.querySelectorAll('.countryName');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = searchField.value.toLowerCase();
        country.forEach((item, i) => {
            const name = countryName[i].innerText.toLowerCase();
            if(!name.startsWith(value)) {
                item.classList.add('country--hide');
            } else {
                item.className = 'country';
            }
        })
        searchField.value = '';
    })
}




export {getOverallStats, getDataByCountry, filterDataByCountry}