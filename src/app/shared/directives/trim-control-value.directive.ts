import { Directive, HostListener, OnInit } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
	selector: '[appTrimControlValue]',
})
export class TrimControlValueDirective implements OnInit {
	protected control: AbstractControl | null = null;

	@HostListener('keypress', ['$event'])
	onInput(event: Event): void {
		if (!(event.target as HTMLInputElement).value.trim().length) {
			const value: string = this.control?.value;
			if (value) {
				this.control?.setValue(value.trim());
			}
			this.control?.updateValueAndValidity();
		}
	}

	constructor(private ngControl: NgControl) {}

	ngOnInit(): void {
		this.control = this.ngControl.control;
	}
}
