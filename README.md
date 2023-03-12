# electionmachinecharts
Create charts from parliamentary election candidates' replies to election questionnaire (vaalikone in Finnish).

<img src="https://user-images.githubusercontent.com/28629173/224566328-6e46dcbe-247c-450e-aed7-8f7a1957f1c8.png" width="700" height="500">

## Requirements to run the program
- Docker
- docker-compose

## Usage
Run in the root of the repository:
```
docker-compose up
```
Navigate with your browser to localhost:8080/emv

Note: This will by default fetch the data from Yle's public APIs. It will take some minutes. This behavior can be disabled by setting MIGRATION_ENABLED env variable to false in docker-compose.yml

Note 2: Possible problem in running docker-compose which I didn't encounter: it might depend on platform, if the required folder for the volume needed by the database container is autocreated. If folder ~/docker-volumes is not created and database is not starting, create the folder or modify docker-compose.yml to mount some other folder to the database container.
