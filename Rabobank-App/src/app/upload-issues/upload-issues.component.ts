import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { sanitizeString, splitCSV } from '../../helpers/arrayHelpers';
import { splitNewLine } from '../../helpers/splitNewLine';

@Component({
  selector: 'app-upload-issues',
  templateUrl: './upload-issues.component.html',
  styleUrls: ['./upload-issues.component.scss'],
})
export class UploadIssuesComponent implements OnInit {
  headerArray: string[] = [];
  //TODO find a better solution to 'any'
  resultArray: any[] = [];
  resultArrayBackup: any[] = [];
  @ViewChild('csvUploadField') csvUploadField: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  /**
   * UploadListener will be triggerd when a file is uploaded.
   * @param $event This contains the oploaded csv file.
   */
  // TODO change 'any' to 'Event' and fix potential warnings and errors.
  uploadListener($event: any) {
    let file = $event.target.files;

    // Check if file is valid as the name ends with .csv and the file is of type csv.
    if (this.checkFileValid(file[0])) {
      let filereader = new FileReader();
      filereader.readAsText(file[0]);

      filereader.onload = () => {
        const csvResult = filereader.result;
        const recordsArray = splitNewLine(<string>csvResult);
        this.headerArray = this.getHeaderArray(recordsArray);
        this.resultArray = this.getDataFromCSVFile(recordsArray);
        this.resultArrayBackup = this.resultArray;
      };

      filereader.onerror = function () {
        // TODO Add a nice error message instead of a standard alert.
        alert('The file could not be uploaded, please try again.');
      };
    } else {
      // TODO Add a nice error message instead of a standard alert.
      alert('Import a valid csv file');
      this.reset();
    }
  }

  /**
   * This function is responsible for extracting data from the headers
   * @param csvHeaderRow
   */
  private getHeaderArray(csvHeaderRow: string[]) {
    //Unescape \" characters in case there are any to get a nice comma or semicolon seperated string
    const sanitizedRecords = sanitizeString(<string>csvHeaderRow[0]);
    //Check if CSV contains a comma or a semicolon. If not raise an error.
    return splitCSV(sanitizedRecords);
  }

  /**
   * This function is responsible for extracting the datarows from the csv file.
   * @param csvRecords
   * @returns resultArray
   */
  private getDataFromCSVFile(csvRecords: string[]) {
    const resultArray: object[] = [];

    /*
       - Slice the first row cause this is the header.
       - Unescape \" characters in case there are any to get a nice comma seperated string
       - Split the string based on a comma or semicolon
       - Check if there is a colum representing a date, convert it and push it back on the same row.
       - Return the result in an array.
    */
    csvRecords.slice(1).map((records: any) => {
      const sanitizedRecords = sanitizeString(records);
      const csvRow: string[] = splitCSV(sanitizedRecords);

      for (let x = 0; x < csvRow.length; x++) {
        if (!this.isNumber(csvRow[x]) && !!this.convertDate(csvRow[x])) {
          csvRow[x] = <string>this.datePipe.transform(csvRow[x], 'dd MMM yyyy');
        }
      }

      resultArray.push(csvRow);
    });
    return resultArray;
  }

  /**
   * Convert stringdate to date as part of a datecheck and better handling of sorting in the future.
   * @param date
   * @returns number
   */
  private convertDate(date: string) {
    return new Date(date).getTime();
  }

  /**
   * Check if the param is a number
   * @param value
   * @returns boolean
   */
  private isNumber(value: any): value is Number {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  /**
   * Validate function to check if uploaded file has a .csv or .CSV extension and the type is text/csv
   * @param file
   */
  private checkFileValid(file: any): boolean {
    return file.name.toLowerCase().endsWith('.csv') && file.type === 'text/csv';
  }

  /**
   * This function is responsible for searching the source.
   * @param value
   */
  searchValue(value: string) {
    if (!value) {
      this.resultArray = this.resultArrayBackup;
    } else {
      const tempArray: any[] = [];
      this.resultArray = this.resultArrayBackup;
      this.resultArray.filter((val) => {
        val.map((x: any) => {
          if (x === value) {
            tempArray.push(val);
          }
        });
      });
      this.resultArray = tempArray;
    }
  }

  /**
   * This function resets the input if a file is not correct.
   */
  private reset() {
    this.csvUploadField.nativeElement = '';
    this.resultArray = [];
  }
}
