import '../../css/components/map/styleMap.css';

const root = document.querySelector('.root');
const slideContainer = document.createElement('div');
const markersContainer = document.createElement('div');
markersContainer.classList.add('markersContainer');
const markersContHeading = document.createElement('h3');
markersContHeading.classList.add('markersContHeading');
markersContHeading.innerText = "Total Data for today";
markersContainer.prepend(markersContHeading);
slideContainer.classList.add('slideContainer');
const sliderHeading = document.createElement('h2');
sliderHeading.classList.add('sliderHeading');
sliderHeading.innerText = 'February';
const timeLineField = document.createElement('div');
const btnLeft = document.createElement('div');
btnLeft.innerText = '<';
btnLeft.classList.add('btnLeft');
const btnRight = document.createElement('div');
btnRight.classList.add('btnRight');
btnRight.innerText = '>';
timeLineField.classList.add('timeLineField');
const timeLineFieldFill = document.createElement('div');
timeLineFieldFill.classList.add('timeLineFieldFill');
timeLineField.appendChild(timeLineFieldFill);
slideContainer.append(btnLeft, timeLineField, btnRight);
root.append(sliderHeading, slideContainer, markersContainer);


const container = am4core.create(map, am4core.Container);
am4core.useTheme(am4themes_animated);
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.background.fill = am4core.color("#1A2C42");
container.background.strokeWidth = 0;
const mapInstance = container.createChild(am4maps.MapChart);
mapInstance.height = am4core.percent(100);
mapInstance.width = am4core.percent(100)
mapInstance.geodata = am4geodata_worldLow;
mapInstance.projection = new am4maps.projections.Miller();
const polygonSeries = new am4maps.MapPolygonSeries();
polygonSeries.useGeodata = true;
mapInstance.series.push(polygonSeries);
polygonSeries.exclude = ["AQ"];
const polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name} - cases: {value}";
polygonTemplate.fill = am4core.color("#474b4f");
polygonTemplate.stroke = am4core.color("#1A2C42")
mapInstance.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#1A2C42");
mapInstance.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
const heatLegend = container.createChild(am4maps.HeatLegend);
heatLegend.id = "heatLegend";
heatLegend.series = polygonSeries;
heatLegend.minColor = am4core.color("#ECAF44");
heatLegend.maxColor = am4core.color("#BE2F29");
heatLegend.series = polygonSeries;
heatLegend.height = am4core.percent(35);
heatLegend.orientation = "vertical";
heatLegend.marginRight = 50;
heatLegend.marginTop = 30;
heatLegend.align = "left";
heatLegend.valign = "top";
heatLegend.valueAxis.renderer.labels.template.fontSize = 14;
polygonTemplate.events.on("over", function(ev) {
    if (!isNaN(ev.target.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
    }
    else {
      heatLegend.valueAxis.hideTooltip();
    }
  });
polygonTemplate.events.on("out", function(ev) {
    heatLegend.valueAxis.hideTooltip();
  });



const hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#E0E0E0");
mapInstance.zoomControl = new am4maps.ZoomControl();
mapInstance.zoomControl.valign = "top";

polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: am4core.color("#ECAF44"),
  max: am4core.color("#BE2F29")
});

const imageSeries = mapInstance.series.push(new am4maps.MapImageSeries());
imageSeries.dataFields.value = "badCases";

const imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true
imageTemplate.adapter.add("latitude", function(latitude, target) {
  const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})
imageTemplate.adapter.add("longitude", function(longitude, target) {
  const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})

const circle = imageTemplate.createChild(am4core.Circle);
circle.fillOpacity = .9;
circle.fill = am4core.color('#7DA2A9')
circle.tooltipText = "{name} - deaths:{value}[/]";

imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 5,
  "max": 35,
  "dataField": "value"
})

const createPoint = () => {
    const pointContainer = document.createElement('div');
    pointContainer.classList.add('pointContainer');
    const point = document.createElement('div');
    const pointLabel = document.createElement('p');
    pointLabel.classList.add('pointLabel');
    point.classList.add('point');
    pointContainer.append(pointLabel, point)
    timeLineField.appendChild(pointContainer);
}
const createMarker = () => {
  const marker = document.createElement('div');
  const markerPoint = document.createElement('div');
  markerPoint.classList.add('markerPoint');
  const markerTitle = document.createElement('p');
  markerTitle.classList.add('markerTitle');
  marker.classList.add('marker');
  marker.append(markerPoint, markerTitle);
  markersContainer.append(marker)
}

