import '../../css/components/map/styleMap.css';
import {getOverallStats} from './overallStats.js';

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

am4core.useTheme(am4themes_animated);
const mapInstance = am4core.create('map', am4maps.MapChart);
mapInstance.geodata = am4geodata_worldLow;
mapInstance.projection = new am4maps.projections.Miller();
const polygonSeries = new am4maps.MapPolygonSeries();
mapInstance.series.push(polygonSeries);
polygonSeries.useGeodata = true;
const polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.applyOnClones = true;
polygonTemplate.togglable = true;
polygonTemplate.nonScalingStroke = true;
polygonTemplate.tooltipText = '{name} - cases: {value}';
polygonTemplate.fill = am4core.color('#474b4f');
polygonTemplate.stroke = am4core.color('#1A2C42')
mapInstance.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#1A2C42');
mapInstance.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
polygonSeries.heatRules.push({
  property: 'fill',
  target: polygonSeries.mapPolygons.template,
  min: am4core.color('#ECAF44'),
  max: am4core.color('#BE2F29')
});
const heatLegend = mapInstance.createChild(am4maps.HeatLegend);
heatLegend.id = 'heatLegend';
heatLegend.series = polygonSeries;
heatLegend.minColor = am4core.color('#ECAF44');
heatLegend.maxColor = am4core.color('#BE2F29');
heatLegend.series = polygonSeries;
heatLegend.height = am4core.percent(35);
heatLegend.orientation = 'vertical';
heatLegend.marginRight = 50;
heatLegend.marginTop = 30;
heatLegend.align = 'left';
heatLegend.valign = 'top';
heatLegend.valueAxis.renderer.labels.template.fontSize = 14;
const imageSeries = mapInstance.series.push(new am4maps.MapImageSeries());
imageSeries.dataFields.value = 'badCases';
const imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true
imageTemplate.adapter.add('latitude', function(latitude, target) {
  const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})
imageTemplate.adapter.add('longitude', function(longitude, target) {
  const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})
const circle = imageTemplate.createChild(am4core.Circle);
circle.fillOpacity = .9;
circle.fill = am4core.color('#7DA2A9')
circle.tooltipText = '{name} - deaths:{value}[/]';
imageSeries.heatRules.push({
  'target': circle,
  'property': 'radius',
  'min': 5,
  'max': 35,
  'dataField': 'value'
})
polygonTemplate.events.on('over', function(ev) {
    if (!isNaN(ev.target.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
    }
    else {
      heatLegend.valueAxis.hideTooltip();
    }
  });
polygonTemplate.events.on('out', function(ev) {
    heatLegend.valueAxis.hideTooltip();
  });
let lastSelected;
polygonTemplate.events.on('hit', function(ev) {
  if (lastSelected) {
    lastSelected.isActive = false;
  }
  ev.target.series.chart.zoomToMapObject(ev.target);
  if (lastSelected !== ev.target) {
    lastSelected = ev.target;
  }
})
const hs = polygonTemplate.states.create('hover');
hs.properties.fill = am4core.color('#E0E0E0');
polygonSeries.exclude = ['AQ'];
mapInstance.zoomControl = new am4maps.ZoomControl();
let homeButton = new am4core.Button();
homeButton.events.on('hit', function(){
  mapInstance.goHome();
});
homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
homeButton.marginBottom = 10;
homeButton.parent = mapInstance.zoomControl;
homeButton.insertBefore(mapInstance.zoomControl.plusButton);

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
  markerTitles.forEach((item, i) => item.innerText = `${preTitles[i]} ${title[i]}`);
  getOverallStats(title);
}


function placePoints() {
    const {points, pointContainer, pointLabel} = findDOMElems();
    const dateArr = [5, 10, 15, 20, 25];
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

function getDate(data) {
  const index = localStorage.getItem('index');
  const month = Number(index) < 9 ? `0${Number(index)}` : Number(index);
  let date;
  data < 10 ? date = `0${data}` : date = data;
  const props = `2020-${month}-${date}`;
  console.log(props);
  fetchApifromProps(props);
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
      handleDatafromProps(data)
    }catch(e) {
      alert(e)
    }
  }

function addSlide() {
    const timeLineFieldFill = document.querySelector('.timeLineFieldFill');
    const slideContainer = document.querySelector('.slideContainer');
    let i = 1;
    let j = 2;
    slideContainer.addEventListener('click', e => {
      if (e.target.closest('.btnRight')) {
        timeLineFieldFill.style.width = '0%';
        if (i >= monthArr.length) return;
        setTimeout(() => {
            sliderHeading.innerText = monthArr[i-1];
        })
        fadeStyles();
        i += 1;
        j += 1;
      }
      if(e.target.closest('.btnLeft')) {
        timeLineFieldFill.style.width = '0%';
        if (i <= 1) return;
        i -= 1;
        j -= 1;
        fadeStyles();
        sliderHeading.innerText = monthArr[i-1];
      }
      if(e.target.closest('.point')) {
        localStorage.setItem('index', j);
        getDate(e.target.dataset.date);
      }
      
    })
}
addSlide()



async function fetchApi() {
  const url = 'https://covid19-api.org/api/timeline';

  const totalCases = await fetch(url);

  try {
    if(!totalCases.ok) {
      throw new Error("Something wrong with the Api")
    }
    const total = await totalCases.json();
    return total
  }catch(e) {
    alert(e)
  }
}
fetchApi().then(total => setMarkerTitle(total[0].total_cases, total[0].total_deaths, total[0].total_recovered,))

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

  headerMenu.addEventListener('click', () => {
    headerMenu.classList.toggle('header-menu--active');
    root.classList.toggle('root--active');
    if(headerMenu.classList.contains('header-menu--active')) {
        headerMenu.innerText = 'Close Map';
    } else {
      setTimeout(() => {
        headerMenu.innerText = 'Open Map';
      }, 300)
    }

  })
  
}
openMapInstance();

export {handleData};
