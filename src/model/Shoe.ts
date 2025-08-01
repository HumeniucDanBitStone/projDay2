import Offer from "./Offer.js";

type Shoe = {
    id: number,
    brand: string,
    model: string,
    offers?: Offer[]
}

export default Shoe