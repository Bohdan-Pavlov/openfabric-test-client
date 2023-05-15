export const ACCESS_TOKEN = 'accessToken';
export const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export enum AuthValidationErrorMessages {
	REQUIRED = 'This field is required!',
	MIN_LENGTH = 'Must be longer than 5 symbols!',
	INVALID_EMAIL = 'Invalid email!',
	PASSWORD_MISMATCH = "Passwords don't match!",
}
