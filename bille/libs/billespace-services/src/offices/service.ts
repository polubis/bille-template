import { billespaceAPI } from '../instances';
import { OfficeDto } from './dtos';
import { CreateOfficePayload } from './payloads';

const service = billespaceAPI.createService({
  name: 'offices',
});

export const createOffice = service.post<null, CreateOfficePayload, OfficeDto>(
  null
);
