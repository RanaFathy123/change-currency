// Define Variables
const selectOne = document.querySelector("#selectOne");
const selectTwo = document.querySelector("#selectTwo");
const imgOne = document.querySelector("#imgOne");
const imgTwo = document.querySelector("#imgTwo");
const btnChange = document.querySelector("#change");
let sectionOne = document.querySelector("#sectionOne");
let sectionTwo = document.querySelector("#sectionTwo");
const currencyInput = document.querySelector("input");
const convertBtn = document.querySelector(".btn-secondary");
const currencyText = document.querySelector(".text");

console.log(imgOne);
const countryKeys = Object.keys(COUNTRY_NAMES);
console.log(countryKeys);

countryKeys.map((option) => {
  let selectOptions = `
  <option value=${option}>${option} || ${COUNTRY_NAMES[option]}</option>
   
`;
  selectOne.innerHTML += selectOptions;
  selectTwo.innerHTML += selectOptions;
});

selectOne.addEventListener("change", () => {
  /* console.log(selectOne.value.slice(0, 2));
  console.log(imgOne.src); */
  imgOne.src = `https://flagsapi.com/${selectOne.value.slice(
    0,
    2
  )}/shiny/32.png`;
});
selectTwo.addEventListener("change", () => {
  imgTwo.src = `https://flagsapi.com/${selectTwo.value.slice(
    0,
    2
  )}/shiny/32.png`;
});
btnChange.addEventListener("click", (e) => {
  let tempValue = null;
  tempValue = selectOne.value;
  selectOne.value = selectTwo.value;
  selectTwo.value = tempValue;
  imgOne.src = `https://flagsapi.com/${selectOne.value.slice(
    0,
    2
  )}/shiny/32.png`;
  imgTwo.src = `https://flagsapi.com/${selectTwo.value.slice(
    0,
    2
  )}/shiny/32.png`;
});

convertBtn.addEventListener("click", async () => {
  const prom = await fetch(
    `https://v6.exchangerate-api.com/v6/06e63df110653a37ae6e8872/latest/${selectOne.value}`
  );
  console.log(prom);
  const res = await prom.json();
  console.log(res);
  const data = await res.conversion_rates;
  console.log(selectTwo.value);
  let key = selectTwo.value;
  // Second cuurency
  console.log(data[key]);
  currencyInput.value == ""
    ? (currencyText.innerHTML = `1 ${selectOne.value} = ${data[key].toFixed(
        2
      )} ${selectTwo.value}`)
    : (currencyText.innerHTML = `${currencyInput.value} ${selectOne.value} = ${(
        currencyInput.value * data[key]
      ).toFixed(2)} ${selectTwo.value}`);
});
