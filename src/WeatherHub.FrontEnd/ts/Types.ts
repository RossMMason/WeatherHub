export interface StationReading extends TimeIndexed  {
    id: string, 
    when: Date, 
    dewpointC: number, 
    heatIndexC: number,
    pressureMb: number,
    relativeHumidity: number,
    tempC: number,
    windDegrees: number,
    windAvgMph: number,
    windAvgGustMph: number,
    windChillC: number,
    rainCmPerHour: number,
}

export interface StationReadingDto {
    id: string,
    when: string,
    dewpointC: number,
    heatIndexC: number,
    pressureMb: number,
    relativeHumidity: number,
    tempC: number,
    windDegrees: number,
    windAvgMph: number,
    windAvgGustMph: number,
    windChillC: number,
    rainCmPerHour: number,
    estimatedCloudBaseFt: number, 
}

export interface TimeIndexed {
    when: Date
}