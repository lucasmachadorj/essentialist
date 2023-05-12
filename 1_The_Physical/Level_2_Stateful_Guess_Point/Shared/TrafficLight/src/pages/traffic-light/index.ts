import { Controller } from "./controller";
import { Repository } from "./repository";
import { Presenter } from "./presenter";
import { Clock } from "../../core/clock";

const clock = Clock.create();
const repository = Repository.create(clock);
const controller = Controller.create(repository);

export { controller, repository, Presenter };
