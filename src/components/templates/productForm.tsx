"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct } from "@/interfaces/product.interface";

interface ProductFormProps {
	produto: Partial<IProduct>;
	onSubmit: (produto: Partial<IProduct>) => void;
}

export default function ProductForm({
	produto: produto,
	onSubmit,
}: ProductFormProps) {
	const [formProduto, setFormProduto] = useState<Partial<IProduct>>({
		nome: produto?.nome || "",
		descricao: produto?.descricao || "",
		preco: produto?.preco || 0,
		id: produto?.id || undefined,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formProduto);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="nome">Nome</Label>
				<Input
					id="nome"
					value={formProduto.nome}
					onChange={(e) =>
						setFormProduto({ ...formProduto, nome: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<Label htmlFor="descricao">Descrição</Label>
				<Input
					id="descricao"
					value={formProduto.descricao}
					onChange={(e) =>
						setFormProduto({ ...formProduto, descricao: e.target.value })
					}
					required
				/>
			</div>
			<div>
				<Label htmlFor="preco">Preço</Label>
				<Input
					id="preco"
					type="number"
					step="1"
					value={formProduto.preco || ""}
					onChange={(e) => {
						const preco =
							e.target.value === "" ? 0 : parseFloat(e.target.value);
						setFormProduto({ ...formProduto, preco });
					}}
					required
				/>
			</div>
			<Button type="submit">
				{formProduto?.id ? "Atualizar Produto" : "Criar Produto"}
			</Button>
		</form>
	);
}
