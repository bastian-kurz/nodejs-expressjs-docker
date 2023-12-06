import { CreateSimpleResponse } from '#src/Core/Api/Response/Type/JsonResponseType';
import { Get, Route, SuccessResponse } from 'tsoa';
import { HttpStatusCode } from 'axios';

@Route('healthy')
export default class HealthController {
  @SuccessResponse(HttpStatusCode.NoContent)
  @Get('/')
  public async healthy(): Promise<void> {
    CreateSimpleResponse('');
  }
}
