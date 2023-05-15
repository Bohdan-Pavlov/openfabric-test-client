import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from 'src/app/core/components/header/header.component';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [HeaderComponent],
})
export class CoreModule {}
