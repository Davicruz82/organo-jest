import { GeneroLiterario, Livro } from "../componentes/livro/livro";
import { ErroGeneroLiterario, LivroService } from "./livro.service"
import { livros } from "../mock-livros";
import { TestBed } from "@angular/core/testing";

describe('LivroService', () => {
	let service: LivroService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LivroService]
		});
		service = TestBed.inject(LivroService);
	});

	// should be created
	it('deveria ser criado', () => {
		expect(service).toBeTruthy();
	});

	// should add a new book
	it('deveria adicionar um novo livro', () => {
		const novoLivro: Livro = {
			titulo: 'Novo Livro',
			autoria: 'Autor Desconhecido',
			imagem: 'http://example.com/cover.jpg',
			genero: { id: 'romance', value: 'Romance' },
			dataLeitura: '2024-04-19',
			classificacao: 5
		};

		service.adicionarLivro(novoLivro);
		const livrosPorGenero = service.obterLivrosPorGenero('romance');
		expect(livrosPorGenero).toContain(novoLivro);
	});

	// it should correctly retrive books by genre
	it('deveria recuperar corretamente os livros por gênero', () => {
		const livrosPorGenero = service.obterLivrosPorGenero('romance');
		const livrosEsperados = livros.filter(livro => livro.genero.id === 'romance');
		expect(livrosPorGenero).toEqual(livrosEsperados);
	});
	// it shuold initialize the genders correctly
	it('deveria inicializar os gêneros corretamente', () => {
		const generosEsperados: GeneroLiterario[] = [
			{ id: 'romance', value: 'Romance' },
			{ id: 'misterio', value: 'Mistério' },
			{ id: 'fantasia', value: 'Fantasia' },
			{ id: 'ficcao-cientifica', value: 'Ficção Científica' },
			{ id: 'tecnicos', value: 'Técnicos' },
		];

		expect(service.generos).toEqual(generosEsperados);
	});

	it('deveria lançar um erro ao tentar cadastrar um livro com gênero desconhecido', () => {
		const novoLivro: Livro = {
			titulo: 'Novo Livro',
			autoria: 'Autor Desconhecido',
			imagem: 'http://example.com/cover.jpg',
			genero: { id: 'nao-existe', value: 'Não Existe' },
			dataLeitura: '2024-04-19',
			classificacao: 5
		};

		expect(() => service.adicionarLivro(novoLivro)).toThrow(ErroGeneroLiterario);
	});
})