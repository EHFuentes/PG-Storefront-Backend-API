import { UsersModel } from '../../models/users.model';

type Users = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  user_password: string;
};

describe('Users Model', () => {
  let usersModel: UsersModel;
  let userName: string;

  beforeEach(() => {
    usersModel = new UsersModel();
  });

  it('should be able to create a user', async () => {
    const user: Users = {
      first_name: 'test',
      last_name: 'test',
      username: `test${String(Math.random())}`,
      user_password: 'test',
    };

    userName = user.username;

    await usersModel.create(user);

    expect(user.first_name).toEqual('test');
    expect(user.last_name).toEqual('test');
    expect(user.username).toEqual(userName);
    expect(user.user_password).toEqual('test');
  });

  it('should be able to get a user by id', async () => {
    const user = await usersModel.show('1');

    expect(user.id).toEqual(1);
  });

  it('should be able to get all users', async () => {
    const users = await usersModel.index();

    expect(users.length).toBeGreaterThan(0);
  });

  it('should be able to check if a username exists', async () => {
    const username = 'test';
    const exists = await usersModel.checkUsernameExists(username);

    expect(exists).toBeDefined();
    expect(exists).toEqual(true);
  });

  it('should be able to authenticate a user', async () => {
    const username = userName;
    const password = 'test';

    const user = await usersModel.authenticate(username, password);

    expect(user).toBeDefined();
    expect(userName).toEqual(username);
  });
});
