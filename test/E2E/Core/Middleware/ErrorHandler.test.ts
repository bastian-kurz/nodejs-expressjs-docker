import { HttpStatusCode } from 'axios';
import { E2eBaseUrl } from '#test/Utils/E2eHelper';
import { spec } from 'pactum';

describe('Error Handlers', () => {
  it('should handle 404 errors', async () => {
    await spec()
      .get(`${E2eBaseUrl}/foo`)
      .expectStatus(HttpStatusCode.NotFound)
      .expectJson({
        statusCode: HttpStatusCode.NotFound,
        message: 'The route you are looking for not exists',
      });
  });
});
