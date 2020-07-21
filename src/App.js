import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './Hooks/useFetchJobs';
import { Container } from 'react-bootstrap'
import Job from './Components/Job'
import JobsPagination from './Components/JobsPagination';
import SearchForm from './Components/SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  const handleParamChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPage(1);
    setParams(s => ({ ...s, [name]: value }))
  }

  return (
    <Container className="my-4">
      <h1 className="mb-5">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing </h1>}
      {jobs.map((job, index) => (
        <Job key={job.id} job={job} />
      ))}
    </Container>
  );
}

export default App;
