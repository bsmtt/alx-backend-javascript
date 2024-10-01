const fs = require('fs');
const displayMessage = require('./0-console');

function filterByGroup(group, dataset) {
  return dataset.filter((entry) => entry.split(',').at(-1).toString().trim() === group);
}

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const sData = data.toString().trim().split('\n');
    const fullData = sData.splice(1, data.length);

    console.log(`Number of students: ${fullData.length}`);

    const groups = new Set(fullData.map((item) => item.trim().split(',').at(-1)));
    for (const group of groups) {
      const filtered = filterByGroup(group, fullData);
      const firstNames = filtered.map((entry) => entry.split(',').at(0));
      //console.log(`Number of students in ${group}: ${filtered.length}. List: ${firstNames.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
