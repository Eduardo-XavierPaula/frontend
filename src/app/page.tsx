"use client";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { IProduct } from "@/interfaces/product.interface";
import { ProductResponse } from "@/types/products-response";
import ProductForm from "@/components/templates/productForm";
import ProductTable from "@/components/templates/productTable";

export default function Home() {
	const [produto, setProduto] = useState<Partial<IProduct>>({});
	const [produtos, setProdutos] = useState<ProductResponse>([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		obterProdutos();
	}, []);

	async function obterProdutos() {
		console.log("aqui");
		console.log(process.env.NEXT_PUBLIC_BASE_URL);
		setIsLoading(true);
		try {
			const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`);
			const produtos = await resp.json();
			setProdutos(produtos);
		} catch (err) {
			console.error("Erro ao obter produtos:", err);
		}
		setIsLoading(false);
	}

	async function criarProduto(produto: Partial<IProduct>) {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(produto),
			});
			await obterProdutos();
			setIsModalOpen(false);
		} catch (err) {
			console.error("Erro ao criar produto:", err);
		}
	}
	async function alterarProduto(produto: Partial<IProduct>) {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${produto.id}`, {
				method: "PATCH",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(produto),
			});
			setProduto({});
			await obterProdutos();
			setIsModalOpen(false);
		} catch (err) {
			console.error("Erro ao alterar produto:", err);
		}
	}

	async function obterProdutoPorId(id: number) {
		try {
			const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`);
			const produto = await resp.json();
			setProduto(produto);
			setIsModalOpen(true);
		} catch (err) {
			console.error("Erro ao buscar produto:", err);
		}
	}

	async function excluirProduto(id: number) {
		console.log(produto);
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
			mode: "no-cors",
			method: "DELETE",
		});
		await obterProdutos();
	}

	function handleFormSubmit(produto: Partial<IProduct>) {
		if (produto.id) {
			alterarProduto(produto);
		} else {
			criarProduto(produto);
		}
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Lista de Produtos</h1>
				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogTrigger asChild>
						<Button title="Novo Produto" onClick={() => setProduto({})}>
							<FaPlusCircle size={16} /> Novo Produto
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{produto.id ? "Editar Produto" : "Adicionar Produto"}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription className="hidden">
							{produto.id
								? "Edite os detalhes do produto."
								: "Preencha as informações para adicionar um novo produto."}
						</DialogDescription>
						<ProductForm produto={produto} onSubmit={handleFormSubmit} />
					</DialogContent>
				</Dialog>
			</div>
			<ProductTable
				produtos={produtos}
				isLoading={isLoading}
				onEdit={obterProdutoPorId}
				onDelete={excluirProduto}
			/>
		</div>
	);
}
