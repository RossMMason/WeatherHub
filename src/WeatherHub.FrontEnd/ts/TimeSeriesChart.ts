import {
    addHours,
    addMinutes,
    differenceInMilliseconds,
    differenceInMinutes,
    format,
    isPast,
    startOfMinute,
    getMinutes
} from 'date-fns';

const svgns = 'http://www.w3.org/2000/svg';

class TimeSeriesChart {

    private showHours: number;
    //private chartEndDate: Date;
    private svg: SVGSVGElement;
    private container: HTMLElement;

    private viewBoxHeight: 300; 
    private viewBoxWidth: 900;
    private xPerMinute: number;
    private chartTotalMinutes: number;

    private chartIntervals: ChartInterval[];
    private series: SeriesInfo[];
    private numSeries: number;
    private zeroXDate: Date;
    private minorTickInterval: number;
    private timeTickInterval: number;

    private dateLabelHeight = 10;
    private timeLabelHeight = 10;
    private minorTickHeight = 10;
    minorTickY1: number;
    minorTickY2: number;
    tickColor: string;


    constructor(
        container: HTMLElement,
        showHours: number,
        series: SeriesInfo[],
        tickColor: string) {
        this.container = container;
        this.showHours = showHours;
        this.series = series;
        this.numSeries = series.length;
        this.tickColor = tickColor;
        this.calculateKeyFigures();

        // this.chartEndDate = addMinutes(startOfMinute(new Date()), 1);
        // this.updateDisplay();
    }

    private calculateKeyFigures() {
        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);
        this.chartTotalMinutes = this.showHours * 60;
        this.zeroXDate = addHours(addMinutes(startOfMinute(new Date()), 1), -this.showHours);

        // At least 5 units per tick.
        this.minorTickInterval = 0;
        while (this.xPerMinute * this.minorTickInterval < 5) {
            this.minorTickInterval += 5
        }

        // Atleast 100 pixels per time tick.
        this.timeTickInterval = 0;
        while (this.xPerMinute * this.timeTickInterval < 100) {
            this.timeTickInterval += 15;
        }

        this.minorTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.minorTickHeight;
        this.minorTickY2 = this.minorTickY1 + this.minorTickHeight;

    }

    private createMissingIntervals() {

        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);

        // Populate intervals for base view. 
        if (!this.chartIntervals) {
            this.chartIntervals = [];

            let chartTotalMinutes = this.showHours * 60;

            let currentDate = new Date(currentEndDate);

            while (differenceInMinutes(currentEndDate, currentDate) <= this.chartTotalMinutes) {

                let thisInterval: ChartInterval = {
                    when: currentDate,
                    datapoints: new Array(this.numSeries)
                }

                this.chartIntervals = [thisInterval, ...this.chartIntervals];

                currentDate = addMinutes(currentDate, -1);
            }
        }

        // Populate intervals going forward
        let currentDate = addMinutes(this.chartIntervals[this.chartIntervals.length].when, 1);
        while (currentEndDate >= currentDate) {

            let thisInterval: ChartInterval = {
                when: currentDate,
                datapoints: new Array(this.numSeries)
            }

            this.chartIntervals.push(thisInterval);

            currentDate = addMinutes(currentDate, 1);
        }
    }

    private getXPosForDate(date: Date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }

    private drawTickAndLabel(date: Date) {

        let x = this.getXPosForDate(date);

        if (getMinutes(date) % this.minorTickInterval === 0) {

            let tick = document.createElementNS(svgns, 'line') as SVGLineElement;

            tick.setAttribute('x1', x.toString());
            tick.setAttribute('y1', this.minorTickY1.toString());
            tick.setAttribute('x2', x.toString());
            tick.setAttribute('y2', this.minorTickY2.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');
            this.svg.appendChild(tick);

        }


    }

    private render() {
        this.svg = document.createElementNS(svgns, 'svg');
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.container.appendChild(this.svg);
    }

    /*private scheduleNextUpdate() {
        if (isPast(this.chartEndDate)) {
            this.chartEndDate = addMinutes(startOfMinute(new Date()), 1);
            this.updateDisplay();
            return;
        }

        let timeUntilUpdate = differenceInMilliseconds(this.chartEndDate, new Date());

        setTimeout(this.updateDisplay, timeUntilUpdate);
    }*/
}

type ChartInterval = {
    when: Date, 
    datapoints: (DataPoint | undefined)[]
}

type DataPoint = {
    value: number;
    element: SVGElement;
}

type SeriesInfo = {
    color: string; 
    label: string;
}