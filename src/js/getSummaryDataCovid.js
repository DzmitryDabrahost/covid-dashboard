async function getSummaryDataCovid() {
  const url = 'https://api.covid19api.com/summary';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

export default getSummaryDataCovid;
