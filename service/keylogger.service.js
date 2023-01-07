import BaseService from "./base.service";

export default class KeyloggerService extends BaseService {
  constructor(axios, config) {
    super(axios, "keyEvents", config);
  }
}
