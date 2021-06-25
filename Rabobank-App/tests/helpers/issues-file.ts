const issuesCSV =
  '"First name","Sur name","Issue count","Date of birth"\n' +
  '"Theo","Jansen",5,"1978-01-02T00:00:00"\n' +
  '"Fiona","de Vries",7,"1950-11-12T00:00:00"\n' +
  '"Petra","Boersma",1,"2001-04-20T00:00:00"';

export default function () {
  return new File([issuesCSV], 'issues.csv', { type: 'text/csv' });
}
