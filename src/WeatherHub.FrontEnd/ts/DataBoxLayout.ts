const svgns = 'http://www.w3.org/2000/svg';
import { debounce } from 'ts-debounce';
import {
    format,
} from 'date-fns';

export default class DataBoxLayout {

    private container: HTMLDivElement;
    private valueColor: string;
    private labelColor: string;
    private dataTable: HTMLDivElement;
    private temperature: DataBox<number>;
    private estimatedCloudbase: DataBox<number>;
    private rainToday: DataBox<number>;
    private lastRain: DataBox<Date>;
    private windHigh: DataBox<WindHigh>;
    private humidity: DataBox<number>;
    private pressure: DataBox<number>;
    private dewPoint: DataBox<number>;

    private windUnitsLabel: string;
    private temperatureUnitsLabel: string;

    constructor(
        container: HTMLDivElement,
        labelColor: string,
        valueColor: string, 
        windUnitLabel: string, 
        temperatureUnitLabel: string,
    ) {
        this.container = container;
        this.labelColor = labelColor;
        this.valueColor = valueColor;
        this.windUnitsLabel = windUnitLabel;
        this.temperatureUnitsLabel = temperatureUnitLabel;
        this.render();
    }

    public updateTemperature(temp: number) {
        this.temperature.updateValue(temp);
    }

    public updateEstimatedCloudBase(estimatedCloubaseFt: number) {
        this.estimatedCloudbase.updateValue(estimatedCloubaseFt);
    }

    public updateRain(raingTodayCm: number, lastRain: Date) {
        this.rainToday.updateValue(raingTodayCm * 10);
        this.lastRain.updateValue(lastRain);
    }

    public updateWindHighToday(windSpeed: number, when: Date) {
        this.windHigh.updateValue({ windSpeed: windSpeed, when: when });
    }

    public updateHumidity(humidity: number) {
        this.humidity.updateValue(humidity);
    }

    public updatePressure(pressure: number) {
        this.pressure.updateValue(pressure);
    }

    public updateDewPoint(dewPoint: number) {
        this.dewPoint.updateValue(dewPoint);
    } 

    private render() {

        this.dataTable = document.createElement('div');
        this.dataTable.classList.add("dataTable");

        this.temperature = new DataBox<number>(
            this.dataTable,
            'Temp',
            (value: number) => {
                return Math.round(value).toString() + ' ' + this.temperatureUnitsLabel;
            });

        this.estimatedCloudbase = new DataBox<number>(
            this.dataTable,
            'Est. CBase',
            (value: number) => {
                return Math.round(value).toString() + ' ft';
            });

        this.rainToday = new DataBox<number>(
            this.dataTable,
            'Rain Today',
            (value: number) => {
                return Math.round(value).toString() + ' mm';
            });

        this.lastRain = new DataBox<Date | null>(
            this.dataTable,
            'Last Rain',
            function (when: Date | null) {

                if (when) {
                    return format(when, 'DD MMM') + ' ' + format(when, 'HH:mm');
                } else {
                    '-';
                }
            });

        this.windHigh = new DataBox<WindHigh>(
            this.dataTable,
            'Wind High',
            (value: WindHigh) => {
                return Math.round(value.windSpeed).toString() + ' ' + this.windUnitsLabel + ' @ ' + format(value.when, 'HH:mm');
            });

        this.humidity = new DataBox<number>(
            this.dataTable,
            'Humidity',
            (value: number) => {
                return Math.round(value).toString() + ' %';
            });

        this.pressure = new DataBox<number>(
            this.dataTable,
            'Pressure',
            (value: number) => {
                return Math.round(value).toString() + ' mb';
            });

        this.dewPoint = new DataBox<number>(
            this.dataTable,
            'Dewpoint',
            (value: number) => {
                return Math.round(value).toString() + ' ' + this.temperatureUnitsLabel;
            });

        this.container.appendChild(this.dataTable);
    }
} 

type WindHigh = {
    windSpeed: number, 
    when: Date
}

class DataBox<T> {

    private container: HTMLDivElement;
    private title: any;
    private dataBox: HTMLDivElement;
    private dataBoxTitle: HTMLDivElement;
    private dataBoxValue: HTMLDivElement;

    private formatFunction: (T) => string;

    constructor(
        container: HTMLDivElement,
        title: string,
        formatFunction: (T) => string
    ) {
        this.container = container;
        this.title = title;
        this.formatFunction = formatFunction;
        this.render();
    }

    public updateValue(value: T) {
        this.dataBoxValue.innerHTML = this.formatFunction(value);
    }

    private render() {
        this.dataBox = document.createElement('div') as HTMLDivElement;
        this.dataBox.classList.add('dataBox');

        this.dataBoxTitle = document.createElement('div') as HTMLDivElement;
        this.dataBoxTitle.classList.add('dataBoxTitle');
        this.dataBoxTitle.append(this.title);
        this.dataBox.appendChild(this.dataBoxTitle);

        this.dataBoxValue = document.createElement('div') as HTMLDivElement;
        this.dataBoxValue.classList.add('dataBoxValue');
        this.dataBoxValue.innerHTML = '-';
        this.dataBox.appendChild(this.dataBoxValue);
        this.container.appendChild(this.dataBox);
    }
}