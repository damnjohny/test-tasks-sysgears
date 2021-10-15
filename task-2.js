const someData = `{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},
{"user": "greg@mail.com", "rating": 14, "disabled": false},
{"user": "john@mail.com", "rating": 25, "disabled": true}],
"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}`;

const someData_2 = `{"data": [{"name": "John", "email": "john2@mail.com"},
{"name": "John", "email": "john1@mail.com"},
{"name": "Jane", "email": "jane@mail.com"}],
"condition": {"include": [{"name": "John"}], "sort_by": ["email"]}
}`;

function sortBy(inputData) {
  const formattedData = JSON.parse(inputData);
  const { data, condition } = formattedData;
  const result = [];

  function sortByKey(key) {
    return (a, b) => (a[key] > b[key] ? 1 : -1);
  }

  if (condition.exclude) {
    condition.exclude.forEach((cond) => {
      return data.forEach((d) => {
        if (d[Object.keys(cond)] !== cond[Object.keys(cond)]) result.push(d);
      });
    });
  }

  if (condition.include) {
    condition.include.forEach((cond) => {
      return data.forEach((d) => {
        if (d[Object.keys(cond)] === cond[Object.keys(cond)]) result.push(d);
      });
    });
  }

  result.sort(sortByKey(condition.sort_by));

  return JSON.stringify({ result });
}

console.log("sortBy: ", sortBy(someData));
console.log("sortBy_2: ", sortBy(someData_2));
