### Serverless starter project with Typescript and Jest Testing for AWS
Steps to get started:

1. One time only: Setup the serverless framework and your Provider Credentials. There is a great guide here:
[https://serverless.com/framework/docs/providers/aws/guide/quick-start/]()

    The easiest way is to setup the AWS CLI through homebrew:
    [https://brew.sh/]() and then run ```brew install awscli```

2. Install the serverless framework:
    ```npm i serverless -g``` 

3. Install this template as a starter with the following command
    ```serverless install --url https://gitlab.seven2.com/seven2/serverless/aws-typescript.git --name my-project```

### Running local development server
To run a simulated Lambda webserver on your local machine, run the following command:
```npm run start```

This will run webpack and automatially setup local routes which mirror your eventual Lambda deployment. This gives you the added benefit of seeing local console.logs in your terminal.

Simply point your browser to:
```http://localhost:3000/example/function``` 
and you should see "success!"

### Running Tests
Testing is setup using Jest. Put your tests in the `__tests__` folder and they will automatically be run. Any supporting code just for tests should go in the `__tests__/modules` folder. 

Run: ```npm test``` to run your test suite
