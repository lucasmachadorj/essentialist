import { cache } from "../../core/shared";
import { Controller } from "./controller";
import { Presenter } from "./presenter";
import { Repository } from "./repository";

const repository = new Repository(cache);
const controller = new Controller(repository);
const presenter = new Presenter(cache);

export { controller, presenter, repository };
