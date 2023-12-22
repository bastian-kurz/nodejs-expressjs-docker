import { spec } from 'pactum';
import { E2eBaseUrl } from '#test/Utils/E2eHelper';
import { HttpStatusCode } from 'axios';

describe('Middleware -> Validator', () => {
  it('should throw the correct error', async () => {
    await spec()
      .get(`${E2eBaseUrl}/example/abc`)
      .expectStatus(HttpStatusCode.BadRequest)
      .expectJson({
        statusCode: HttpStatusCode.BadRequest,
        message: 'Parameter :id should have a min/max length of 32 characters',
      });
  });
});
