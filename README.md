# Zow

View project proposal [here](documentation/proposal.pdf).

Project for UCLA Computer Science 130 (Software Engineering) with Professor Miryung Kim and TA Sneha Shankar.

### Running Zow

1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
2. From the project directory run `docker-compose up --build`
3. Read `server/config/template.json` and produce `server/config/private.json` accordingly
4. Visit the website at `localhost:3000`

### Test Cases

#### Frontend

Client tests can be viewed [here](https://github.com/NaimAyat/Zow/tree/master/client/src/components).
Client tests are written in the components folder. For example, if there is a component named `component` in the file `component.tsx`, its frontend component test is in `component.test.tsx`.

#### Backend

Backend tests are all in separate folders.

- [config/index.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/config/index.test.ts): tests to ensure configuration file works correctly
- [Answer.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/Answer.test.ts): tests to ensure Answer database model works correctly
- [Form.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/Form.test.ts): tests to ensure Form database model works correctly
- [InterviewSlot.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/InterviewSlot.test.ts): tests to ensure InterviewSlot database model works correctly
- [Question.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/Question.test.ts): tests to ensure Question database model works correctly
- [Response.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/Response.test.ts): tests to ensure Response database model works correctly
- [User.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/db/models/User.test.ts): tests to ensure User database model works correctly
- [email/index.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/email/index.test.ts): tests to ensure email module works correctly
- [graphql-server.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/handlers/graphql-server.test.ts): tests to ensure graphql server works correctly
- [resolvers.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/handlers/resolvers.test.ts): tests to ensure graphql resolvers work correctly
- [encrypt.test.ts](https://github.com/NaimAyat/Zow/blob/master/server/src/services/encrypt.test.ts): tests to ensure encryption module works correctly

## Team

- [Naim Ayat](https://github.com/NaimAyat)
- [Christopher Aziz](https://github.com/caziz)
- [Austin Berke](https://github.com/austinberke)
- [Dmitri Brereton](https://github.com/dkb868)
- [Reinaldo Daniswara](https://github.com/rdans)
- [Aidan Wolk](https://github.com/awolk)
