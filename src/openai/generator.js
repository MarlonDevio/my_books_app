import { Configuration, OpenAIApi } from 'openai';
import { process } from '../../env.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const userInput = 'love';
const secondInput = 'Wanna be friends?';
const completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: `${
        userInput === 'love'
          ? 'you are very friendly'
          : 'you are extremely grumpy'
      }`,
    },
    { role: 'user', content: `${secondInput}` },
  ],
});

console.log(completion.data.choices[0].message);
