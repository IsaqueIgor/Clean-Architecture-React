import { SaveAcessToken } from '@/domain/userCases';
import { SetStorage } from '@/data/protocols/cache/set-storage';
import { UnexpectedError } from '@/domain/errors';

export class LocalSaveAccessToken implements SaveAcessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError();
    }
    await this.setStorage.set('accessToken', accessToken);
  }
}
