function checkCountryClicked(data) {
  const allCountryList = document.querySelector('.left-column-list-content');
  allCountryList.addEventListener('click', (e) => {
    const target = e.target;
    const clickCountry = data.find(item => item.id === +target.dataset.id);
    if (clickCountry !== undefined) addTemplateChoiceCountry(clickCountry);
  });
}

function addTemplateChoiceCountry(clickCountry) {
  console.log(clickCountry);
}

export default checkCountryClicked;
