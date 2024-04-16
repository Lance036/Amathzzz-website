import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY= "AIzaSyDxNXthKpRVCbT07R6n8pqjhKGsNjfsJkM"
const submitButton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

function chaneInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}


async function getMessage() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = inputElement.value + ' [make it a paragraph if needed]'

  try{
    const result = await model.generateContent(prompt);
  const response = await result.response;
    const text = response.text();
    outputElement.textContent = text
    console.log(`User: ${prompt}`)
    console.log(`Amathzz: ${text}`);
    console.log(response)
   
  } catch(error){
    console.error(error)
  }

  if (outputElement){
    const pElement = document.createElement('p')
    pElement.textContent = inputElement.value
    pElement.addEventListener('click', () => chaneInput (pElement.textContent))
    historyElement.append(pElement)
  }
}

submitButton.addEventListener('click', getMessage);
inputElement.addEventListener('submit', getMessage)