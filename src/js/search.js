export default function searchItem() {
  const input = document.querySelector('.searchField');
  input.oninput = function changeInput() {
    const allCountyToList = [...document.querySelectorAll('.country')];
    let val = this.value.trim().toUpperCase();
    allCountyToList.forEach(element => {
      if (element.innerText.toUpperCase().search(val) === -1) {
        element.classList.add('hide');
      } else {
        element.classList.remove('hide');
      }
    });
  };
}
