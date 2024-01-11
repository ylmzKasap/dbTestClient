import axios from 'axios';
import { useEffect, useState } from 'react';
import { dbUrl, supavisorUrl } from './constants';

export default function App() {
  const [directRequests, setDirectRequests] = useState([]);
  const [supavisorRequests, setSupavisorRequests] = useState([]);

  useEffect(() => {
    let directInterval = window.setInterval(() => {
      const timeBeforeRequest = Date.now();
      axios.get(`${dbUrl}/message`).then(() => {
        const timeAfterRequest = Date.now();
        setDirectRequests(prev => {
          if (prev.length === 20) {
            window.clearInterval(directInterval);
            return prev;
          }
          return [...prev, timeAfterRequest - timeBeforeRequest]
        });
      });
    }, 1000)

    let supavisorInterval = window.setInterval(() => {
      const timeBeforeRequest = Date.now();
      axios.get(`${supavisorUrl}/message`).then(() => {
        const timeAfterRequest = Date.now();
        setSupavisorRequests(prev => {
          if (prev.length === 20) {
            window.clearInterval(supavisorInterval);
            return prev;
          }
          return [...prev, timeAfterRequest - timeBeforeRequest]
        });
      });
    }, 1000)
  }, [])

  const directMean = directRequests.reduce(
    (total, cur) => total + cur, 0) / directRequests.length;

  const supavisorMean = directRequests.reduce(
    (total, cur) => total + cur, 0) / directRequests.length;

  return <div id="container">
    <ol>
    <h2>Direct requests</h2>
    {
      directRequests.map((requestMs, i) => 
        <li key={i}>Request completed in <b>{requestMs}ms</b></li>)
    }
    {Boolean(directRequests.length) && <div>
      Mean: <b>{Math.round(directMean * 100) / 100}ms</b>
    </div>}
    </ol>
    <ol>
    <h2>Supavisor requests</h2>
    {
      supavisorRequests.map((requestMs, i) => 
        <li key={i}>Request completed in <b>{requestMs}ms</b></li>)
    }
    {Boolean(supavisorRequests.length) && <div>
      Mean: <b>{Math.round(supavisorMean * 100) / 100}ms</b>
    </div>}
    </ol>
  </div>
}