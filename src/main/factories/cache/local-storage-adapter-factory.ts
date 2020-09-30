import { SetStorage } from '@/data/protocols/cache/set-storage';
import { LocalStorageAdapter } from '@/infra/test/cache/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter();
