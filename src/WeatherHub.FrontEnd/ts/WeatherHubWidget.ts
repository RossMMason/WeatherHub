import TimeSeriesChart, { SeriesInfo, YAxisLabel, DataPoint } from './TimeSeriesChart';
import WindRose from './WindRose';
import DataLookup from './DataLookup';
import axios, { AxiosResponse } from 'axios';
import { StationReading, StationReadingDto } from './Types';
import {
    addHours, format
} from 'date-fns';

export default class WeatherHubWidget {
     
    private weatherStationId: string; 
    private weatherHubServer: string  
    private widgetContainer: HTMLElement;    
    

    private innerContainer: HTMLDivElement;
    private windRoseContainer: HTMLDivElement;

    private labelColor = "#000000";
    private avgWindColor = "#27AAE1";
    private gustColor = "#F03153" 
    private hoursOfDataToLoadOnStart = 48;

    private windRose: WindRose;
    private windDirectionChart: TimeSeriesChart;
    private windDirectionContainer: HTMLDivElement;
    private stationReadingLookup: DataLookup<StationReading>;

    constructor(
        weatherHubServer: string,
        weatherStationId: string,
        widgetContainer: HTMLElement) { 
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;

        this.stationReadingLookup = new DataLookup<StationReading>();


        this.addSubWidgets();
        this.positionSubWidgets();
        this.initialiseSubWidgets(); 
        this.loadInitialData();
    }

    private addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.style.position = 'relative';


        this.windRoseContainer = document.createElement("div") as HTMLDivElement;
        this.windRoseContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windRoseContainer);

        this.windDirectionContainer = document.createElement("div") as HTMLDivElement;
        this.windDirectionContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windDirectionContainer);
        

        this.widgetContainer.appendChild(this.innerContainer);
    }

    private positionSubWidgets() {
        this.windRoseContainer.style.width = "400px";
        this.windRoseContainer.style.height = "400px";

        this.windDirectionContainer.style.width = "700px"
        this.windDirectionContainer.style.height = "300px"
        this.windDirectionContainer.style.left = "440px";
    }

    private initialiseSubWidgets() {
        this.windRose = new WindRose(this.windRoseContainer, this.labelColor, this.gustColor, this.labelColor);

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

        this.windDirectionChart = new TimeSeriesChart(this.windDirectionContainer, 24, windDirectionSeries, this.labelColor, false, windDirectionYAxisLabels);
    }

    private loadInitialData() {
        let endRange = new Date();
        let startRange = addHours(endRange, -this.hoursOfDataToLoadOnStart);

        let url = this.weatherHubServer + '/weather/' + this.weatherStationId + '/historic-readings?rangeStart=' + startRange.toISOString() + '&rangeEnd=' + endRange.toISOString();

        let widget = this;

        axios.get<StationReadingDto[]>(url)
            .then(function (response) {
                return response.data.map(function (stationReadingDto) {
                    let stationReading: StationReading = {
                        id: stationReadingDto.id,
                        when: new Date(stationReadingDto.when),
                        dewpointC: stationReadingDto.dewpointC,
                        heatIndexC: stationReadingDto.heatIndexC,
                        pressureMb: stationReadingDto.pressureMb,
                        relativeHumidity: stationReadingDto.relativeHumidity,
                        tempC: stationReadingDto.tempC,
                        windDegrees: stationReadingDto.windDegrees,
                        windAvgMph: stationReadingDto.windAvgMph,
                        windAvgGustMph: stationReadingDto.windAvgGustMph,
                        windChillC: stationReadingDto.windChillC,
                        rainCmPerHour: stationReadingDto.rainCmPerHour,
                    };

                    return stationReading;
                })
            }, function (reason) {
                console.log(reason);

                if (reason.response && reason.response.data) {
                    console.log(reason.response.data);
                }
            })
            .then(function (stationReadings) {
                if (stationReadings) {
                    stationReadings.forEach(function (stationReading) {
                        widget.stationReadingLookup.addData(stationReading);
                        widget.broadcastReading(stationReading);
                    });
                }
            });
    }

    private broadcastReading(stationReading: StationReading) {

        this.windRose.displayNewDataPoint(stationReading.when, stationReading.windDegrees);

        let directionDataPoint: DataPoint = {
            when: stationReading.when,
            seriesData: [stationReading.windDegrees]
        };

        this.windDirectionChart.addDataPoint(directionDataPoint);
    }
}

