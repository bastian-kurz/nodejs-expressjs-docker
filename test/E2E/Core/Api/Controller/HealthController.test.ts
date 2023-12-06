import { spec } from 'pactum';
import { E2eBaseUrl } from '#test/Utils/E2eHelper';


describe('Health Api', () => {
  it('should return the correct status code', async () => {
    await spec()
      .get(`${E2eBaseUrl}/healthy`)
      .expectStatus(204);
  });
});
