import { TimeIndexed } from './Types';

export default class DataLookup<T extends TimeIndexed> {

    private store: { [id: string]: T };

    constructor() {
        this.store = {};
    }

    public hasDataForDate(date: Date) {

        let key = this.getKey(date);

        return (key in this.store);
    }

    public addData(data: T) {

        if (!data) {
            return;
        }

        let key = this.getKey(data.when);
        this.store[key] = data;
    }

    public getData(date: Date): T | null {
        let key = this.getKey(date);

        if (key in this.store) {
            return this.store[key];
        }

        return null;
    }

    private getKey(date: Date): string {
        let key = date.toISOString();
        return key;
    }

    public getBetweenDates(startDate: Date, endDate: Date): T[] {

        let filteredItems: T[] = []; 

        let startDateIsoString = startDate.toISOString();
        let endDateIsoString = endDate.toISOString();

        let filteredDataElements: T[] = [];

        for (let key in this.store) {
            if (key >= startDateIsoString && key <= endDateIsoString) {
                filteredDataElements.push(this.store[key]);
            }
        }

        return filteredDataElements;
    }

    public getValues() {
        let values: T[] = [];

        for (let key in this.store) {
            values.push(this.store[key]);
        }

        return values;
    }
}
