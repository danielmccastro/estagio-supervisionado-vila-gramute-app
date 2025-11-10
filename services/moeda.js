const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function formatarMoeda(value) {
    return moeda.format(value);
}

export default moeda;