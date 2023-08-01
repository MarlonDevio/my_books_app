import { TIMEOUT_SEC } from './config.js';

// Function to set a timeout for the fetch request
const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// Function to get JSON data from API
export const getJSON = async function(url) {
  try {
    const fetchPro =  fetch(url);
    // race between the fetch and the timeout
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status} ${data.error.message} `);
    return data;
  } catch (err) {
    throw err;
  }
};