const baseDetails = {
    city: "Recife",
    state: "Pernambuco",
}

const address = {
    ...baseDetails,
    city: "Camaragibe",
    street: "Boa Vista",
}

const address2 = {
    ...baseDetails,
    ...address,
    street: "Boa Vista 2",
}