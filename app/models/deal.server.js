import db from "../db.server";

export async function getDeals() {
    return db.deal.findMany();
}

export async function createDeal({ deal }) {
    return db.deal.create({ data: deal });
}

export async function deleteDeal({ id }) {
    return db.deal.delete({ where: { id } });
}