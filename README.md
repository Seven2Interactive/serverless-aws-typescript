# Serverless starter project with Typescript and Jest Testing for AWS
Steps to get started:

## First time using Serverless and AWS:
1. The easiest way is to setup the AWS CLI through Mac homebrew [https://brew.sh/]() (not on macOS,  follow the guide to installing aws cli in step 2)
    
    ```brew install awscli```

1. Setup the serverless framework and your Provider Credentials. There is a great guide here:
[https://serverless.com/framework/docs/providers/aws/guide/quick-start/]()

2. Install the serverless framework globally:

    ```npm i serverless -g``` 

## Subsequent Setup Steps
Install this template either through clicking the download button on GitLab, or running the following commands:
    
    git clone --depth=1 https://gitlab.seven2.com/seven2/serverless/aws-typescript.git  my-project-name

    cd my-project-name

    rm -rf !$/.git

    git init

Then Run

```npm install```

or, if you like yarn run

 ```yarn```

## Running local development server
To run a simulated Lambda webserver on your local machine, run the following command:
```npm run start```

This will run webpack and automatially setup local routes which mirror your eventual Lambda deployment. This gives you the added benefit of seeing local console.logs in your terminal.

Simply point your browser to:
[http://localhost:3000/example/function]()
and you should see `"success!"`

## Running Tests
Testing is setup using Jest. Put your tests in the `__tests__` folder and they will automatically be run. Any supporting code just for tests should go in the `__tests__/modules` folder. 

Run: ```npm test``` to run your test suite
