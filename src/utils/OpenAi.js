import Groq from "groq-sdk";
import { OPENAI_KEY } from './constants';

// const client = new OpenAI({
//   apiKey: OPENAI_KEY,
//   dangerouslyAllowBrowser: true
// })

const groq = new Groq({ 
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export default groq;


