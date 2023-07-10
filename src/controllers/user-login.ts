import Router from '../utils/router';

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
  public async login(data: LoginFormModel) {
    try {
      // Запускаем крутилку

      const validateData = userLoginValidator(data);

      if (!validateData.isCorrect) {
        throw new Error(validateData);
      }

      const userID = loginApi.request(prepareDataToRequest(data));

      Router.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}

export default UserLoginController;
