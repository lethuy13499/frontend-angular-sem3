export class Constant {
  //LOCAL
  public static readonly BASE_URL = 'http://localhost:50356';
  public static readonly BASE_URL_FRONTEND = 'http://localhost:4200';


  //user
  public static readonly API_GET_ALL_USER=
  Constant.BASE_URL + '/Shopping/User/GetAll';
  public static readonly API_GET_GET_ONE_USER=
  Constant.BASE_URL + '/Shopping/User/Get';
  public static readonly API_ADD_USER=
  Constant.BASE_URL + '/Shopping/User/Add';
  public static readonly API_UPDATE_USER=
  Constant.BASE_URL + '/Shopping/User/Edit';
  public static readonly API_GET_DELETE_USER=
  Constant.BASE_URL + '/Shopping/User/Remove';
  //role
  public static readonly API_GET_ALL_ROLE=
  Constant.BASE_URL + '/Shopping/Role/GetAll';

}
