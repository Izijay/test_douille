export interface Status {
	valid: boolean;
	message?: string;
}

type Rule = (value: string, password?: string) => Status;

/* export function length({ min, max }: { min: number, max: number }): Rule {
	return function (value: string): Status {
		const result = Boolean(value.length >= min && value.length <= max);

		return {
			valid: result,
			message: result ? undefined : `This field must be between ${min} and ${max} characters`,
		}
	}
} */

export function checkEmail(value: string): Status {
	const result = Boolean(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/));

	return {
		valid: result,
		message: result ? undefined : 'This field must be a valid email',
	}
}

export const  checkUsername: Rule = (value: string): Status => {
	const result = Boolean(value.match(/^[a-zA-Z][a-zA-Z0-9._-]{4,15}$/));

	return {
		valid: result,
		message: result ? undefined : 'This field must only contain between 4 and 15 letters, numbers or . _ -\nAnd must start with a letter',
	}
}


export const checkPassword: Rule = (value: string): Status => {
	const result = Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/));

	return {
		valid: result,
		message: result ? undefined : 'This field must contain between 8 and 15 characters\nOne lowercase and one uppercase letters\nOne number\nOne special character',
	}
}


export const required: Rule = (value: string): Status => {
	const result = Boolean(value);

	return {
		valid: result,
		message: result ? undefined : 'This field is required',
	}
}

export function validate(value: string, rules: Rule[]): Status {
	for (const rule of rules) {
		const result = rule(value);
		if (!result.valid) {
			return result;
		}
	}
	return {
		valid: true,
	}
}
