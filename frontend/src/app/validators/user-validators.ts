import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regexNoSpecialCharacters = new RegExp('^[A-Za-z0-9_-]*$');
export const customNoSpecialCharactersValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value as string;
	if (!regexNoSpecialCharacters.test(value)) {
		return { customNoSpecialCharactersValidator: true };
	}
	return null;
};

const regexStartWithLetter = new RegExp('^[A-Za-z]');
export const customStartWithLetterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value as string;
	if (!regexStartWithLetter.test(value)) {
		return { customStartWithLetterValidator: true };
	}
	return null;
};
