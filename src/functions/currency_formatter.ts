export function currencyFormatter(numero: string, currency: string = "BRL") {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: currency, // ou 'USD', 'EUR', etc. dependendo da moeda que você deseja
	}).format(Number(numero));
}
