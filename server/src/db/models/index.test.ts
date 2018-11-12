import * as models from '../models'
import User from './User';
import { doesNotReject } from 'assert';


describe("Database Models", () => {
  describe("User model", () => {
    test("Should not be valid without an email", async () => {
      let u = new User({name: "name", password:"password"})
    try { 
      await u.validate();
    } catch(err){
      expect(err.name).toEqual('ValidationError')
    }
    });
  });
});