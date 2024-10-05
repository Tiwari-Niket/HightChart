# HighChart

## Description

To show graph on your project. You have to use this [Highcharts](https://www.highcharts.com/?_gl=1*lr518r*_up*MQ..&gclid=EAIaIQobChMInc2H_PHkiAMVHaODBx1lsgecEAAYASAAEgKsLvD_BwE) Library.

## How to run the project
1. There is 2 folder inside the project. First folder is frontend project using Angular and second is backend folder in c#.
2. Go to MoviesApi/MoviesApi/appsetting.json path and replace the connection string in given format "con": "server=***;uid=****;pwd=****;database=****;Min Pool Size=5;Max Pool Size=500;TrustServerCertificate=True;MultipleActiveResultSets=True;Command timeout=500".
3. Now Go to Highchart/src/app/shared/services/api.service.ts replace this url 'https://localhost:44396/api/Movies' with your backend url.

## Command to start the project
1. Open Highchart/Highchart folder, in visual studio code and run the command ** ng s --o ".
2. Open Highchart/MoviesApi and click on MoviesApi.sln and run the project.
