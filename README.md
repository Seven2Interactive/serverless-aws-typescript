# Serverless starter project with Typescript and Jest Testing for AWS

This is a template for AWS and Serverless framework which sets you up with Typescript, testing with Jest, as well as serverless-offline for rapid local development. Below are a few steps you'll need to follow to get started.


## First time using Serverless and AWS:
1. Setup the serverless framework and your Provider Credentials. There is a great guide here:
[https://serverless.com/framework/docs/providers/aws/guide/quick-start/]()
If you are on macOS, the easiest way is to setup the AWS CLI is to install it through the [Homebrew project](https://brew.sh/). 
    
        brew install awscli

2. Configure awscli with an AWS account by running

        awscli configure

3. Install the serverless framework globally:

        npm i serverless -g

## Scaffolding your project using this template
Once you've set up the serverless framework and managed your AWS credentials, you can get started by running the following command:
    
    serverless create --template-url https://github.com/Seven2Interactive/serverless-aws-typescript --path my-project-name

Then Run

    cd my-project-name
    npm install

or, if you like yarn run

    cd my-project-name
    yarn

## Running local development server
To run a simulated Lambda HTTP webserver on your local machine, run the following command:
```npm run serve:lambda```

This will run webpack and automatially setup local routes which mirror your eventual Lambda deployment. This gives you the added benefit of seeing local console.logs in your terminal. (See the [serverless-offline](https://github.com/dherault/serverless-offline) project for more detailed information)

To test that your installation is working, point your browser to:
[http://localhost:3000/api/example]()
and you should see `"success!"`

## Deploying your functions
For development environment: 
    
    npm run deploy dev

For any other environment:

    npm run deploy some-environment-name


## Tearing down your functions USE WITH CAUTION
Running the following commands will remove ALL your functions and S3 buckets deployed with serverless. This is for everyone with access to the same AWS account, not just you.

    npm run remove

## Running Tests
Testing is setup using Jest. Put your tests in the `__tests__` folder and they will automatically be run. Any supporting code just for tests should go in the `__tests__/modules` folder. Any code in that folder won't automatically be run as a test. 

To run your test suite run the following command:

    npm test
