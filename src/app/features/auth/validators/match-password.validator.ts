import {
	AbstractControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (
	control: AbstractControl
): ValidationErrors | null => {
	const formGroup = control as FormGroup;
	const password = formGroup.get('password')?.value;
	const confirmPassword = formGroup.get('confirmPassword')?.value;

	if (password !== confirmPassword) {
		formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
		return { passwordMismatch: true };
	} else {
		formGroup.get('confirmPassword')?.setErrors(null);
		return null;
	}
};
