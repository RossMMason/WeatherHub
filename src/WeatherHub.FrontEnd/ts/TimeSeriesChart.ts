import {
    addHours,
    addMinutes,
    differenceInMilliseconds,
    differenceInMinutes,
    format,
    isPast,
    startOfMinute,
    getHours,
    getMinutes
} from 'date-fns';

const svgns = 'http://www.w3.org/2000/svg';

export default class TimeSeriesChart {

    private showHours: number;
    private svg: SVGSVGElement;
    private container: HTMLElement;

    private viewBoxHeight =  300; 
    private viewBoxWidth = 900;
    private xPerMinute: number;
    private chartTotalMinutes: number;

    private chartIntervals: ChartInterval[];
    private series: SeriesInfo[];
    private numSeries: number;
    private zeroXDate: Date;
    private minorTickInterval: number;
    private timeTickInterval: number;

    private dateLabelHeight = 14;
    private timeLabelHeight = 14;
    private minorTickHeight = 10;
    private minorTickY1: number;
    private minorTickY2: number;
    private timeCentreY: number;
    private dateCentreY: number;
    private tickColor: string;
    private labelColor: string;


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
        this.labelColor = tickColor;
        this.calculateKeyFigures();
        this.render();
        this.createMissingIntervals();
        this.scheduleNextUpdate();
    }

    private calculateKeyFigures() {
        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);
        this.chartTotalMinutes = this.showHours * 60;
        this.zeroXDate = addHours(addMinutes(startOfMinute(new Date()), 1), -this.showHours);

        // At least 10 units per tick.
        this.minorTickInterval = 0;
        while (this.xPerMinute * this.minorTickInterval < 10) {
            this.minorTickInterval += 10
        }

        // Atleast 100 pixels per time tick.
        this.timeTickInterval = 0;
        while (this.xPerMinute * this.timeTickInterval < 100) {
            this.timeTickInterval += 15;
        }

        this.minorTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.minorTickHeight;
        this.minorTickY2 = this.minorTickY1 + this.minorTickHeight;
        this.timeCentreY = this.viewBoxHeight - this.dateLabelHeight - (this.timeLabelHeight / 2);
        this.dateCentreY = this.viewBoxHeight - (this.dateLabelHeight / 2);
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
                this.drawTickAndLabel(thisInterval.when);

                currentDate = addMinutes(currentDate, -1);
            }
        }

        // Populate intervals going forward
        let currentDate = addMinutes(this.chartIntervals[this.chartIntervals.length-1].when, 1);
        while (currentEndDate >= currentDate) {

            let thisInterval: ChartInterval = {
                when: currentDate,
                datapoints: new Array(this.numSeries)
            }

            this.chartIntervals.push(thisInterval);
            this.drawTickAndLabel(thisInterval.when);

            currentDate = addMinutes(currentDate, 1);
        }
    }

    private getXPosForDate(date: Date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }

    private drawTickAndLabel(date: Date) {
        let x = this.getXPosForDate(date);

        if (getHours(date) === 0 && getMinutes(date) === 0) {

            let dateLabel = document.createElementNS(svgns, 'text') as SVGElement;
            dateLabel.setAttribute('x', x.toString());
            dateLabel.setAttribute('y', this.dateCentreY.toString());
            dateLabel.setAttribute('text-anchor', 'middle');
            dateLabel.setAttribute('dominant-baseline', 'middle');
            dateLabel.innerHTML = format(date, 'Do MMM YY')
            dateLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');
            this.svg.appendChild(dateLabel);
        }

        if (getMinutes(date) % this.timeTickInterval === 0) {

            let timeLabel = document.createElementNS(svgns, 'text') as SVGElement;
            timeLabel.setAttribute('x', x.toString());
            timeLabel.setAttribute('y', this.timeCentreY.toString());
            timeLabel.setAttribute('text-anchor', 'middle');
            timeLabel.setAttribute('dominant-baseline', 'middle');
            timeLabel.innerHTML = format(date, 'HH')
            timeLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');
            this.svg.appendChild(timeLabel);
        }

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

        let xAxis = document.createElementNS(svgns, 'line') as SVGLineElement;

        xAxis.setAttribute('x1', '-99999');
        xAxis.setAttribute('x2', '99999');
        xAxis.setAttribute('y1', this.minorTickY1.toString());
        xAxis.setAttribute('y2', this.minorTickY1.toString());
        xAxis.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:2'); 
        this.svg.appendChild(xAxis);

    }

    private scheduleNextUpdate() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let timeUntilUpdate = differenceInMilliseconds(currentEndDate, new Date());
        setTimeout(this.updateDisplay.bind(this), timeUntilUpdate);
    }

    private updateDisplay() {
        this.createMissingIntervals();
        this.moveToCurrentTime();
        this.scheduleNextUpdate();
    }

    private moveToCurrentTime() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let currentStartDate = addHours(currentEndDate, -this.showHours); 
        let xOffset = differenceInMinutes(currentStartDate, this.zeroXDate) * this.xPerMinute;
        this.svg.setAttributeNS(null, 'viewBox', xOffset.toString() + ' 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
    }
}

type ChartInterval = {
    when: Date, 
    datapoints: (DataPoint | undefined)[]
}

type DataPoint = {
    value: number;
    element: SVGElement;
}

export type SeriesInfo = {
    color: string; 
    label: string;
}