const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    multipleStatements: true
    
});
db.connect((err)=>{
    if (err) {
        console.log('Error connecting to DB')
        
    } 
console.log('Connection Established!')
})

// Queries 
const create_db = `CREATE DATABASE task; USE task`
const first_query = `USE task; CREATE TABLE patient (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    LMP DATETIME,
    DOB DATE,
    Ga VARCHAR(20),
    pregnancy_age INT,
    patient_age INT
    );
INSERT INTO patient (ID,FirstName,LastName,LMP,DOB) VALUES
(123456780,"Simi","Goldfinger","2022-11-30 0:00:00","1989-01-01"),
(123456781,"chava","druker","2022-12-13 0:00:00","1983-03-12"),
(123456782,"Gal","Zadik","2022-07-29 0:00:00","1987-05-17"),
(123456783,"Dalia","Tsim","2022-12-18 0:00:00","1989-05-14"),
(123456784,"dora","struma","2022-06-03 0:00:00","1994-07-12"),
(123456785,"Sivan","Luka","2022-07-26 0:00:00","1998-12-19"),
(123456786,"Mor","Zula","2022-09-17 0:00:00","1997-09-10"),
(123456787,"Chaya","Zilbershmit","2022-09-09 0:00:00","2001-12-23"),
(345678987,"Malka","Cohen","2022-06-29 0:00:00","2003-05-28"),
(321345432,"Emeli","Zarka","2022-08-17 0:00:00","2003-04-13"),
(376578934,"Hagit","Zimmer","2022-09-30 0:00:00","1989-02-28"),
(921234321,"Haleli","Bukobza","2022-10-13 0:00:00","1989-03-29"),
(874123543,"Neta","Shayer","2022-10-29 0:00:00","2000-02-01"),
(786543123,"Niva","Haldenkratz","2022-11-18 0:00:00","1987-02-01"),
(543678432,"Esther","Zajac","2022-10-03 0:00:00","1999-01-03"),
(321432543,"Zoya","Pomerantz","2022-09-26 0:00:00","1987-09-27"),
(215345632,"Zeeva","Tarnegolet","2022-09-17 0:00:00","1986-01-12"),
(876956345,"Zila","Bakenbaeur","2022-09-09 0:00:00","1990-11-13"),
(987876765,"Korin","Kalestasz","2022-08-29 0:00:00","2000-02-26"),
(345765987,"Nina","Simone","2022-08-17 0:00:00","1993-09-17");
`;
const all_patients = `SELECT * FROM patient`;
// Create Database
db.query(create_db,function(err,results){
    if (err) {
        throw err
    } else {
        console.log('Database Created Successfully')
    }
    });
// Creation of Patients on DB
db.query(first_query,function(err,result){
    if (err) {
        throw err
    } else {
        console.log('Patients Added Successfully')
    }
});

//find all patients + Calculate GA to EveryOne
db.query(all_patients,function(err,results){
    if (err) {
        throw err
    } else {
        console.log('All patients Found :) ');
        for (let patient of results) {
            var update_ga = `USE task;UPDATE patient SET Ga="${GA(patient.LMP)}" WHERE FirstName="${patient.FirstName}"`
            var update_patient_age = `USE task;UPDATE patient SET patient_age="${patientAge(patient.DOB)}" WHERE FirstName="${patient.FirstName}"`
            var update_pregnancy_age = `USE task;UPDATE patient SET pregnancy_age="${daysToToday(patient.LMP)}" WHERE FirstName="${patient.FirstName}"`
            db.query(update_ga,function(err,final){
                console.log('Ga, Updated Successfully')
            })
            db.query(update_patient_age,function(err,final){
                console.log('Patient Age, Updated Successfully')
            })
            db.query(update_pregnancy_age,function(err,final){
                console.log('Pregnancy Age, Updated Successfully')
            })

        }
    }
})
// Calculations
function daysToToday(date) {
    const msDiff = new Date() - date;
    const daysDiff = Math.floor(msDiff / 1000 / 60 / 60 / 24);
    return daysDiff;
}
function GA(PatientLmp) {
  const ageByDays = daysToToday(PatientLmp);
  const ageByWeeks = Math.floor(ageByDays / 7);
  return `${ageByWeeks}w${ageByDays % 7}d`;
}
function patientAge(dateOfBirth) {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    if (
        today.getMonth() < dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())
    ) {
        age--;
    }
    return age;
}

