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
    private windStrengthContainer: HTMLDivElement;
    private dataListContainer: HTMLDivElement;
    private windStrengthChart: TimeSeriesChart;

    constructor(
        weatherHubServer: string,
        weatherStationId: string,
        widgetContainer: HTMLElement) { 
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;

        this.stationReadingLookup = new DataLookup<StationReading>();


        this.addSubWidgets();
        this.SubWidgetsAddIdentities();
        this.initialiseSubWidgets(); 
        this.loadInitialData();
    }

    private addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.style.position = 'relative';
        this.innerContainer.style.userSelect = 'none';
        this.innerContainer.style.display = 'flex';
        this.innerContainer.style.flexFlow = 'wrap';
        this.innerContainer.style.width = '100%';

        this.windRoseContainer = document.createElement("div") as HTMLDivElement;
        this.innerContainer.appendChild(this.windRoseContainer);
        this.windDirectionContainer = document.createElement("div") as HTMLDivElement;
        this.innerContainer.appendChild(this.windDirectionContainer);
        this.dataListContainer = document.createElement("div") as HTMLDivElement;


        //dataListMoveSomewareElse
        for (var i = 0; i < 10; i++) {
            var listBox = document.createElement("div") as HTMLDivElement;
            listBox.setAttribute("class", "listBox");
            var listTitle = document.createElement("div") as HTMLDivElement;
            listTitle.setAttribute("class", "listTitle");
            if (i == 5) {
                listTitle.append("list Item " + i + " this ones extra long")
            } else {
                listTitle.append("list Item " + i)
            }
            
            var listVal = document.createElement("div") as HTMLDivElement;
            listVal.setAttribute("class", "listVal");
            listVal.append(i.toString());
            listBox.appendChild(listTitle);
            listBox.appendChild(listVal);
            this.dataListContainer.appendChild(listBox);
        }

        this.innerContainer.appendChild(this.dataListContainer);
        this.windStrengthContainer = document.createElement("div") as HTMLDivElement;
        this.innerContainer.appendChild(this.windStrengthContainer);
        this.widgetContainer.appendChild(this.innerContainer);

        //stylesheet creation
        //TODO we should redraw this css file on page size change and move it to a relivent area...
        var style = document.createElement('style');
        document.head.appendChild(style);
        var styleSheet = style.sheet as CSSStyleSheet
        styleSheet.insertRule("div{box-sizing: border-box;}", 0)
        styleSheet.insertRule("#WindStrengthContainer, #WindDirectionContainer {width: 75%; display: block; position: relative!important; margin: 0 2.5%;}",0)


        styleSheet.insertRule(".listBox .listTitle{display: block; text-align: center; width: 100%; padding: 0.4rem}", 1)

        styleSheet.insertRule(".listBox .listVal{display: block; text-align: center; width: 100%; font-size: 1.8rem;} ", 2)

        styleSheet.insertRule("#WindRoseContainer, #DataTableContainer {width: 20%; display: block; position: relative!important;}", 3)
        styleSheet.insertRule(".listBox {display:inline-flex; flex-wrap: wrap; margin: 0.5rem; min-height: 5.5rem;width: 5.5rem; font-family: Courier New, Courier, monospace; font-weight: 800; font-size: 0.7rem;}", 4);
        styleSheet.insertRule(".listBox {background: #27AAE1; color: white;}", 5);

        if (this.innerContainer.offsetWidth < 1227) {
            console.log("InnerWidthIsUnder 1227");
            styleSheet.insertRule(".listBox {min-height: 4rem; width: 4rem;}", 6)
        }

        if (this.innerContainer.offsetWidth < 1027) {
            console.log("InnerWidthIsUnder 1027");
            styleSheet.insertRule("#DataTableContainer {order: 4; width: 100%;}", 7)
            styleSheet.insertRule("#WindStrengthContainer {width: 100%;}", 8)
        }

        if (this.innerContainer.offsetWidth < 576) {
            console.log("InnerWidthIsUnder 576");
            styleSheet.insertRule("#WindStrengthContainer, #WindDirectionContainer, #DataTableContainer{width: 100%; left: 0%;}", 8)
            styleSheet.insertRule("#WindRoseContainer{width: 80%;margin: 0 10%;}", 8)
            styleSheet.insertRule("#WindStrengthContainer {width: 100%;}", 8)
        }
    }

    private SubWidgetsAddIdentities() {

        this.windStrengthContainer.setAttribute("id", "WindStrengthContainer");
        this.windDirectionContainer.setAttribute("id", "WindDirectionContainer");
        this.windRoseContainer.setAttribute("id", "WindRoseContainer");
        this.dataListContainer.setAttribute("id", "DataTableContainer");
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

        this.windDirectionChart = new TimeSeriesChart(this.windDirectionContainer, 24, windDirectionSeries, this.labelColor, false, windDirectionYAxisLabels);

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

        /*let windStrengthYAxisLabels: YAxisLabel[] = [
            { y: 5, label: '5' },
            { y: 10, label: '10' },
            { y: 15, label: '15' },
            { y: 20, label: '20' },
            { y: 25, label: '25' },
            { y: 30, label: '30' },
            { y: 35, label: '35' },
            { y: 40, label: '40' },
        ];*/


        this.windStrengthChart = new TimeSeriesChart(this.windStrengthContainer, 24, windStrengthSeries, this.labelColor, true);
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
    }
}

