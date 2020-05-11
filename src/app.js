const express = require("express");
const cors = require("cors");

 const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const likes = [];

function updateLike(request,response,next){
  //const {id} = request.
}

function validateIdRepository(request,response,next){
  const {id} = request.params;

  if(!isUuid(id)){
    return response.status(400).json({"Error":"Invalid Repository ID."});
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title,url,techs} = request.body;
  
  const repository = {id: uuid(),title,url,techs,likes:0};

  repositories.push(repository);

  return response.json(repository)


});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const {title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
    return response.status(400).json({"Error": "Index not found."})
  }

  const repository = {id,title,url,techs,likes:0};

  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id",validateIdRepository, (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  repositories.splice(repositoryIndex,1);
 
  return response.status(204).send();

});

app.post("/repositories/:id/like",validateIdRepository, (request, response) => {
  // TODO
  const {id} = request.params;

  const like = {idLike: uuid(),id};

  likes.push(like);

  const results = likes.filter(like=>like.id == id);

  const count = results.length;

  return response.json({"likes":count})

});

module.exports = app;
