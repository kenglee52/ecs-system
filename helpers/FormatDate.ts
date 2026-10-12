export const FormatDate = (day: string) => {
         const newDay = String(day[8] + String(day[9]) + "/" + String(day[5]) + String(day[6]) + "/" + String(day[0]) + String(day[1]) + String(day[2]) + String(day[3]))
         return newDay;
}


export const FormatDateTime = (day: string) => {
         const date = new Date(day);
         const formatted = date.toLocaleString("en-GB", {
                  timeZone: "Asia/Vientiane",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, 
         });
         return formatted;
}