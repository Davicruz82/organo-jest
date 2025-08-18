import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RodapeComponent } from "./rodape.component";

describe('RodapeComponente', () => {
	let component: RodapeComponent;
	let fixture: ComponentFixture<RodapeComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RodapeComponent],
		});
		fixture = TestBed.createComponent(RodapeComponent);
		component = fixture.componentInstance;
	});

	it('deveria ser criado', () => {
		expect(component).toBeTruthy();
	});

	it('deveria definir as propriedades alt e src', () => {
		expect(component.alt).toBeDefined();
		expect(component.src).toBeDefined();
	});

	it('deveria renderizar o conteúdo na tela baseado nas propriedades alt e src', () => {
		component.src = 'https://example.com/test-image.jpg';
    component.alt = 'Imagem teste';
		expect(component).toMatchSnapshot();
	});
});