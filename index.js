const app = require("express")();
const jobs = {}

app.post("/submit", (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkStatus", async (req, res) => {
    console.log(jobs[req.query.jobId]);
    // Long Polling, don't respond until it is done
    while(await checkJobComplete(req.query.jobId) == false);
    res.end("\n\nJobStatus: Complete " + jobs[req.query.jobId] + "%\n\n");
});

app.listen(8080, () => console.log('Listening on 8080'));

// Promise based so it does not block
async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if (jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 1000);
        else
            resolve(true);
    })
}

function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    console.log(`updated ${jobId} to ${prg}`);
    if (prg == 100) return
    this.setTimeout(() => updateJob(jobId, prg  + 10), 10000)
}

// client code
// curl -X POST http://localhost:8080/submit   
// OutPut => job:1681324409086
// curl -s "http://localhost:8080/checkstatus?jobId=job:1681324409086"
// or
// curl http://localhost:8080/checkstatus?jobId=job:1681324409086
// Output => JobStatus: Complete 100%