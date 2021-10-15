const conversationDataJSON =
  '{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}';

const conversationParams = [
  { inputUnitName: "m", outputUnitName: "ft", conversionFactor: 3.28084 },
  { inputUnitName: "m", outputUnitName: "cm", conversionFactor: 100 },
  { inputUnitName: "m", outputUnitName: "in", conversionFactor: 39.3701 },
  { inputUnitName: "m", outputUnitName: "mm", conversionFactor: 1000 },
  { inputUnitName: "m", outputUnitName: "yd", conversionFactor: 1.09361 },
  { inputUnitName: "cm", outputUnitName: "m", conversionFactor: 0.01 },
  { inputUnitName: "cm", outputUnitName: "in", conversionFactor: 0.393701 },
  { inputUnitName: "cm", outputUnitName: "ft", conversionFactor: 0.0328084 },
  { inputUnitName: "cm", outputUnitName: "mm", conversionFactor: 10 },
  { inputUnitName: "cm", outputUnitName: "yd", conversionFactor: 0.0109361 },
  { inputUnitName: "in", outputUnitName: "m", conversionFactor: 0.0254 },
  { inputUnitName: "in", outputUnitName: "cm", conversionFactor: 2.54 },
  { inputUnitName: "in", outputUnitName: "ft", conversionFactor: 0.0833333 },
  { inputUnitName: "in", outputUnitName: "mm", conversionFactor: 25.4 },
  { inputUnitName: "in", outputUnitName: "yd", conversionFactor: 0.0277778 },
  { inputUnitName: "ft", outputUnitName: "cm", conversionFactor: 30.48 },
  { inputUnitName: "ft", outputUnitName: "m", conversionFactor: 0.3048 },
  { inputUnitName: "ft", outputUnitName: "in", conversionFactor: 12 },
  { inputUnitName: "ft", outputUnitName: "mm", conversionFactor: 304.8 },
  { inputUnitName: "ft", outputUnitName: "yd", conversionFactor: 0.333333 },
  { inputUnitName: "mm", outputUnitName: "m", conversionFactor: 0.001 },
  { inputUnitName: "mm", outputUnitName: "cm", conversionFactor: 0.1 },
  { inputUnitName: "mm", outputUnitName: "in", conversionFactor: 0.0393701 },
  { inputUnitName: "mm", outputUnitName: "ft", conversionFactor: 0.00328084 },
  { inputUnitName: "mm", outputUnitName: "yd", conversionFactor: 0.00109361 },
  { inputUnitName: "yd", outputUnitName: "m", conversionFactor: 0.9144 },
  { inputUnitName: "yd", outputUnitName: "cm", conversionFactor: 91.44 },
  { inputUnitName: "yd", outputUnitName: "mm", conversionFactor: 914.4 },
  { inputUnitName: "yd", outputUnitName: "in", conversionFactor: 36 },
  { inputUnitName: "yd", outputUnitName: "ft", conversionFactor: 3 },
];

function getConvertValue(dataJSON, params) {
  const data = JSON.parse(dataJSON);

  const conversationResult = params.reduce((result, param) => {
    if (
      param.inputUnitName === data.distance.unit &&
      param.outputUnitName === data.convert_to
    ) {
      result.unit = data.convert_to;
      result.value = Number(
        (data.distance.value * param.conversionFactor).toFixed(2)
      );
    }

    return result;
  }, {});

  return JSON.stringify(conversationResult);
}

console.log(getConvertValue(conversationDataJSON, conversationParams));
