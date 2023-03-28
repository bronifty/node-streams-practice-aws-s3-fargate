# AWS S3 Streaming File Transfer from S3

- This stream copies files from a source S3 bucket to either a destination s3 bucket or files.com bucket.
- It is meant to run in Fargate. I am working on figuring out the best way to get it into Fargate as a Task definition.
- The error handling is nonexistent. I am working on that as well.

### Setup

```bash
yarn && yarn start
```

### ChatGPT Thread on PassThrough Streams

A PassThrough stream is a type of stream that acts as a "middleman" between a readable stream (input) and a writable stream (output). It's a simple implementation of a Transform stream that doesn't modify the data passing through it. It's part of the Node.js built-in stream module.

In the context of streaming data, a PassThrough stream can be useful when you want to perform some operations or monitoring on the data without modifying it, or when you want to pipe data through multiple streams.

When you pipe data from a readable stream to a PassThrough stream, it transparently passes the data to the connected writable stream (or the next stream in the pipeline). You can think of it as a "connector" that enables you to chain multiple streams together without altering the data itself.

In the example provided earlier, we used a PassThrough stream to pipe data from the source S3 bucket's readable stream to the destination S3 bucket's writable stream. This allows us to transfer data between the two S3 buckets without the need to buffer the entire file in memory, which is especially useful when dealing with large files.
