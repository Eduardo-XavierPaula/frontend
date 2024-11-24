import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ProductResponse } from "@/types/products-response";

interface ProductTableProps {
	produtos: ProductResponse;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export default function ProductTable({
	produtos,
	onEdit,
	onDelete,
}: ProductTableProps) {
	console.log(produtos);
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Descrição</TableHead>
					<TableHead>Preço</TableHead>
					<TableHead className="text-end">Ação</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{produtos.length ? (
					produtos.map((produto) => (
						<TableRow key={produto.id}>
							<TableCell>{produto.nome}</TableCell>
							<TableCell>{produto.descricao}</TableCell>
							<TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
							<TableCell className="text-end">
								<Button
									variant="outline"
									size="icon"
									className="mr-2"
									title={"Editar " + produto.nome}
									onClick={() => onEdit(produto.id)}
								>
									<FaPencilAlt size={16} />
									<span className="sr-only">Editar {produto.nome}</span>
								</Button>
								<Button
									variant="destructive"
									size="icon"
									title={"Excluir " + produto.nome}
									onClick={() => onDelete(produto.id)}
								>
									<FaTrashAlt size={16} />
									<span className="sr-only">Excluir {produto.nome}</span>
								</Button>
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell className="text-center" colSpan={4}>
							Sem produtos
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
