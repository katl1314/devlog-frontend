export const ERROR_STATUS: { [status: number] : string } = {
  400: 'BadRequest',									// 잘못된 요청
  401: 'Unauthorized',								// 비인가 접근
  403: 'Forbidden',										// 권한이 없는 경우 (차단, 서버 설정)
  404: 'NotFound',										// 요청한리소스를 찾을 수 없을때
  500: 'InternalServerError',					// 서버 에러
}