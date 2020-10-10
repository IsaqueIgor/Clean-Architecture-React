import { SaveAcessToken } from '@/domain/userCases';
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalSaveAccessToken implements SaveAcessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken);
  }
}
