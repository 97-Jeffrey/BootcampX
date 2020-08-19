const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString =`SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers JOIN assistance_requests ON teachers.id = teacher_id 
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`;

const cohortName =process.argv[2];
const values=[cohortName];

pool.query(queryString,values)
.then(res=>{
  res.rows.forEach(each=>{
    console.log(`${each.cohort}: ${each.teacher}`)
  })

})
.catch(err => console.error('Query error:', err.stack));