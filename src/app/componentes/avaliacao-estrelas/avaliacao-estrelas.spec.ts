import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AvaliacaoEstrelasComponent } from "./avaliacao-estrelas.component"
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { forwardRef } from "@angular/core";

describe('AvaliacaoEstrelasComponent', () => {
	let component: AvaliacaoEstrelasComponent;
	let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AvaliacaoEstrelasComponent],
			providers: [
				{
					provide: NG_VALUE_ACCESSOR,
					useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
					multi: true
				}
			]
		});

		fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
		component = fixture.componentInstance;
		component.readOnly = false;
	});

	it('deveria ser criado', () => {
		expect(component).toBeTruthy();
	});

	it('deveria inicializar com classificação 1', () => {
		expect(component.classificacao).toBe(1);
	});

  it('deveria atribuir um valor para a classificação quando o método writeValue for chamado', () => {
    const classificacao = 3;
		component.writeValue(classificacao);
		expect(component.classificacao).toBe(classificacao);
  });

	it('deveria chamar o onChange quando o método classificar for chamado', () => {
		const onChangeSpy = jest.spyOn(component, 'onChange');
		const classificacao = 5;
		component.classificar(classificacao);
		expect(onChangeSpy).toHaveBeenCalled();
	});

	it('deveria chamar o onTouched quando o método classificar for chamado', () => {
		const onTouchedSpy = jest.spyOn(component, 'onChange');
		const classificacao = 5;
		component.classificar(classificacao);
		expect(onTouchedSpy).toHaveBeenCalled();
	});

	it('não deveria atualizar a classificação quando a propriedade readonly for verdadeiro', () => {
		const onChangeSpy = jest.spyOn(component, 'onChange');
		const classificacao = 5;
		component.readOnly = true;
		component.classificar(classificacao);
		expect(onChangeSpy).not.toHaveBeenCalled();
		expect(component.classificacao).not.toBe(classificacao);
	});

	it('deveria ignorar valores inválidos e atribuir 1 como classificação', () => {
		const valoresInvalidos = [0, -6, 'abc', undefined];
		valoresInvalidos.forEach(valorInvalido => {
			component.writeValue(valorInvalido as any);
			expect(component.classificacao).toBe(1);
		});
	});

	it('deveria atualizar DOM quando a classificação mudar', () => {
		const classificacao = 4;
		component.classificar(classificacao);
		fixture.detectChanges();
		const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');
		expect(estrelaPreenchida).toBeTruthy();
	});

	it('deveria desabilitar a classificação quando setDisabledState for chamado', () => {
		if (component.setDisabledState) {
		component.setDisabledState(true);
		expect(component.readOnly).toBe(true);
		}
	});

	it('deveria atualizar a classificação quando o @Input mudar', () => {
		component.classificacao = 2;
		fixture.detectChanges();
		expect(component.classificacao).toBe(2);

		component.classificacao = 7;
		fixture.detectChanges();
		expect(component.classificacao).toBe(7);
	});
})