import { FormControl, FormGroup } from '@angular/forms';

export const getControl = (formGroup: FormGroup, formControlName: string) => {
	return formGroup.get(formControlName) as FormControl;
};
