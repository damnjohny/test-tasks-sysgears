const someData = `{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},
{"user": "greg@mail.com", "rating": 14, "disabled": false},
{"user": "john@mail.com", "rating": 25, "disabled": true}],
"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}`;

const someData_2 = `{"data": [{"name": "John", "email": "john2@mail.com"},
{"name": "John", "email": "john1@mail.com"},
{"name": "Jane", "email": "jane@mail.com"}],
"condition": {"include": [{"name": "John"}], "sort_by": ["email"]}
}`;

const excludeFun = (processedData, excludeData) => {
  const excludeResult = [];

  excludeData?.forEach((excludeItem) => {
    return processedData?.forEach((processedDataItem) => {
      if (
        processedDataItem[Object.keys(excludeItem)] !==
        excludeItem[Object.keys(excludeItem)]
      )
        excludeResult.push(processedDataItem);
    });
  });
  return excludeResult;
};

const includeFun = (processedData, includeData) => {
  const includeResult = [];

  includeData?.forEach((includeItem) => {
    return processedData?.forEach((processedDataItem) => {
      if (
        processedDataItem[Object.keys(includeItem)] ===
        includeItem[Object.keys(includeItem)]
      )
        includeResult.push(processedDataItem);
    });
  });
  return includeResult;
};

const customFilterFunctions = {
  exclude: excludeFun,
  include: includeFun,
};

const ascendingSortByKeyFun = (key) => (a, b) => a[key] > b[key] ? 1 : -1;

const customSortFunctions = {
  ascendingSortByKey: ascendingSortByKeyFun,
};

function getSortedData(inputData, filterFunctions, sortFunction) {
  if (inputData) {
    const formattedData = JSON.parse(inputData);
    const { data, condition } = formattedData;
    let result = [];

    if (!data || typeof data !== "object" || Object.keys(data).length === 0)
      return "There is no data to sort or their format cannot be processed!";
    if (
      !condition ||
      typeof condition !== "object" ||
      Object.keys(condition).length === 0
    )
      return "There are no sorting conditions or their format is not supported!";

    for (const key in filterFunctions) {
      if (Object.keys(condition).includes(key))
        result = filterFunctions[key](data, condition[key]);
    }

    result.sort(sortFunction(condition?.sort_by));

    return JSON.stringify({ result });
  } else {
    return `Data like "${inputData}" cannot be sorted!`;
  }
}

console.log(
  "getSortedData: ",
  getSortedData(
    someData,
    customFilterFunctions,
    customSortFunctions.ascendingSortByKey
  )
);
console.log(
  "getSortedData_2: ",
  getSortedData(
    someData_2,
    customFilterFunctions,
    customSortFunctions.ascendingSortByKey
  )
);
