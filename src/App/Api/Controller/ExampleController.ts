import { RouteController } from '#src/Core/Api/Controller/RouteController';
import { ExampleDefinition } from '#src/App/Entity/Example/ExampleDefinition';

export default class ExampleController extends RouteController {
  public constructor() {
    super(new ExampleDefinition());
  }
}
