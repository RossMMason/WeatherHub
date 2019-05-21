import { addHours, addMinutes, differenceInMinutes, startOfMinute, getMinutes } from 'date-fns';
const svgns = 'http://www.w3.org/2000/svg';
export default class TimeSeriesChart {
    constructor(container, showHours, series, tickColor) {
        this.dateLabelHeight = 10;
        this.timeLabelHeight = 10;
        this.minorTickHeight = 10;
        this.container = container;
        this.showHours = showHours;
        this.series = series;
        this.numSeries = series.length;
        this.tickColor = tickColor;
        this.calculateKeyFigures();
    }
    calculateKeyFigures() {
        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);
        this.chartTotalMinutes = this.showHours * 60;
        this.zeroXDate = addHours(addMinutes(startOfMinute(new Date()), 1), -this.showHours);
        this.minorTickInterval = 0;
        while (this.xPerMinute * this.minorTickInterval < 5) {
            this.minorTickInterval += 5;
        }
        this.timeTickInterval = 0;
        while (this.xPerMinute * this.timeTickInterval < 100) {
            this.timeTickInterval += 15;
        }
        this.minorTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.minorTickHeight;
        this.minorTickY2 = this.minorTickY1 + this.minorTickHeight;
    }
    createMissingIntervals() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        if (!this.chartIntervals) {
            this.chartIntervals = [];
            let chartTotalMinutes = this.showHours * 60;
            let currentDate = new Date(currentEndDate);
            while (differenceInMinutes(currentEndDate, currentDate) <= this.chartTotalMinutes) {
                let thisInterval = {
                    when: currentDate,
                    datapoints: new Array(this.numSeries)
                };
                this.chartIntervals = [thisInterval, ...this.chartIntervals];
                currentDate = addMinutes(currentDate, -1);
            }
        }
        let currentDate = addMinutes(this.chartIntervals[this.chartIntervals.length].when, 1);
        while (currentEndDate >= currentDate) {
            let thisInterval = {
                when: currentDate,
                datapoints: new Array(this.numSeries)
            };
            this.chartIntervals.push(thisInterval);
            currentDate = addMinutes(currentDate, 1);
        }
    }
    getXPosForDate(date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }
    drawTickAndLabel(date) {
        let x = this.getXPosForDate(date);
        if (getMinutes(date) % this.minorTickInterval === 0) {
            let tick = document.createElementNS(svgns, 'line');
            tick.setAttribute('x1', x.toString());
            tick.setAttribute('y1', this.minorTickY1.toString());
            tick.setAttribute('x2', x.toString());
            tick.setAttribute('y2', this.minorTickY2.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');
            this.svg.appendChild(tick);
        }
    }
    render() {
        this.svg = document.createElementNS(svgns, 'svg');
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.container.appendChild(this.svg);
    }
}
import TimeSeriesChart from './TimeSeriesChart';
import WindRose from './WindRose';
class WeatherHubWidget {
    constructor(weatherStationId, weatherHubServer, widgetContainer) {
        this.labelColor = "#000000";
        this.avgWindColor = "#27AAE1";
        this.gustColor = "#F03153";
        this.weatherStationId = weatherStationId;
        this.weatherHubServer = weatherHubServer;
        this.widgetContainer = widgetContainer;
        this.addSubWidgets();
        this.positionSubWidgets();
        this.initialiseSubWidgets();
    }
    addSubWidgets() {
        this.innerContainer = document.createElement('div');
        this.innerContainer.style.position = 'relative';
        this.windRoseContainer = document.createElement("div");
        this.windRoseContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windRoseContainer);
        this.windStrengthContainer = document.createElement("div");
        this.windStrengthContainer.style.position = 'absolute';
        this.innerContainer.appendChild(this.windStrengthContainer);
        this.widgetContainer.appendChild(this.innerContainer);
    }
    positionSubWidgets() {
        this.windRoseContainer.style.width = "600px";
        this.windRoseContainer.style.height = "600px";
        this.windStrengthContainer.style.width = "900px";
        this.windStrengthContainer.style.height = "300px";
        this.windStrengthContainer.style.left = "610px";
    }
    initialiseSubWidgets() {
        this.windRose = new WindRose(this.windRoseContainer, this.labelColor, this.gustColor, this.labelColor);
        let windStrengthSeries = [
            {
                color: this.avgWindColor,
                label: '10 Min Avg Wind (mph)'
            },
            {
                color: this.gustColor,
                label: '10 Min Max Gust (mph)'
            },
        ];
        this.windStrengthChart = new TimeSeriesChart(this.windStrengthContainer, 24, windStrengthSeries, this.labelColor);
    }
}
const svgns = 'http://www.w3.org/2000/svg';
export default class WindRose {
    constructor(container, tickColor, arrowColor, labelColor) {
        this.renderSize = 600;
        this.currentPos = 0;
        this.container = container;
        this.tickColor = tickColor;
        this.arrowColor = arrowColor;
        this.labelColor = labelColor;
        this.setKeyPoints();
        this.render();
        this.moveToPosition(185);
    }
    moveToPosition(degrees) {
        if (this.arrowAnimation) {
            this.arrowAnimation.setAttribute('type', 'rotate');
            this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
            this.arrowAnimation.setAttribute('to', degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
            this.arrow.setAttribute('transform', 'rotate(' + degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString() + ')');
            this.currentPos = degrees;
        }
    }
    setKeyPoints() {
        this.centre = this.renderSize / 2;
        this.tickEndPos = 600 / 18;
    }
    render() {
        this.svg = document.createElementNS(svgns, 'svg');
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.renderSize.toString() + ' ' + this.renderSize.toString());
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.container.appendChild(this.svg);
        this.drawTicks(10, 2, 45);
        this.drawTicks(7, 1, 5);
        this.drawLabels();
        this.drawArrow();
    }
    drawLabels() {
        let labels = [
            { label: 'N', degrees: 0, isMajor: true },
            { label: 'NE', degrees: 45, isMajor: false },
            { label: 'E', degrees: 90, isMajor: true },
            { label: 'SE', degrees: 135, isMajor: false },
            { label: 'S', degrees: 180, isMajor: true },
            { label: 'SW', degrees: 225, isMajor: false },
            { label: 'W', degrees: 270, isMajor: true },
            { label: 'NW', degrees: 315, isMajor: false },
        ];
        for (let i = 0; i < labels.length; i++) {
            let thisLabel = document.createElementNS(svgns, 'text');
            if (labels[i].isMajor) {
                thisLabel.setAttribute('style', 'font: bold 20px sans-serif; fill: ' + this.labelColor + ';');
            }
            else {
                thisLabel.setAttribute('style', 'font: bold 14px sans-serif; fill: ' + this.labelColor + ';');
            }
            thisLabel.setAttribute('x', '300');
            thisLabel.setAttribute('y', '15');
            thisLabel.setAttribute('text-anchor', 'middle');
            thisLabel.setAttribute('dominant-baseline', 'middle');
            thisLabel.innerHTML = labels[i].label;
            thisLabel.setAttribute('transform', 'rotate(' + labels[i].degrees.toString() + ', 300, 300)');
            this.svg.appendChild(thisLabel);
        }
    }
    drawTicks(length, weight, intervalDegress) {
        let a = 0;
        while (a < 360) {
            let thisTick = document.createElementNS(svgns, 'line');
            thisTick.setAttribute('x1', this.centre.toString());
            thisTick.setAttribute('y1', (this.tickEndPos - length).toString());
            thisTick.setAttribute('x2', this.centre.toString());
            thisTick.setAttribute('y2', this.tickEndPos.toString());
            thisTick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:' + weight);
            thisTick.setAttribute('transform', 'rotate(' + a + ',' + this.centre + ',' + this.centre + ')');
            this.svg.appendChild(thisTick);
            a += intervalDegress;
        }
    }
    drawArrow() {
        let arrowEndPoint = this.tickEndPos + 15;
        let arrowSize = 25;
        let arrowStartY = arrowEndPoint + arrowSize;
        let points = (this.centre - 3).toString() + ' ' + this.centre.toString();
        points += ',' + (this.centre - 3).toString() + ' ' + arrowStartY.toString();
        points += ',' + (this.centre - (arrowSize / 2)).toString() + ' ' + arrowStartY.toString();
        points += ',' + this.centre.toString() + ' ' + arrowEndPoint.toString();
        points += ',' + (this.centre + (arrowSize / 2)).toString() + ' ' + arrowStartY.toString();
        points += ',' + (this.centre + 3).toString() + ' ' + arrowStartY.toString();
        points += ',' + (this.centre + 3).toString() + ' ' + this.centre.toString();
        this.arrow = document.createElementNS(svgns, 'polygon');
        this.arrow.setAttribute('style', 'fill:' + this.arrowColor + ';');
        this.arrow.setAttribute('points', points);
        this.arrowAnimation = document.createElementNS(svgns, 'animateTransform');
        this.arrowAnimation.setAttribute('attributeName', 'transform');
        this.arrowAnimation.setAttribute('attributeType', 'XML');
        this.arrowAnimation.setAttribute('type', 'rotate');
        this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('to', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('dur', '1.2s');
        this.arrowAnimation.setAttribute('repeatCount', '1');
        this.arrow.appendChild(this.arrowAnimation);
        this.svg.appendChild(this.arrow);
    }
}
//# sourceMappingURL=weather-hub-widget.js.map