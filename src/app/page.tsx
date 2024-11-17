"use client";
import { useEffect, useState } from "react";

export default function Home() {
	const [produto, setProduto] = useState<any>({});
	const [produtos, setProdutos] = useState<any>([]);

	useEffect(() => {
		obterProdutos();
	}, []);

	async function obterProdutos() {
		const resp = await fetch("http://localhost:3001/produtos");
		const produtos = await resp.json();
		setProdutos(produtos);
	}

	async function criarProduto() {
		console.log(produto);
		await fetch("http://localhost:3001/produtos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(produto),
		});
		setProduto({});
		await obterProdutos();
	}
	async function alterarProduto(id: number) {
		await fetch(`http://localhost:3001/produtos/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(produto),
		});
		setProduto({});
		await obterProdutos();
	}
	async function obterProdutoPorId(id: number) {
		const resp = await fetch(`http://localhost:3001/produtos/${id}`);
		const produto = await resp.json();
		setProduto(produto);
	}
	async function excluirProduto(id: number) {
		console.log(produto);
		await fetch(`http://localhost:3001/produtos/${id}`, {
			method: "DELETE",
		});
		await obterProdutos();
	}

	function renderizarFormProduto() {
		return (
			<div className="flex gap-5 items-end">
				<div className="flex flex-col">
					<label htmlFor="nome">Nome</label>
					<input
						id="nome"
						placeholder="Digite o nome do produto"
						type="text"
						value={produto.nome ?? ""}
						onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
						className="bg-zinc-700 p-2 rounded-md"
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="descricao">Descrição</label>
					<input
						id="descricao"
						placeholder="Digite a descrição do produto"
						type="text"
						value={produto.descricao ?? ""}
						onChange={(e) =>
							setProduto({ ...produto, descricao: e.target.value })
						}
						className="bg-zinc-700 p-2 rounded-md"
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="preco">Preço</label>
					<input
						id="preco"
						placeholder="Digite a preço do produto"
						type="number"
						value={produto.preco ?? 0}
						onChange={(e) =>
							setProduto({ ...produto, preco: Number(e.target.value) })
						}
						className="bg-zinc-700 p-2 rounded-md"
					/>
				</div>
				<div>
					{produto.id ? (
						<button
							className="bg-blue-500 py-2 px-4 rounded-md"
							onClick={() => alterarProduto(produto.id)}
						>
							Alterar Produto
						</button>
					) : (
						<button
							className="bg-blue-500 py-2 px-4 rounded-md"
							onClick={criarProduto}
						>
							Criar Produto
						</button>
					)}
				</div>
			</div>
		);
	}

	function renderizarProdutos() {
		return (
			<div className="flex flex-col gap-2">
				{produtos.map((produto: any) => (
					<div
						key={produto.id}
						className="flex gap-2 bg-zinc-800 px-4 py-2 rounded-md items-center"
					>
						<h3>{produto.nome}</h3>
						<div className="flex-1">{produto.descricao}</div>
						<div>R$ {produto.preco}</div>
						<div>
							<button
								className="bg-green-500 p-2 rounded-md"
								onClick={() => obterProdutoPorId(produto.id)}
							>
								Alterar
							</button>
							<button
								className="bg-red-500 p-2 rounded-md"
								onClick={() => excluirProduto(produto.id)}
							>
								Excluir
							</button>
						</div>
					</div>
				))}
			</div>
		);
	}
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-10">
			{renderizarFormProduto()}
			{renderizarProdutos()}
		</div>
	);
}
