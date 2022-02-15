# Superhero
A Super Single Page Hero App.
This project was generated with Angular version 13.2.3.

## Docker Deploy

All the project is packed in a Docker Image.

### Requirements

- Docker
- Docker-compose

### Deploy
 To deploy the container open a terminal in the root of the project folder.
 An execute:
 
 ```bash
  $ docker-compose up
 ```
If you prefer is possible build the image and run the container manualy. 
but is recommend use the configuraton in the compose file, beacause the rights ports number for the app sever comunication is configured .

Evenly is posible change  this configuration in the `enviroments.ts`, `Dockerfile` and `docker-compose.yml`.
the default configuration is: 
- port 3000 for json-server 
- port 8088 for nginx

