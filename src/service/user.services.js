import * as userRepository from '../repositories/user.repositories.js';

function createUserService(newUser) {
    const user = userRepository.createUserRepository(newUser);
    return user;
}

export default createUserService;
