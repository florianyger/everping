# Everping - Florian Yger

```
npm i
npm run start


(To generate a new JSON)
node data/generateDevices.js
```

## First step - reading and understanding subject (10 min)

Backend : Simple JSON file served by API, with a setTimeout

I will use fakerJS to generate JSON, i do not have time to generate lots of data manually

I will need : Express, Typescript, Nodemon, FakerJS

Searching for template ...

Found https://github.com/bpk68/api-server-starter-ts

I will integrate it to front end template.

------

Frontend : Simple table with pagination and filter

I will need : React, Typescript, Ant Design

I will use a template that i know
https://github.com/nbilalis/react-vite-ts-eslint-prettier-template

There are Vite, ESLint/Prettier/Airbnb codestyle, wonderful !

## Second step - project initialization (45 min)

Retrieve template, install Faker, Ant Design, Vitest, Husky.

Developing simple JSON served by API, according to template found, works like a charm, except module-alias.

No time to debug, we will import files the old way.

No time for cleaning useless files, sorry :)

Put a Ant Design button on page, and a fake test, all works !

## Third step - generate devices (15 min)

A little help from this post : https://stackoverflow.com/a/62566822

## Fourth step - npm script (10 min)

Launch in parallel back and front end in one command, thank you internet :
https://stackoverflow.com/a/30950298

## Fifth step - display serial number and security state (70 min)

I made a component ComputerFleet component which take clientId, and retrieve devices.

Then it displays all devices in an Antd Table.

I wrote a function to find missing securities in a device, i put some unit tests on this function.

Then i displayed icons as asked.

## Sixth step - Add pagination (20 min)

On back end, i made a small pagination feature, based on slicing results.

I display it quickly with Ant Design

## Seventh step - Add healthy devices percents (10 min)

Small computing displayed in table header. Not really optimized that being said.

## Final step - Add clientId select (15 min)

I followed instructions to make one api endpoint, so devices/id return also clientIds list, but i don't think it's a good idea.

I put it in a antd select.

## Epilogue

I'm running out of time, so i will not implement security status filtering.

Moreover, i must add some time i've taken to gradually wrote this file.
