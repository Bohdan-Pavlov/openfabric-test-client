import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrimControlValueDirective } from 'src/app/shared/directives/trim-control-value.directive';

@NgModule({
	declarations: [TrimControlValueDirective],
	imports: [CommonModule],
	exports: [TrimControlValueDirective],
})
export class SharedModule {}