const monthArr = ['February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

const findDOMElems = () => {
    const points = document.querySelectorAll('.point');
    const timeLineFieldFill = document.querySelector('.timeLineFieldFill');
    const pointContainer = document.querySelectorAll('.pointContainer');
    const pointLabel = document.querySelectorAll('.pointLabel');
    return {
        points,
        timeLineFieldFill,
        pointContainer,
        pointLabel
    }
}

const points = Array.from({length: 5}).map(createPoint);
const markers = Array.from({length: 3}).map(createMarker)

const setMarkerTitle = (...title) => {
  const preTitles = ['cases:', 'deaths:', 'recov.:']
  const markerTitles = document.querySelectorAll('.markerTitle');
  markerTitles.forEach((item, i) => item.innerText = `${preTitles[i]} ${title[i]}`)
}


function placePoints() {
    const {points, pointContainer, pointLabel} = findDOMElems();
    
    const dateArr = [5, 10, 15, 20, 25]
    for (let i = 0; i < pointContainer.length; i += 1) {
        const left = i * 25;
        pointContainer[i].style.left = left + '%';
        pointLabel[i].innerText = `${dateArr[i]}`;
        points[i].setAttribute('data-date',  dateArr[i])
        points[i].addEventListener('click', () => {
            handlePointClick(left);
        })
    }
}
placePoints();

function handlePointClick(left) {
    const timeLineFieldFill = document.querySelector('.timeLineFieldFill');
    console.log(timeLineFieldFill)
    timeLineFieldFill.style.width = left + '%';
}

function fadeStyles() {
    const {points, timeLineFieldFill, pointLabel} = findDOMElems();
    points.forEach((elem, i) => {
        elem.classList.add('point--active');
        pointLabel[i].classList.add('pointLabel--active');
        setTimeout(() => {
            elem.classList.remove('point--active');
            pointLabel[i].classList.remove('pointLabel--active');
        }, 500)
    });
}

function getDate(index) {
  const {points, pointLabel} = findDOMElems();
  const month = index < 9 ? `0${index + 1}` : index + 1;
  document.body.addEventListener('click', e => {
    if (e.target.closest('.point')) {
      let date;
      e.target.dataset.date < 10 ? date = `0${e.target.dataset.date}` : date = e.target.dataset.date;
      const props = `2020-${month}-${date}`;
      fetchApifromProps(props).then(data => handleDatafromProps(data))
    }
  })
}

function handleDatafromProps(data) {
    const dataProps = data.map(item => {
        return {
            id: item.country,
            value: item.cases,
            badCases: item.deaths
        }
    })
    createAnotheMapInstance(dataProps);
}


async function fetchApifromProps(props) {
    const url = `https://covid19-api.org/api/status?date=${props}`;
    const response = await fetch(url);
    try {
      if(!response.ok) {
        throw new Error("Something wrong with the Api")
      }
      const data = await response.json();
      return data
    }catch(e) {
      alert(e)
    }
  }

function addSlide() {
    const timeLineFieldFill = document.querySelector('.timeLineFieldFill');
    let i = 1;
    document.body.addEventListener('click', e => {
      if (e.target.closest('.btnRight')) {
        timeLineFieldFill.style.width = '0%';
        if (i >= monthArr.length) return;
        setTimeout(() => {
            sliderHeading.innerText = monthArr[i-1];
        })
        fadeStyles();
        i += 1;
      }
      if(e.target.closest('.btnLeft')) {
        timeLineFieldFill.style.width = '0%';
        if (i <= 1) return;
        i -= 1;
        fadeStyles();
        sliderHeading.innerText = monthArr[i-1];
      }
      getDate(i);
    })
}
addSlide()



async function fetchApi() {
  const url = 'https://covid19-api.org/api/status';
  const url2 = 'https://covid19-api.org/api/timeline';

  const [statusCases, totalCases] = await Promise.all([
    fetch(url),
    fetch(url2)
  ]);

  try {
    if(!statusCases.ok || !totalCases.ok) {
      throw new Error("Something wrong with the Api")
    }
    const status = await statusCases.json();
    const total = await totalCases.json();
    setMarkerTitle(total[0].total_cases, total[0].total_deaths, total[0].total_recovered,)
    return status
  }catch(e) {
    alert(e)
  }
}
fetchApi().then(status => handleData(status))

function handleData(data) {
  const parseData = data.map(item => {
    return {
      id: item.country,
      value: item.cases,
      badCases: item.deaths
    }
  })
  createMapInstance(parseData)
}

function createMapInstance(parseData) {
  const values = parseData.map(item => item.value)
  const maxCasesValue = Math.max(...values);
  const minCasesValue = Math.min(...values);
  heatLegend.minValue = minCasesValue;
  heatLegend.maxValue = maxCasesValue;
  polygonSeries.data = [...parseData];
  imageSeries.data = [...parseData];
}

function createAnotheMapInstance(dataProps) {
  const values = dataProps.map(item => item.value)
  const maxCasesValue = Math.max(...values);
  const minCasesValue = Math.min(...values);
  heatLegend.minValue = minCasesValue;
  heatLegend.maxValue = maxCasesValue;
  polygonSeries.data = [...dataProps];
  imageSeries.data = [...dataProps];
}

function openMapInstance() {
  const root = document.querySelector('.root');
  const headerMenu = document.querySelector('.header-menu');
  const headerMenuIcon = document.querySelectorAll('.header-menu__icon');
  headerMenu.addEventListener('click', () => {
    root.classList.toggle('root--active');
    headerMenuIcon.forEach(item => item.classList.toggle('header-menu__icon--active'));
  })
}
openMapInstance();

    
  