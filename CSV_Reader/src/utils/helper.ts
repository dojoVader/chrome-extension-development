declare var navigator;

/**
 * Reads a CSV content from a file and return an
 * @param file
 */
export async function readCSV(file: File) : Promise<string|ArrayBuffer>{
    return new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (() => {
            const results = fileReader.result;
            resolve(results);
        });
        fileReader.onerror = (e) => reject(fileReader.error)
        fileReader.readAsText(file);
    })

}

export function getPercentage(totalCompleted: number, totalSize: number){
    return Math.floor((totalCompleted / totalSize) * 100);
}

export function csvToArray(csvString: string): string[]{
    return csvString.split(/\n/).filter(strings => strings !== "" );
}

export function searchForCommasInString(data:any,delimiter:string): any{
    if(typeof data === 'string'){
            return `"${data}"`;
    }
    else if(data === null){
        return '-'
    }
    return data;
}

// Bug: We need to handle commas specially
export function exportToCsv(filename: string, rows: String[]) {
    const processRow = function (row) {
        let finalVal: string = "";
        finalVal += row.join(",");
        finalVal += "\n";
        return finalVal;
    };

    let csvFile = "";
    for (let i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }
}