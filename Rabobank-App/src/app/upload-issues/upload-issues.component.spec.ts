import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIssuesComponent } from './upload-issues.component';
import { DatePipe } from '@angular/common';
import issuesFile from '../../../tests/helpers/issues-file';

describe('UploadIssuesComponent', () => {
  let component: UploadIssuesComponent;
  let fixture: ComponentFixture<UploadIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadIssuesComponent],
      providers: [DatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check file is valid function returning true', () => {
    const input = issuesFile();
    expect((component as any).checkFileValid(input)).toBeTrue();
  });

  it('should check file is valid function returning false', () => {
    const input = new File([], 'issues.xlsx', { type: 'text.xlsx' });
    expect((component as any).checkFileValid(input)).toBeFalse();
  });

  // Due lack of time it was not possible to implement all of these tests.
  // In a normal development situation i implement and run the tests before pushing it to production.
  it('should load a file in and process it in uploadListener', () => {
    const input = issuesFile();
    //TODO Implement test
  });

  it('should check if getHeaderArray function results in an array of objects', () => {
    //TODO Implement test
  });

  it('should check if a wrong type will result in an error message', () => {
    //TODO Implement test
  });

  it('should check if getDataFromCSVFile function results in an array of objects', () => {
    //TODO Implement test
  });

  it('should check if convertDate function returns a number', () => {
    //TODO Implement test
  });

  it('should check if isNumber returns a boolean true if input is a number', () => {
    //TODO Implement test
  });

  it('should check if isNumber returns a boolean false if input is not a number', () => {
    //TODO Implement test
  });

  it('should check if searchValue function returns expected array', () => {
    //TODO Implement test
  });

  it('should check if reset function clears parameters', () => {
    //TODO Implement test
  });
});
