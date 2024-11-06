import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // 100 virtual users
  duration: '1m', // 1-minute duratio
};

export default function () {
  const url = 'http://localhost:3001/addToCart/66e68a86af72a197796c730e';
  const payload = JSON.stringify({
    addToCart: '66e68a86af72a697796c7305',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params); // Make a POST request

  // Validate that the response status is correct and check response time
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1); // Sleep for 1 second between requests
}
