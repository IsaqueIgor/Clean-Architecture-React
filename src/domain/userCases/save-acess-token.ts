export interface SaveAcessToken {
  save(accessToken: string): Promise<void>;
}
