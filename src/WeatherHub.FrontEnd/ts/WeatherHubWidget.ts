import TimeSeriesChart, { SeriesInfo, YAxisLabel, DataPoint } from './TimeSeriesChart';
import WindRose from './WindRose';
import DataBoxLayout from './DataBoxLayout';
import DataLookup from './DataLookup';
import StationUpdateHub from './StationUpdateHub';
import axios from 'axios';
import { StationReading, StationReadingDto, StationStatisticsDto, StationStatistics, DtoConverter, WidgetSettings, WindUnits, TemperatureUnits } from './Types';
import {
    addHours, format, parse
} from 'date-fns';
import { debounce } from 'ts-debounce';
import { parseSettings } from './parseSettings';

export default class WeatherHubWidget {
     
    private weatherStationId: string; 
    private weatherHubServer: string  
    private widgetContainer: HTMLElement;    
    private windowWidth = null;
    private windowHeight = null;

    private innerContainer: HTMLDivElement;
    private windRoseContainer: HTMLDivElement;

    private widgetSettings: WidgetSettings;

    private labelColor = "#000000";
    private valueColor = "#27AAE1";
    private avgWindColor = "#27AAE1";
    private gustColor = "#F03153" 
    private hoursOfDataToLoadOnStart = 48;

    private windRose: WindRose;
    private windDirectionChart: TimeSeriesChart;
    private windDirectionContainer: HTMLDivElement;
    private stationReadingLookup: DataLookup<StationReading>;
    private windStrengthContainer: HTMLDivElement;
    private dataBoxContainer: HTMLDivElement;
    private windStrengthChart: TimeSeriesChart;
    private chartNumberOfHours: number = 24;

    private debouncedHandleResize: () => void;

    dataBoxLayout: DataBoxLayout;

    private stationUpdateHub: StationUpdateHub;

    private dtoConverter: DtoConverter;

    constructor(
        weatherHubServer: string,
        weatherStationId: string,
        widgetContainer: HTMLElement,
        widgetSettings?: any) { 
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;

        this.widgetSettings = parseSettings(widgetSettings);

        this.dtoConverter = new DtoConverter();

        this.stationReadingLookup = new DataLookup<StationReading>();

        this.addSubWidgets();
        this.initialiseSubWidgets(); 

        this.loadInitialData();
        this.stationUpdateHub = new StationUpdateHub(weatherStationId, weatherHubServer);

        this.stationUpdateHub.onNewReading(this.newStationReading.bind(this));
        this.stationUpdateHub.onStatisticsUpdated(this.statisticsUpdated.bind(this));

        this.debouncedHandleResize = debounce(this.handleResize, 250);

        this.listenForResize();
 
    }

    private listenForResize() {
        let widget = this;
        window.addEventListener("resize", function () {
            widget.debouncedHandleResize();
        });
    }

