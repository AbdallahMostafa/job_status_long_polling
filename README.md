# A NodeJS App to play around with long polling by provind two end points the main idea here is when you check the job status the server will only responed when the job is finished 
# Submit a job
```
POST /submit
Request {}
Response
[
    jobId
]
```
# Check Job Status
```
Get /checkStatus?jobId=jobId
Response 
JobStatus: 100%
```