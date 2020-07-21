import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

export default function Job({ job }) {
    const [open, setOpen] = useState(false)
    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div className={{ display: 'flex', whiteSpace: 'pre-wrap' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img className="" height="50" src={job.company_logo} alt={job.company} />
                </div>
                <Card.Text>
                    <Button variant="primary" onClick={() => setOpen(s => !s)}>{open ? "Hide Detials" : "View Details"}</Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>

    )
}
