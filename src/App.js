import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './Hooks/useFetchJobs';
import { Container } from 'react-bootstrap'
import Job from './Components/Job'

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing </h1>}
      <h1>{jobs.map((job, index) => (
        <Job key={job.id} job={job} />
      ))}</h1>
    </Container>
  );
}

export default App;
