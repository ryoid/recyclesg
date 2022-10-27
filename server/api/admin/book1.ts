export default defineEventHandler((event) => {
    return {
        timings : ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"],
        minDateValue: new Date().toISOString(),
        selectedDate : "",
        selectedTiming: "",
        disabledDateArray : [],
        disabledTimingArray : [],        
    };
    });
