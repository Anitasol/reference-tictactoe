----

1. Jenkins URL and username and password.
http://82.221.49.142:8080/
username: Freyttur
password: 123456

2. Game URL (AWS)
https://35.164.226.192/ (af einhverri ástæðu hætti urlið að virka á seinustu stundu)

## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- dockerbash.sh: Build the project on the commitstage

- docker-compose.yaml: Connects the database

- deployScript.sh: Connects the project to the AWS machine

- cleanbash.sh: Clean docker images and containers

-migratedScript.sh: runs migratedb

-run-docker-compose.sh: runs docker compose up


## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)

Create game command
-should emit game created event
Join game command
-should emit game joined event
-should emit FullGameJoinAttempted when game full
Place move command
-should emit MovePlaced on first game move
-should emit IllegalMove when square is already occupied
-Should emit NotYourMove if attempting to make move out of turn
-Should emit game won on
-Should not emit game draw if won on last move
-Should emit game draw when neither wins

- Is the game playable?
I dont know


## Data migration

Did you create a data migration.

- Migration up and down


## Jenkins

Do you have the following Jobs and what happens in each Job:

Jenkins builds the project, runs the code and gives feedback if it went through or not. If it builds then Deployment takes over and runs it up on AWS if it goes through without errors.


Did you use any of the following features in Jenkins?

- Schedule or commit hooks

- Pipeline

- Jenkins file

- Webhook
