import express, { Request, Response, Router } from 'express';
import EntityRepository from '#src/Core/DataAbstractionLayer/EntityRepository';
import expressAsyncHandler from 'express-async-handler';
import EntitySearchResult from '#src/Core/DataAbstractionLayer/Search/EntitySearchResult';
import { CreateDetailResponse, CreateListResponse } from '#src/Core/Api/Response/Type/JsonResponseType';
import { HttpStatusCode } from 'axios';
import { EntityDefinition } from '#src/Core/DataAbstractionLayer/EntityDefinition';
import RequestCriteriaBuilder from '#src/Core/DataAbstractionLayer/Search/RequestCriteriaBuilder';
import Criteria from '#src/Core/DataAbstractionLayer/Search/Criteria';

export abstract class RouteController {
  protected constructor(
    protected _entityDefinition: EntityDefinition,
    protected readonly _basePath?: string,
    protected readonly _entityRepository?: EntityRepository,
    protected readonly _router: Router = express.Router(),
    private readonly _requestCriteriaBuilder: RequestCriteriaBuilder = new RequestCriteriaBuilder(),
  ) {
    this._basePath = this._basePath ?? `/${this._entityDefinition?.getEntityName().toLowerCase()}`;
    this._entityRepository = new EntityRepository(this._entityDefinition);
  }

  protected findAll(basePath: string): Router {
    return this.router.get(
      basePath,
      expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
          let criteria: Criteria = new Criteria();
          criteria = this._requestCriteriaBuilder.handleRequest(req, criteria, this._entityDefinition!);
          const [entitySearchResult, pagination] =
            await this._entityRepository!.findAll(criteria);

          res.status(HttpStatusCode.Ok).json(CreateListResponse(entitySearchResult, pagination));
        }),
    );
  }

  protected findById(basePath: string): Router {
    return this.router.get(
      `${basePath}/:id`,
      expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
          let criteria: Criteria = new Criteria();
          criteria = this._requestCriteriaBuilder.handleRequest(req, criteria, this._entityDefinition!);
          const entity: EntitySearchResult = await this._entityRepository!.findById(criteria);
          res.status(HttpStatusCode.Ok).send(CreateDetailResponse(entity));
        }),
    );
  }

  protected create(basePath: string): Router {
    return this.router.post(
      basePath,
      expressAsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
          const entity: EntitySearchResult = await this._entityRepository!.create(req);
          res.status(HttpStatusCode.Created).json(CreateDetailResponse(entity));
        }),
    );
  }

  protected update(basePath: string): Router {
    return this.router.patch(
      `${basePath}/:id`,
      expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        let criteria: Criteria = new Criteria();
        criteria = this._requestCriteriaBuilder.handleRequest(req, criteria, this._entityDefinition!);
        const entity: EntitySearchResult = await this._entityRepository!.update(criteria, req.body);
        res.status(HttpStatusCode.Ok).json(CreateDetailResponse(entity));
      }),
    );
  }

  protected delete(basePath: string): Router {
    return this.router.delete(
      `${basePath}/:id`,
      expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        let criteria: Criteria = new Criteria();
        criteria = this._requestCriteriaBuilder.handleRequest(req, criteria, this._entityDefinition!);
        await this._entityRepository!.delete(criteria);
        res.status(HttpStatusCode.NoContent).json(undefined);
      }),
    );
  }

  public buildRoutes(): Router {
    if (!(this._entityRepository instanceof EntityRepository)) {
      throw new Error('_entityRepository should be an instance of EntityRepository');
    }

    this.findAll(this._basePath!);
    this.findById(this._basePath!);
    this.create(this._basePath!);
    this.update(this._basePath!);
    this.delete(this._basePath!);

    return this.router;
  }

  public get router(): Router {
    return this._router;
  }
}
