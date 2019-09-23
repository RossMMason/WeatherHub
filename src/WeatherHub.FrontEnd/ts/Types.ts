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
    estimatedCloudBaseFt: number,
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

export interface StationDayStatistics {
    id: string,
    date: Date, 
    dewpointHighC: number, 
    dewpointHighTime: Date,
    dewpointLowC: number, 
    dewpointLowTime: Date, 
    heatIndexHighC: number, 
    heatIndexHighTime: Date,  
    pressureHighMbar: number, 
    pressureHighTime: Date, 
    pressureLowMbar: number,
    pressureLowTime: Date,
    rainRateHighCmPerHour: number,  
    relativeHumidityHigh: number, 
    relativeHumidyHighTime: Date, 
    relativeHumidityLow: number, 
    relativeHumidyLowTime: Date,  
    tempHighC: number, 
    tempHighTime: Date,  
    tempLowC: number,  
    tempLowTime: Date,  
    totalRainCm: number,
    windChillLowC: number,  
    windChillLowTime: Date,  
    windHighMph: number, 
    windHighTime: Date 
}

export interface StationStatistics {
    dayStatistics: StationDayStatistics
    lastRain: Date | null
}

export interface StationStatisticsDto {
    dayStatistics: StationDayStatistics
    lastRain: Date | null
}

export interface StationDayStatisticsDto {
    id: string,
    date: string,
    dewpointHighC: number,
    dewpointHighTime: string,
    dewpointLowC: number,
    dewpointLowTime: string,
    heatIndexHighC: number,
    heatIndexHighTime: string,
    pressureHighMbar: number,
    pressureHighTime: string,
    pressureLowMbar: number,
    pressureLowTime: string,
    rainRateHighCmPerHour: number,
    relativeHumidityHigh: number,
    relativeHumidyHighTime: string,
    relativeHumidityLow: number,
    relativeHumidyLowTime: string,
    tempHighC: number,
    tempHighTime: string,
    tempLowC: number,
    tempLowTime: string,
    totalRainCm: number,
    windChillLowC: number,
    windChillLowTime: string,
    windHighMph: number,
    windHighTime: string
}