    private handleResize() {

        if (this.windowWidth == window.innerWidth) {
            return;
        }

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let prevStyles = document.getElementById("wh-styles");

        if (prevStyles) {
            prevStyles.remove();
        }

        var style = document.createElement('style');
        style.id = "wh-styles";
        document.head.appendChild(style);
        var styleSheet = style.sheet as CSSStyleSheet
        styleSheet.insertRule(".weatherHubWidget div{box-sizing: border-box;}", 0)
        styleSheet.insertRule(".weatherHubWidget .windStrengthChart, .weatherHubWidget .windDirectionChart {width: 68%; display: block; position: relative!important; margin: 0 4%;}", 1)
        styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {display: block; text-align: center; width: 100%; padding-top:1rem;  color: #27AAE1;}", 2)
        styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxValue {display: block; text-align: center; width: 100%;} ", 3)
        styleSheet.insertRule(".weatherHubWidget .windRose, .weatherHubWidget .dataBoxLayout {width: 20%; margin-left:4%; display: block; position: relative!important; color: black;}", 4)
        styleSheet.insertRule(".weatherHubWidget .dataBox {display:inline-flex; flex-wrap: wrap; margin: 1%; height: 6rem; width: 48%; font-family: sans-serif; font-weight: 700; font-size: 1rem; border-radius: 5px; border: solid 1px #ACACAC; }", 5);
        styleSheet.insertRule(".weatherHubWidget .dataBox {background: #DCE0E2;}", 6);

        let innerContainerWidth = this.innerContainer.offsetWidth / window.devicePixelRatio;
        let innerContainerHeight = this.innerContainer.offsetHeight / window.devicePixelRatio;

        console.log('whw-resize: ' + innerContainerWidth.toString() + '*' + innerContainerHeight.toString());

        if (this.windowWidth < this.windowHeight) {
            if (innerContainerWidth < 1227) {
                styleSheet.insertRule(".weatherHubWidget .windStrengthChart, .windDirectionChart, #DataTableContainer{width: 100%!important; left: 0%;}", 7)
                styleSheet.insertRule(".weatherHubWidget .windRose {width: 80%;margin: 0 10%;}", 8)
                styleSheet.insertRule(".weatherHubWidget .windStrengthChart {width: 100%;}", 9)
                styleSheet.insertRule(".weatherHubWidget .dataBox {min-height: 4.5rem; width: 44%; margin: 4px 2%}", 10)
                styleSheet.insertRule(".weatherHubWidget .dataBoxLayout {order: 4; width: 100%;}", 11)
            }
            if (innerContainerWidth < 576) {
                this.setTimeSeriesNumberOfHours(9);
            }
            else {
                this.setTimeSeriesNumberOfHours(24);
            }
        }
        else {
            if (innerContainerWidth < 1645) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 4.8rem; font-weight: 700; font-size: 0.95rem;}", 7);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.9rem;}", 8);
            }
            if (innerContainerWidth < 1350) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 4.2rem; font-weight: 650; font-size: 0.9rem;}", 9);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.9rem;}", 10);
            }
            if (innerContainerWidth < 1254) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 4rem; font-weight: 650; font-size: 0.8rem;}", 11);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.8rem;}", 12);
            }
            if (innerContainerWidth < 1160) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 3.5rem; font-weight: 630; font-size: 0.7rem;}", 13);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.7rem;}", 14);
            }
            if (innerContainerWidth < 1050) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 3.2rem; font-weight: 630; font-size: 0.6rem;}", 15);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.6rem;}", 16);
            }
            if (innerContainerWidth < 900) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 3.15rem; font-weight: 630; font-size: 0.57rem;}", 17);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.5rem;}", 18);
            }
            if (innerContainerWidth < 800) {
                styleSheet.insertRule(".weatherHubWidget .dataBox {height: 2.8rem; font-weight: 630; font-size: 0.45rem;}", 19);
                styleSheet.insertRule(".weatherHubWidget .dataBox .dataBoxTitle {padding-top:0.4rem;}", 20);
            }
            this.setTimeSeriesNumberOfHours(24);
        }
    }

    private setTimeSeriesNumberOfHours(numberOfHours: number) {
        if (this.chartNumberOfHours == numberOfHours) {
            return;
        }

        if (this.windDirectionChart) {
            this.windDirectionChart.setDisplayNumberOfHours(numberOfHours);
        }

        if (this.windStrengthChart) {
            this.windStrengthChart.setDisplayNumberOfHours(numberOfHours);
        }

        this.chartNumberOfHours = numberOfHours;
    }

    private addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.classList.add('weatherHubWidget');
        this.innerContainer.style.position = 'relative';
        this.innerContainer.style.userSelect = 'none';
        this.innerContainer.style.display = 'flex';
        this.innerContainer.style.flexFlow = 'wrap';
        this.innerContainer.style.width = '100%';

        this.windRoseContainer = document.createElement("div") as HTMLDivElement;
        this.windRoseContainer.classList.add('windRose');
        this.innerContainer.appendChild(this.windRoseContainer);

        
        this.windStrengthContainer = document.createElement("div") as HTMLDivElement;
        this.windStrengthContainer.classList.add("windStrengthChart")
        this.innerContainer.appendChild(this.windStrengthContainer);

        this.dataBoxContainer = document.createElement("div") as HTMLDivElement;
        this.dataBoxContainer.classList.add("dataBoxLayout")
        this.innerContainer.appendChild(this.dataBoxContainer);

        this.windDirectionContainer = document.createElement("div") as HTMLDivElement;
        this.windDirectionContainer.classList.add("windDirectionChart")
        this.innerContainer.appendChild(this.windDirectionContainer);

        this.widgetContainer.appendChild(this.innerContainer);

        this.handleResize();
    }

    private initialiseSubWidgets() {
        this.windRose = new WindRose(this.windRoseContainer, this.labelColor, this.labelColor, this.labelColor, this.avgWindColor, this.gustColor);

        let windDirectionSeries: SeriesInfo[] = [
            {
                color: this.avgWindColor,
                label: '10 Min Avg Wind (mph)'
            }];

        let windDirectionYAxisLabels: YAxisLabel[] = [
            { y: 45, label: 'NE' },
            { y: 90, label: 'E' },
            { y: 135, label: 'SE' },
            { y: 180, label: 'S' },
            { y: 225, label: 'SW' },
            { y: 270, label: 'W' },
            { y: 315, label: 'NW' },
            { y: 360, label: 'N' }
        ];

        this.windDirectionChart = new TimeSeriesChart(this.windDirectionContainer, this.chartNumberOfHours, windDirectionSeries, this.labelColor, false, 'wind origin', windDirectionYAxisLabels);

        let windStrengthSeries: SeriesInfo[] = [
            {
                color: this.avgWindColor,
                label: '10 Min Avg Wind (mph)'
            },
            {
                color: this.gustColor,
                label: '10 Min Max Gust (mph)'
            },
        ]

        this.windStrengthChart = new TimeSeriesChart(this.windStrengthContainer, this.chartNumberOfHours, windStrengthSeries, this.labelColor, true, 'wind avg / gust (mph)');

        this.dataBoxLayout = new DataBoxLayout(this.dataBoxContainer, this.labelColor, this.valueColor);
    }

    private loadInitialData() {
        let endRange = new Date();
        let startRange = addHours(endRange, -this.hoursOfDataToLoadOnStart);

        let stationReadingUrl = this.weatherHubServer + '/weather/' + this.weatherStationId + '/historic-readings?rangeStart=' + startRange.toISOString() + '&rangeEnd=' + endRange.toISOString();

        let stationDayStatisticsUrl = this.weatherHubServer + '/weather/' + this.weatherStationId + '/statistics/' + format(new Date(), 'YYYY-MM-DD')

        let widget = this;

        axios.get<StationReadingDto[]>(stationReadingUrl)
            .then(function (response) {

                response.data.forEach(stationReadingDto => {
                    widget.newStationReading(stationReadingDto);
                });
            }, function (reason) {
                console.log(reason);

                if (reason.response && reason.response.data) {
                    console.log(reason.response.data);
                }
            });
          
        axios.get<StationStatisticsDto>(stationDayStatisticsUrl)
            .then(function (response) {

                widget.statisticsUpdated(response.data);

            }, function (reason) {
                console.log(reason);

                if (reason.response && reason.response.data) {
                    console.log(reason.response.data);
                }
            });
    }
    
    private broadcastStationReading(stationReading: StationReading) {

        let directionDataPoint: DataPoint = {
            when: stationReading.when,
            seriesData: [stationReading.windDegrees]
        };

        this.windDirectionChart.addDataPoint(directionDataPoint);

        let strengthDataPoint: DataPoint = {
            when: stationReading.when,
            seriesData: [stationReading.windAvgMph, stationReading.windAvgGustMph]
        }

        this.windStrengthChart.addDataPoint(strengthDataPoint);

        this.windRose.displayNewDataPoint(stationReading.when, stationReading.windDegrees, stationReading.windAvgMph, stationReading.windAvgGustMph);
        this.dataBoxLayout.updateTemperature(stationReading.tempC);
        this.dataBoxLayout.updateEstimatedCloudBase(stationReading.estimatedCloudBaseFt);
        this.dataBoxLayout.updateHumidity(stationReading.relativeHumidity);
        this.dataBoxLayout.updatePressure(stationReading.pressureMb);
        this.dataBoxLayout.updateDewPoint(stationReading.dewpointC);
    }

    private broadcastStationStatistics(stationStatistics: StationStatistics): any {
        this.dataBoxLayout.updateRain(stationStatistics.dayStatistics.totalRainCm, stationStatistics.lastRain);
        this.dataBoxLayout.updateWindHighToday(stationStatistics.dayStatistics.windHighMph, stationStatistics.dayStatistics.windHighTime);
    }

    private newStationReading(stationReadingDto: StationReadingDto) {

        if (!stationReadingDto) {
            return;
        }

        let stationReading = this.dtoConverter.toStationReading(stationReadingDto);

        this.stationReadingLookup.addData(stationReading);
        this.broadcastStationReading(stationReading);
    }

    private statisticsUpdated(statisticsDto: StationStatisticsDto) {

        if (!statisticsDto) {
            return;
        }

        let dtoConverter = new DtoConverter();
        let stationStatistics = dtoConverter.toStationStatistics(statisticsDto);
        this.broadcastStationStatistics(stationStatistics);
    }
}