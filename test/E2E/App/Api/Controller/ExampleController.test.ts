import { spec } from 'pactum';
import { E2eBaseUrl } from '#test/Utils/E2eHelper';
import { HttpStatusCode } from 'axios';
import { RegExIsoDate, RegExUuId } from '#test/Utils/RegEx';

describe('Example Api', () => {
  const singleExpectedResponse: object = {
    data: {
      id: RegExUuId,
      foo: 'E2e - Test example',
      bar: 1,
      createdAt: RegExIsoDate,
      updatedAt: RegExIsoDate,
    },
  };

  const singleExpectedResponseAfterUpdate: object = {
    data: {
      id: RegExUuId,
      foo: 'E2e - Test update',
      bar: 1,
      createdAt: RegExIsoDate,
      updatedAt: RegExIsoDate,
    },
  };

  const listExpectedResponse: object = {
    data: [
      {
        id: RegExUuId,
        foo: 'E2e - Test example',
        bar: 1,
        createdAt: RegExIsoDate,
        updatedAt: RegExIsoDate,
      },
    ],
  };

  it ('should create an example item', async () => {
    await spec()
      .post(`${E2eBaseUrl}/example`)
      .withJson({
        foo: 'E2e - Test example',
        bar: 1,
      })
      .stores('id', 'data.id')
      .expectStatus(HttpStatusCode.Created)
      .expectJsonLike(singleExpectedResponse);
  });

  it ('should fetch new created item', async () => {
    await spec()
      .get(`${E2eBaseUrl}/example/$S{id}`)
      .expectStatus(HttpStatusCode.Ok)
      .expectJsonLike(singleExpectedResponse);
  });

  it ('should return at least one item in the list', async () => {
    await spec()
      .get(`${E2eBaseUrl}/example`)
      .expectStatus(HttpStatusCode.Ok)
      .expectJsonLike(listExpectedResponse);
  });

  it ('should update the item correct', async () => {
    await spec()
      .patch(`${E2eBaseUrl}/example/$S{id}`)
      .withJson({
        foo: 'E2e - Test update',
      })
      .expectStatus(HttpStatusCode.Ok)
      .expectJsonLike(singleExpectedResponseAfterUpdate);
  });

  it ('should delete the item', async () => {
    await spec()
      .delete(`${E2eBaseUrl}/example/$S{id}`)
      .expectStatus(HttpStatusCode.NoContent);
  });
});
