import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '20s', target: 1000 }
  ]
};

export default function() {
  let res = http.get(`http://localhost:3001/api/songs/${Math.floor(Math.random() * 10000000) + 1}`);
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 2000,
  });
  sleep(0.1);
}
